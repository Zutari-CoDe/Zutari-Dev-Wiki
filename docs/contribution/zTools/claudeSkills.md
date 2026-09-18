---
id: claudeSkills
title: ZTools — Claude Code Skills
sidebar_label: Claude Code Skills
---

## 🤖 Working on ZTools with Claude Code

ZTools ships a set of **Claude Code skills** — reusable instruction files that
teach the AI assistant how *this* repository does things. Instead of explaining
the MVVM pattern, the external-event plumbing and the build configurations every
time, you call a skill and Claude follows the house process.

The skills live in the repo, are committed alongside the code, and are shared by
the whole team. When a convention changes, you change the skill once.

---

## 📁 Where They Live

Skills are plain Markdown files in the ZTools repo:

```
ZTools/
└── .claude/
    └── skills/
        ├── new-ztool/          → SKILL.md
        ├── ztools-add-action/  → SKILL.md
        ├── ztools-add-test/    → SKILL.md
        ├── ztools-build/       → SKILL.md
        ├── revit-api-review/   → SKILL.md
        └── wiki-page/          → SKILL.md
```

One folder per skill, each containing a single `SKILL.md`. The folder name is
the skill name and becomes the slash command.

> Because they are committed to the repository, everyone who clones ZTools gets
> them automatically. Restart Claude Code after pulling new skills.

---

## 🧰 The Available Skills

| Skill | What it does |
|---|---|
| **`/new-ztool`** | Scaffolds a complete new tool — Model, ViewModel, MetroWindow view with Zutari styling, `IExternalCommand`, external-event handler — and registers it on the ribbon. |
| **`/ztools-add-action`** | Adds a button or action to an *existing* tool, wiring the `RelayCommand` through the external event to a Revit API method. |
| **`/ztools-add-test`** | Writes an xUnit unit test or an NUnit integration test that runs inside a live Revit process. |
| **`/ztools-build`** | Builds for a given Revit version and diagnoses build failures against the known failure modes. |
| **`/revit-api-review`** | Reviews changed code for Revit API hazards before you commit. |
| **`/wiki-page`** | Writes a page for this wiki and publishes it to GitHub Pages. |

### Calling a skill

Type the skill name as a slash command, with any detail you want to give it:

```
/new-ztool BeamChecker — check beam clashes against levels
```

```
/ztools-add-action add a "Delete Unused Views" button to SARBAudit
```

```
/ztools-build DebugV26
```

If you leave out details the skill needs, it asks before starting.

You do not have to use the slash command. Each skill has a `description` that
tells Claude when it applies, so asking in plain language — *"add a new tool
called BeamChecker"* — usually triggers the right one on its own.

---

## 🧩 Why Skills Instead of Prompting

Three practical reasons:

1. **Consistency.** Every tool ends up with the same folder layout, the same
   `#006f73` title bar, the same external-event plumbing. New tools look like
   old tools.
2. **Institutional memory.** The traps that cost someone a day — the ~1200
   phantom errors from building plain `Debug`, the `wpftmp` configuration
   inheritance bug, stale `Element` wrappers in a modeless ViewModel — are
   written down where they get applied, not in a wiki page nobody rereads.
3. **Review quality.** `/revit-api-review` checks the same eight things every
   time, including the ones easy to forget under deadline.

---

## ✍️ Writing a New Skill

### Step 1 — Create the folder and file

```
ZTools/.claude/skills/<skill-name>/SKILL.md
```

Use a lowercase, hyphenated name. It becomes the slash command, so keep it
short and obvious: `ztools-add-action`, not `add-an-action-to-a-tool`.

### Step 2 — Write the frontmatter

```markdown
---
name: ztools-add-action
description: Add a new button, command or action to an existing ZTools tool — wires a RelayCommand in the ViewModel through the external-event handler to a method that touches the Revit API. Use when asked to add a feature, button, action or operation to an existing tool.
---
```

The `description` is the most important line in the file. It is what Claude
reads to decide whether the skill applies, so it must contain:

- **what the skill does**, in concrete terms
- **when to use it** — include the words a developer would actually type
  ("add a button", "scaffold a tool", "build fails")

A vague description means the skill never fires.

### Step 3 — Write the body

The body is the instructions Claude follows. What makes a skill work well here:

**Be specific to this repo.** Name real files, real classes, real folders.
`Tools/{Tool}/Methods/EventHandlerWithStringArg.cs`, not "the event handler
file".

**Give complete, copy-pasteable templates.** Lift them from working code in the
repo rather than writing plausible-looking samples. Half a template produces
half a tool.

**Number the steps.** `## Step 1 — Create the folder structure`. Claude follows
ordered steps reliably and skips around in unstructured prose.

**Write down the traps.** This is where skills earn their keep:

> `DebugV23` and `DebugV24` target `net48`. `dict.GetValueOrDefault(key)` does
> not exist there — use `TryGetValue`.

**State what *not* to do**, with the reason. "Never cache an `Element` in a
ViewModel field — the wrapper goes stale when the document changes and throws."

**Finish with a checklist** so Claude can verify its own work before reporting
done.

### Step 4 — Test it

Restart Claude Code, run the skill on a real task, and watch where it goes
wrong. Skills are iterated, not written perfectly first time. If Claude skipped
a step, that step was not explicit enough.

### Step 5 — Commit it

```bash
git add .claude/skills/<skill-name>/SKILL.md
git commit -m "Add <skill-name> Claude Code skill"
```

Skills are part of the codebase. Review them in a PR like any other change — a
wrong instruction in a skill propagates into every tool built afterwards.

---

## 🔄 Keeping Skills Current

A skill that describes a convention the codebase has moved on from is worse than
no skill, because it is applied confidently.

When you change something structural — a folder layout, a base class, a build
configuration, a style palette — grep `.claude/skills/` for it and update the
affected skills in the same commit.

```bash
grep -rn "DebugV24" .claude/skills/
```

---

## 📌 A Note on What Skills Are Not

Skills describe **process**, not **knowledge**. They tell Claude how to do a
task the way this team does it.

They do not replace:

- **`CLAUDE.md`** — always-loaded project context (what the repo is, house
  rules that apply to every task)
- **This wiki** — the explanation a human reads to understand *why* the
  architecture is the way it is
- **Code comments and XML docs** — the explanation a human reads at the point
  of use

If something is worth knowing every single turn, it belongs in `CLAUDE.md`. If
it is worth knowing only while doing one specific task, it belongs in a skill.
