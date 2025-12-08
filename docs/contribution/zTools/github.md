---
id: github
title: ZTools — Github
sidebar_label: Github
---

# Contributing via GitHub

This page explains the practical workflow for contributing to the ZTools repository using GitHub.  
If you're adding features, fixing bugs, or improving documentation, follow these steps to ensure a clean and consistent process.

---

## 📥 1. Cloning the Repository

To start working on ZTools, clone the repository to your local machine:

```bash
git clone https://github.com/Zutari-CoDe/Zutari-Dev-Wiki.git
```

Then open the solution in **Visual Studio 2022**.

> Make sure you have the correct SDKs installed as described in the Introduction page.

---

## 🌿 2. Branching Strategy

To keep development organized, all contributors must follow the project’s branching conventions.

- **`main`**  
  Stable production-ready builds.

- **`develop`**  
  Integrates completed features before merging to `main`.

No direct commits should be made to these branches.

---

## 🔧 3. Creating a Feature Branch

All development should be done in feature branches, following the naming convention:

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

Use clear, descriptive commit messages.

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

---

## ⬆️ 6. Pushing Your Branch

Push your changes to GitHub:

```bash
git push --set-upstream origin dev/mjmt/new-feature-name
```

---

## 🔀 7. Submitting a Pull Request (PR)

Once your feature is ready:

1. Open a PR **into the `develop` branch**  
2. Add a clear title and summary  
3. Link any related issues (if applicable)  
4. Request reviewers from the team  

### PR Checklist
Before submitting, confirm:

- [ ] Code builds successfully for **all Revit target versions**  
- [ ] No unused variables or debug logs  
- [ ] UI follows global ZTools styling  
- [ ] Documentation updated (if needed)  
- [ ] Branch name follows naming rules  

The team will review your PR and request changes if necessary.

---

## 🧹 8. Keeping Your Branch Updated

If `develop` has new updates while you are working:

```bash
git checkout develop
git pull
git checkout dev/mjmt/new-feature-name
git merge develop
```

Resolve any merge conflicts, then push again.

---

## 🏁 9. Merging & Cleanup

Once approved:

- Your PR will be merged into `develop`
- The feature branch will then be deleted by Github actions:

```bash
git branch -d dev/mjmt/new-feature-name
git push origin --delete dev/mjmt/new-feature-name
```

---

## 🎉 You're Ready to Contribute!

By following this workflow, you help keep ZTools clean, stable, and consistent.  
Thank you for contributing to the tooling ecosystem that powers engineering teams across Zutari!