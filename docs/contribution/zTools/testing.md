---
id: testing
title: ZTools — Testing
sidebar_label: Testing
---

## 🧪 Testing ZTools

Most ZTools code cannot be tested the normal way. A method like `CreateViewsFromCurve(...)` needs a live `Document`, a `Transaction` and a real `View` — and those only exist **inside a running Revit process**. You cannot `new Document()`, and the Revit API is sealed, so mocking it does not work either.

So ZTools splits testing into two halves, and we built our own test runner to make the awkward half feel normal.

| Half | What it tests | Where it runs | Framework |
|---|---|---|---|
| **Unit tests** | Pure logic — number crunching, string parsing, scale rounding | Any .NET test host, no Revit | **xUnit** |
| **Integration tests** | Anything that touches the Revit API | **Inside Revit.exe** | **NUnit** |

:::note Where the code lives
All five test projects live on the **`ztools-tests`** branch of the ZTools repo — not on `development` or `master`. Run `git checkout ztools-tests` before you go looking for them.
:::

---

## The Five Projects

```
ZTools.Tests                    xUnit. Pure logic. Runs anywhere.
ZTools.IntegrationTests         NUnit. Needs Revit. The tests you write.

ZTools.TestRunner.Pipe          Shared message contract (both sides reference it)
ZTools.TestRunner.TestAdapter   Lives in Visual Studio. Sends the request.
ZTools.TestRunner.Addin         Lives in Revit. Runs the tests, sends results back.
```

The first two are where you write tests. The last three are the runner we built — you should rarely need to touch them.

---

## 🔬 Unit Tests — `ZTools.Tests`

Plain xUnit targeting `net48`, referencing `ZTools.csproj`. The Revit API package is referenced with `ExcludeAssets="runtime"` so the project compiles but never loads Revit at runtime.

Most of the logic worth testing is `private static`, so there is a small reflection helper to reach it:

```csharp
internal static class MethodsAccessor
{
    private static readonly Type _type =
        typeof(Tools.ViewsSheetsManager.Methods.Methods);

    public static T Invoke<T>(string methodName, params object[] args)
    {
        var method = _type.GetMethod(
            methodName, BindingFlags.NonPublic | BindingFlags.Static);

        if (method == null)
            throw new MissingMethodException(methodName);

        return (T)method.Invoke(null, args);
    }
}
```

The tests then read normally:

```csharp
public class GetNextStandardScaleTests
{
    private static int Call(int minimumScale) =>
        MethodsAccessor.Invoke<int>("GetNextStandardScale", minimumScale);

    [Fact]
    public void Returns_ExactMatch_WhenMinimumIsStandardValue()
        => Assert.Equal(50, Call(50));

    [Theory]
    [InlineData(51, 100)]      // between 50 and 100 -> rounds up
    [InlineData(1001, 1250)]
    public void ReturnsExpectedScale(int input, int expected)
        => Assert.Equal(expected, Call(input));
}
```

**Rule of thumb:** if the method signature contains no Revit type, the test belongs here. It runs in milliseconds and needs nothing installed.

```bash
dotnet test ZTools.Tests/ZTools.Tests.csproj -c DebugV24
```

---

## 🏗️ Integration Tests — `ZTools.IntegrationTests`

An ordinary class library (`OutputType=Library`), **not** an exe. Nothing launches it directly — our addin loads the built `.dll` from inside Revit.

A fixture looks like this:

```csharp
[TestFixture]
public class RevitContextTests
{
    // Filled in automatically before the test runs
    public UIApplication UIApplication { get; set; } = null!;
    public Document      Document      { get; set; } = null!;

    [Test]
    public void Revit_VersionName_IsNotEmpty()
    {
        Assert.IsNotEmpty(UIApplication.Application.VersionName);
        TestContext.WriteLine(
            $"Running inside: {UIApplication.Application.VersionName}");
    }
}
```

Two things to notice:

1. **No attributes are needed for injection.** Declare a public settable property of a Revit type and it gets filled in for you. That is the `RevitInjector` described below.
2. `[TestCase]` gives you table-driven tests — the NUnit equivalent of xUnit's `[Theory]` / `[InlineData]`:

```csharp
[TestCase(ViewType.FloorPlan,   "Floor Plan")]
[TestCase(ViewType.CeilingPlan, "Ceiling Plan")]
[TestCase(ViewType.ThreeD,      "3D View")]
public void ReturnsExpectedString(ViewType input, string expected)
    => Assert.That(Call(input), Is.EqualTo(expected));
```

