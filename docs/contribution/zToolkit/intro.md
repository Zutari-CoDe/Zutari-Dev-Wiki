# Introduction

Welcome to the **ZToolkit** repository!  
This guide provides an overview of the toolkit, its purpose, structure, and how contributors can work within the project’s two interconnected .NET ecosystems: **Dynamo for Revit** and **Grasshopper for Rhino**.

---

## What Is ZToolkit?

**ZToolkit** is a collection of geometry, transformation, and workflow utilities built to support **AEC automation** across two major computational design platforms:

- **Autodesk Revit → Dynamo**
- **Rhino → Grasshopper**

The purpose of ZToolkit is to provide stable, reusable, and version‑consistent tools to help automate:
- AEC modelling workflows  
- Data extraction and transformation  
- Civil and architectural geometry generation  
- Cross‑platform logic (Revit ⇄ Rhino)

The toolkit consists of two separate but related .NET projects:

| Project | Description |
|--------|-------------|
| **ZToolkit** | A **Dynamo ZeroTouch package** containing nodes for Revit automation. |
| **ZToolkit.Grasshopper** | A **Grasshopper plugin** providing components for Rhino 7 & 8. |

Both live in the same repository to enable unified development, shared logic, and easier version control.

---

## 🏗 Repository Structure

### **1. ZToolkit (Dynamo Package)**

A ZeroTouch library targeting Revit and Dynamo, built on **.NET Framework 4.8**.

**Generated Files**
- `ZToolkit.dll`
- `ZToolkit.xml` (documentation)
- Optional debugging symbols (`ZToolkit.pdb`)
- `pkg.json` for package metadata

**Supported Builds**

| Configuration | Dynamo Version | Revit Version | Constants |
|--------------|----------------|---------------|-----------|
| DebugV23 | 2.18 | 2023 | `REVIT2023;DYNAMO218` |
| DebugV24 | 2.19 | 2024 | `REVIT2024;DYNAMO219` |
| DebugV25 | 3.0 | 2025 | `REVIT2025;DYNAMO30` |
| Debug/Release | 2.19 | 2024 | – |

**Automatic Deployment**
Builds are deployed automatically to:

```
%AppData%\Dynamo\Dynamo Revit\<DynamoVersion>\packages\ZToolkit
```

---

### **2. ZToolkit.Grasshopper (Grasshopper Plugin)**

A Grasshopper plugin supporting Rhino 7 & 8.

**Key Features**
- Targets `.NET Framework 4.8` (GH7) or `.NET 7` (GH8)
- Produces `.gha` assemblies
- Automatically installs into the Grasshopper Libraries folder
- Debugging launches Rhino directly

**Build Configurations**

| Configuration | Framework | Rhino Version | Output Path |
|--------------|-----------|---------------|--------------|
| GH7 | net48-windows | Rhino 7 | `bin/GH7` |
| GH8 | net7.0-windows | Rhino 8 | `bin/GH8` |
| Debug/Release | Varies | – | – |

**Auto-install Locations**
- **Windows:**  
  `%AppData%\Grasshopper\Libraries\<Configuration>`
- **macOS:**  
  `~/Library/.../Grasshopper/Libraries/<Configuration>`

---

## ⚙️ Prerequisites

To build and contribute effectively:

- Visual Studio (latest recommended)
- **.NET Framework 4.8**
- **.NET 7.0 (Windows)** for GH8 builds
- Rhino 7 / Rhino 8 installed
- Revit + Dynamo installed for your target version

---

## 🚀 Usage Overview

### Dynamo
1. Select the correct `DebugV23/24/25` config.
2. Build → package auto-installs.
3. Open Revit → Dynamo → ZToolkit nodes appear.

### Grasshopper
1. Build using `GH7` or `GH8`.
2. Rhino launches automatically during debugging.
3. ZToolkit shows under Grasshopper panels.

---

## 🧩 Contribution Workflow

### Branch Naming Standard

Development branches should follow:

```
dev/<initials>/<feature-name>
```

Example for **MJ Mthimunye**:

```
dev/mjmt/element-utils
```

This ensures a clean, searchable, and contributor‑friendly version control structure.

---

## 🎯 Why ZToolkit Exists

ZToolkit aims to unify automation across Revit and Rhino so firms can:

- Reuse logic across platforms  
- Create predictable geometry workflows  
- Reduce duplicated scripting between Dynamo & Grasshopper  
- Build robust, testable, maintainable automation tools  

Contributions help strengthen these foundations and push the toolkit further across both ecosystems.

---

## 🙌 Welcome Contributors!

Whether you're improving geometry functions, adding utilities, fixing bugs, or enhancing documentation—your contributions matter.

Let’s build something powerful for the AEC community.

---