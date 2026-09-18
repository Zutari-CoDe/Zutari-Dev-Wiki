---
id: azureDevOps
title: ZTools — Azure DevOps
sidebar_label: Azure DevOps
---

# Contributing via Azure DevOps

This page explains the practical workflow for contributing to the ZTools repository using **Azure DevOps** (Azure Repos, Boards, and Pipelines).
It mirrors the [GitHub workflow](./github.md) — same branching rules, same commit style — with the Azure DevOps‑specific steps (work items, PR policies, pipeline validation) called out.

---

## 📥 1. Cloning the Repository

Clone the repository from Azure Repos:

```bash
git clone https://dev.azure.com/Zutari-CoDe/ZTools/_git/ZTools
```

Then open the solution in **Visual Studio 2022**.

> Make sure you have the correct SDKs installed as described in the Introduction page.

---

## 🌿 2. Branching Strategy

The branching conventions are identical to the GitHub workflow — Azure DevOps just enforces them through **branch policies** instead of GitHub rules.

- **`main`**
  Stable production-ready builds.

- **`develop`**
  Integrates completed features before merging to `main`.

Both branches have policies requiring a Pull Request, at least one reviewer, and a successful pipeline build. No direct commits are permitted.

---

## 🔧 3. Creating a Feature Branch

All development should be done in feature branches, following the same naming convention used on GitHub:

```
dev/<initials>/<feature-name>
```

###  Naming Format Rules

- Start with:
  `dev/`

- Followed by **your initials**, using:
  - first **two letters of your first name**
  - first **two letters of your surname**

  Example for **MJ Mthimunye** → `mjmt`

- Then add a **short descriptive feature name**, using kebab-case.

###  Example Branch Names

| Developer | Branch Example |
|----------|----------------|
| MJ Mthimunye | `dev/mjmt/add-sheet-manager` |
| Astrid van der Laan | `dev/asla/revit-styles-update` |
| Rowland Burke | `dev/robu/fix-scheduling-bug` |
| Gianluca Casalnuovo | `dev/gica/improve-ui-dialogs` |

###  Creating your branch

```bash
git checkout develop
git pull
git checkout -b dev/mjmt/new-feature-name
```

> If you're linking the branch to a work item, you can also create it directly from **Azure Boards** (open the work item → **Create a branch**), which pre-fills the branch name and links it automatically.

---

## 🧑‍💻 4. Making Changes

Now you can begin working:

- Follow MVVM patterns
- Keep code modular and clean
- Update documentation if needed
- Test in all relevant Revit versions (2023–2025)

Before committing, ensure your build succeeds.

---

## 📝 5. Commit Conventions

Use clear, descriptive commit messages — the same format used on GitHub.

### Recommended format:

```
<type>: <short description>
```

### Common Types
- `feat:` → New feature
- `fix:` → Bug fix
- `refactor:` → Code cleanup, no behavior change
- `docs:` → Documentation changes
- `chore:` → Supporting changes (build scripts, configs)

### Examples
```
feat: add new sheet placement tool
fix: corrected incorrect level binding in wall duplication
docs: updated contribution overview
refactor: simplified viewmodel property updates
```

### Linking a work item

Azure Boards will auto-link a commit to a work item if you reference it in the message:

```
fix: corrected incorrect level binding in wall duplication AB#1234
```

`AB#1234` links the commit to work item `1234` and shows up in its history.

---

## ⬆️ 6. Pushing Your Branch

Push your changes to Azure Repos:

```bash
git push --set-upstream origin dev/mjmt/new-feature-name
```

---

## 🔀 7. Submitting a Pull Request (PR)

Once your feature is ready:

1. Open a PR **into the `develop` branch**
2. Add a clear title and summary
3. Link the related **work item(s)** under the PR's "Work Items" section
4. Add reviewers from the team
5. Set **auto-complete** if you want the PR to merge automatically once policies pass

### PR Checklist
Before submitting, confirm:

- [ ] Code builds successfully for **all Revit target versions**
- [ ] No unused variables or debug logs
- [ ] UI follows global ZTools styling
- [ ] Documentation updated (if needed)
- [ ] Branch name follows naming rules
- [ ] Linked to a work item

### Branch Policies

The `develop` and `main` branches enforce:

- ✅ At least **1 reviewer** approval
- ✅ A **successful Azure Pipelines build** (see below)
- ✅ Linked **work item**
- ✅ No merge with active comments unresolved

The team will review your PR and request changes if necessary.

---

## 🏗️ 8. Build Validation (Azure Pipelines)

Every PR into `develop` or `main` triggers a **build validation pipeline** that compiles ZTools for all supported Revit versions (2023–2025). A PR cannot complete until this pipeline succeeds.

If the pipeline fails:

1. Open the PR → **Checks** tab → view the failed pipeline run
2. Fix the issue locally
3. Push again — the pipeline re-runs automatically

---

## 🧹 9. Keeping Your Branch Updated

If `develop` has new updates while you are working:

```bash
git checkout develop
git pull
git checkout dev/mjmt/new-feature-name
git merge develop
```

Resolve any merge conflicts, then push again.

---

## 🏁 10. Merging & Cleanup

Once approved and the build passes:

- Your PR will be merged (squash merge preferred) into `develop`
- Azure Repos will offer to delete the source branch on completion — accept this, or clean up manually:

```bash
git branch -d dev/mjmt/new-feature-name
git push origin --delete dev/mjmt/new-feature-name
```

---

## 🎉 You're Ready to Contribute!

By following this workflow, you help keep ZTools clean, stable, and consistent — whether you're working from GitHub or Azure DevOps.
Thank you for contributing to the tooling ecosystem that powers engineering teams across Zutari!