### The marker attribute

The csproj stamps a metadata attribute into the built assembly:

```xml
<AssemblyAttribute Include="System.Reflection.AssemblyMetadataAttribute">
  <_Parameter1>ZTools.RevitVersion</_Parameter1>
  <_Parameter2>$(RevitVersion)</_Parameter2>
</AssemblyAttribute>
```

This is how our discoverer knows *this* DLL is a Revit test assembly, and that `ZTools.dll`, `MahApps.dll` and everything else in the output folder is not. Without it, the adapter would try to reflect over every assembly in the solution.

---

## ⚙️ How We Built Our Own Runner

The goal was simple: hit **Run** in Visual Studio's Test Explorer and have the test actually execute inside Revit, with results streaming back live. Nothing off the shelf does that, so we wrote a client/server pair with a shared protocol.

```
   VISUAL STUDIO PROCESS                      REVIT.EXE PROCESS
   ---------------------                      -----------------
   Test Explorer
        |
        v
   RevitTestDiscoverer   -- finds [TestFixture] classes by reflection
        |
        v
   RevitTestExecutor  ------> named pipe ------>  ZToolsTestApplication
                              "ZToolsTestRunner"        |
                                                        v
                              (both sides speak    loads the test DLL,
                               PipeMessage JSON)   injects Document/UIApplication,
                                                   invokes each [Test] method
        <----- one TestResult JSON per test -------------
        <----- RunComplete when finished ----------------
```

### 1. The shared contract — `ZTools.TestRunner.Pipe`

The smallest project: one file, `PipeMessage.cs`, referenced by **both** sides so they agree on the wire format. It multi-targets `net48;net8.0-windows`, because the adapter is always `net48` but the Revit 2025 addin is `net8.0-windows`.

```csharp
public enum MessageType
{
    RunTests,      // Adapter -> Addin: start a run
    TestResult,    // Addin -> Adapter: one test finished
    RunComplete,   // Addin -> Adapter: all done
    Error          // Addin -> Adapter: something broke
}

public class PipeMessage
{
    public MessageType Type    { get; set; }
    public string      Payload { get; set; } = string.Empty;   // nested JSON

    public string Serialize() => JsonSerializer.Serialize(this);
    public static PipeMessage Deserialize(string json) => ...;
}
```

`Payload` is **JSON inside JSON** — the envelope carries a serialized `RunTestsPayload`, `TestResultPayload` or `RunCompletePayload` as a string. Slightly wasteful, but the envelope never changes shape and one `ReadLine()` always yields exactly one message.

**Protocol:** one JSON object per line, UTF-8, **no BOM**, newline-terminated.

### 2. The Visual Studio side — `ZTools.TestRunner.TestAdapter`

This is a **VSTest adapter**, the same plug-in type that xUnit and NUnit ship. It teaches Test Explorer about a new kind of test. Two classes do the work, glued together by one URI:

```csharp
public const string ExecutorUriString = "executor://ZToolsRevitTestRunner/v1";
```

Visual Studio remembers, for each discovered test, which executor URI owns it. Change it in one place and not the other, and tests get discovered but never run.

**`RevitTestDiscoverer`** answers "what tests exist?". VS hands it every built `.dll`, and it filters aggressively before doing anything expensive:

```csharp
// 1. Cheap: does the raw file even contain the string "NUnit.Framework"?
if (!IsNUnitAssembly(source)) return;

// 2. Does it carry our ZTools.RevitVersion marker attribute?
//    (ReflectionOnlyLoadFrom - does not execute any code)
if (!IsRevitTestAssembly(source)) return;
```

It then reflects for `[TestFixture]` classes and pushes one `TestCase` per `[Test]` / `[TestCase]` method to VS. One `[TestCase(...)]` attribute equals one row in Test Explorer.

**`RevitTestExecutor`** answers "now run them" — except it runs nothing itself. It connects to the pipe and asks Revit to:

```csharp
var pipe = new NamedPipeClientStream(".", "ZToolsTestRunner", PipeDirection.InOut);

try { pipe.Connect(15_000); }
catch (TimeoutException)
{
    frameworkHandle.SendMessage(TestMessageLevel.Error,
        "[ZToolsRevit] TIMEOUT - Revit is not open or addin not loaded.");
    ReportAllNotRun(specificTests, source, frameworkHandle, "...");
    return;
}
```

Then it sits in a read loop and forwards each result into Test Explorer as it arrives, so the green and red ticks appear live:

