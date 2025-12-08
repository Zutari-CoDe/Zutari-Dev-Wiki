---
id: github
title: ZToolkit — Github
sidebar_label: Github
---

# 🔧 Contributing via Github

Thank you for your interest in contributing to **ZToolkit**!  
Whether you're improving Dynamo nodes, expanding Grasshopper components, fixing bugs, or refining documentation, your contributions help strengthen the tools used across multidisciplinary workflows at Zutari.

This guide explains **how to set up your environment, follow the branching strategy, and submit contributions** to the repository.

---

## 🚀 Contribution Workflow Overview

Contributions follow a simple branching + pull request workflow:

1. **Create a feature/fix branch**  
2. **Develop and test** Dynamo or Grasshopper changes  
3. **Commit using clear commit messages**  
4. **Push your branch** to GitHub  
5. **Open a Pull Request (PR)**  
6. **Team review + merge** into `dev`

---

## 🌿 Branching Strategy

Use:

```
dev/<first2 letters of name><first2 letters of surname>/<feature-name>
```

### Example (Musa Mthimunye)

```
dev/mjmt/add-spiral-geometry-node
dev/mjmt/fix-dynamo-deployment
dev/mjmt/gh8-crash-on-load
```

---

## 🧱 Base Branches

| Branch | Purpose |
|--------|---------|
| **main** | Stable releases only (production) |
| **dev** | Active development, all PRs merge here |
| **feature branches** | Individual units of work, merged into dev |

---

## 🛠️ Development Setup

- Visual Studio 2022  
- .NET Framework 4.8  
- .NET 7 SDK (for GH8)  
- Dynamo + Revit installed  
- Rhino 7/8 installed  

See the **Introduction** page for full details.

---

## 📌 Making Changes

### Dynamo

- Use the correct config (`DebugV23`, `DebugV24`, `DebugV25`)  
- Builds auto-deploy to `%AppData%\Dynamo\...\packages\ZToolkit`

### Grasshopper

- Use `GH7` or `GH8` config  
- Build auto-installs into Grasshopper Libraries

---

## 📝 Commit Messages

Good examples:

```
Added spiral arc conversion node
Improved Grasshopper error reporting
Fixed GH8 reference loading issue
```

Avoid:

```
update
fix stuff
changes
```

---

## 📤 Pull Requests

1. Push your branch  
2. Open PR targeting **dev**  
3. Add screenshots if UI/geometry-related  
4. Request reviewers  
5. Await approval + merge  

---

## ❤️ Thank You

Every contribution helps improve ZToolkit for the whole engineering team!