```csharp
while (!_cancelled)
{
    var line = reader.ReadLine();
    if (string.IsNullOrEmpty(line)) break;

    var response = PipeMessage.Deserialize(line);
    switch (response.Type)
    {
        case MessageType.TestResult:  HandleTestResult(...);  break;
        case MessageType.RunComplete: return;
        case MessageType.Error:       /* log and bail */ return;
    }
}
```

### 3. The Revit side — `ZTools.TestRunner.Addin`

A normal Revit `IExternalApplication`, deployed into the per-version Revit `Addins` folder.

```
OnStartup                  -> create ribbon tab "ZTools Testing" + button,
                              subscribe to ApplicationInitialized
ApplicationInitialized     -> capture UIApplication, create the ExternalEvent,
                              start the pipe-server background thread
RunPipeServer (loop)       -> accept one connection per test run
OnShutdown                 -> cancel the thread
```

Capturing `UIApplication` has to wait for `ApplicationInitialized` — during `OnStartup` Revit has no application object yet:

```csharp
private void OnApplicationInitialized(
    object sender, ApplicationInitializedEventArgs e)
{
    _uiApp = new UIApplication(
        sender as Autodesk.Revit.ApplicationServices.Application);

    TestRunnerHandler = new TestRunnerExternalEvent();
    TestRunnerEvent   = ExternalEvent.Create(TestRunnerHandler);

    _pipeThread = new Thread(RunPipeServer) { IsBackground = true };
    _pipeThread.Start();
}
```

The pipe server is a `while` loop that creates a fresh `NamedPipeServerStream` per run, reads byte by byte until a newline, strips a UTF-8 BOM if one slipped through, deserializes and runs:

```csharp
pipe.WaitForConnection();
// ... read bytes until '\n', strip BOM, decode UTF-8 ...

var message = PipeMessage.Deserialize(json);
if (message.Type == MessageType.RunTests)
{
    var payload = JsonSerializer.Deserialize<RunTestsPayload>(message.Payload)!;
    ExecuteTests(payload, writer, pipe);
    writer.Flush();
    pipe.WaitForPipeDrain();      // do not close before VS has read everything
}
```

### 4. A hand-rolled mini NUnit

Despite referencing `NUnit.Engine`, the addin **does not use the NUnit engine to run tests**. It reflects over the assembly itself:

```csharp
var testAssembly = Assembly.LoadFrom(request.AssemblyPath);

var fixtureTypes = testAssembly.GetTypes()
    .Where(t => t.GetCustomAttributes(typeof(TestFixtureAttribute), true).Any()
                && !t.IsAbstract);

foreach (var fixtureType in fixtureTypes)
{
    var fixture = Activator.CreateInstance(fixtureType)!;

    RevitInjector.Inject(fixture, _uiApp!);          // <- the magic step

    oneTimeSetUp?.Invoke(fixture, null);
    foreach (var method in testMethods)
        RunSingleTest(fixture, fixtureType, method, args, writer, ...);
    oneTimeTearDown?.Invoke(fixture, null);
}
```

`RunSingleTest` honours `[SetUp]`, `[TearDown]` and `[Ignore]`, times the call with a `Stopwatch`, catches `TargetInvocationException` (which is how an NUnit assertion failure arrives through reflection), and writes one `TestResultPayload` line down the pipe per test.

**Why not the real NUnit engine?** The engine wants to spawn its own process or AppDomain, which loses the Revit API context that is the entire point of the exercise. Running by reflection on Revit's own thread is what keeps `Document` valid.

### 5. `RevitInjector` — how fixtures get a `Document`

About 50 lines. No attributes, no DI container:

```csharp
public static void Inject(object fixture, UIApplication uiApp)
{
    var props = fixture.GetType()
        .GetProperties(BindingFlags.Public | BindingFlags.Instance)
        .Where(p => p.CanWrite && p.GetIndexParameters().Length == 0);

    foreach (var prop in props)
    {
        object? value = ResolveValue(prop.PropertyType, uiApp);
        if (value != null) prop.SetValue(fixture, value);
    }
}

private static object? ResolveValue(Type type, UIApplication uiApp)
{
    if (type == typeof(UIApplication)) return uiApp;
    if (type == typeof(Application))   return uiApp.Application;
    if (type == typeof(Document))      return uiApp.ActiveUIDocument?.Document;
    if (type == typeof(UIDocument))    return uiApp.ActiveUIDocument;
    return null;
}
```

Declare the property, get the object. To support a new type, add one line to `ResolveValue`.

### 6. The WPF window — a second way to run

There is also a ribbon button (**ZTools Testing → Test Runner**) that opens a modeless MVVM window with pass/fail counts, a fixture filter and a results grid. It runs the *same* reflection loop, just without the pipe — handy when you are already in Revit and do not want to alt-tab.

Because the window is modeless it cannot touch the Revit API directly, so the Run button raises an `ExternalEvent`:

```csharp
[RelayCommand(CanExecute = nameof(CanRun))]
private void Run()
{
    IsRunning = true;
    ZToolsTestApplication.TestRunnerEvent?.Raise();   // -> Revit calls Execute()
}

// Runs on Revit's main thread, in a valid API context
public void ExecuteTestsOnRevitThread() => RunAllTests();
```

### 7. Logging

Every step of the pipe handshake and every pass/fail is appended to `ZToolsTestRunner.log` in your **Downloads** folder. It is cleared at the start of each pipe-server session, and it is the first place to look when Test Explorer says nothing useful.

---

## 🧱 Build Configurations

All the Revit-facing projects use the same per-version configuration pattern as the main `ZTools.csproj`:

| Configuration | TFM | Revit API | `DefineConstants` |
|---|---|---|---|
| `DebugV23` / `ReleaseV23` | `net48` | 2023.1.2 | `R23` |
| `DebugV24` / `ReleaseV24` | `net48` | 2024.3.10 | `R24` |
| `DebugV25` / `ReleaseV25` | `net8.0-windows` | 2025.4.0 | `R25` |

As everywhere else in the repo, **build with an explicit versioned configuration** — `dotnet build -c DebugV24`. Plain `Debug` is not a supported combination.

### `ExcludeAssets="runtime"` — read this before editing a csproj

| Project | Package | Why runtime is excluded |
|---|---|---|
| `IntegrationTests` | `Nice3point.Revit.Api.*` | Revit provides the real DLLs. Copying them would shadow Revit's own and crash. |
| `IntegrationTests` | `Microsoft.NET.Test.Sdk` | Needed at build time so VS creates a test host — but its vstest DLLs must **not** land next to the addin. |
| `TestAdapter` | `Microsoft.TestPlatform.ObjectModel` | Visual Studio supplies these in its own process. |
| `Tests` | `Nice3point.Revit.Api.RevitAPI` | Compile-time only; these tests never touch a live API. |

The `Addin` project is the exception — it references the Revit API packages **without** `ExcludeAssets`, because it is loaded by Revit rather than by the VS test host.

### Auto-deploy

`ZTools.TestRunner.Addin.csproj` has a post-build target that copies the output into the Revit `Addins` folder and writes the `.addin` manifest for you. A matching `CleanAddin` target removes both on **Clean**.

---

## ▶️ Running Integration Tests, End to End

1. Build the addin — `dotnet build ZTools.TestRunner.Addin -c DebugV24`. The post-build target deploys it and writes the manifest.
2. Build the integration tests — `dotnet build ZTools.IntegrationTests -c DebugV24`.
3. **Start Revit 2024 and open a document.** `ActiveUIDocument` must be non-null, or every injected `Document` comes back null.
4. In Visual Studio, open **Test Explorer**. The tests appear under `RevitContextTests`, `GetViewTypeNameTests`, and so on.
5. Hit **Run**. The adapter connects to the pipe (15-second timeout) and results stream back live.

If step 5 fails, check `ZToolsTestRunner.log` in your Downloads folder first. It tells you whether the pipe server ever started, whether the client connected, and what JSON arrived.

---

## ✍️ Adding a New Test

**Pure logic** → `ZTools.Tests`, xUnit, `[Fact]` / `[Theory]`. Done.

**Needs Revit** → `ZTools.IntegrationTests`:

```csharp
[TestFixture]
public class SheetCreationTests
{
    public Document Document { get; set; } = null!;   // injected

    [Test]
    public void CreatingASheet_AddsItToTheModel()
    {
        using var tx = new Transaction(Document, "test sheet");
        tx.Start();

        var titleBlockId = new FilteredElementCollector(Document)
            .OfCategory(BuiltInCategory.OST_TitleBlocks)
            .WhereElementIsElementType()
            .FirstElementId();

        var sheet = ViewSheet.Create(Document, titleBlockId);
        Assert.IsNotNull(sheet);

        tx.RollBack();      // leave the model as we found it
    }
}
```

Rebuild the integration test project, make sure Revit is open, and the new fixture shows up in Test Explorer on the next discovery pass.
