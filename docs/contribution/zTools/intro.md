---
id: intro
title: ZTools Contribution
sidebar_label: Introduction
---

# Introduction

Welcome to the **ZTools Contribution Guide**.  
This section outlines how developers can contribute to the ZTools Revit add-in suite, the expectations for code quality, and the workflow used across the project.  

Whether you're fixing a bug, adding a new tool, refactoring existing components, or improving documentation, this guide will help you get started smoothly.

---

## 🎯 Purpose of This Guide
This contributor guide explains:

- How the project is structured.  
- What coding principles and patterns the team follows.  
- How new features should be added.  
- How to write clean, testable, and maintainable code.  
- How to prepare your changes before submitting them.  

> **Note:** The next page (“Github”) provides practical steps such as cloning the repository, creating branches, committing changes, and submitting pull requests.

---

## 🧱 Project Architecture Overview

ZTools is built as a collection of **Revit add-ins** supporting Revit 2023–2025, and uses a modular architecture designed for clarity, reusability, and maintainability.

Key architectural guidelines:

### **1. MVVM-first design**
All UI components follow the **MVVM (Model–View–ViewModel)** pattern:
- Logic lives in *ViewModels*
- UI stays thin and reactive
- Commands are used instead of code-behind where possible  
- `CommunityToolkit.Mvvm` is used for boilerplate reduction

### **2. Consistent UI/UX**
Interfaces use:
- **WPF** with MahApps.Metro for styling  
- A common design language across all dialogs, windows, and controls  
- Shared styles/templates where possible  

### **3. Versioned API Targets**
Each Revit version builds from the same codebase but:
- Compiles against the correct **Nice3Point Revit API package**  
- Uses separate build configurations  
- Outputs to `/dist/Revit/{Version}`  

This ensures isolated, predictable builds for each Revit release.

---

## 🧩 Contribution Types

You can contribute in several ways:

### ✔️ **Bug Fixes**
Fix regressions, errors, or unexpected behaviour in existing tools or UI elements.

### ✔️ **New Tools**
Implement a new productivity feature or Revit workflow enhancement that fits the ZTools suite.

### ✔️ **Improving Existing Tools**
Refactor logic, update the UI, improve naming, optimize performance, or simplify workflows.

### ✔️ **Documentation**
Improve internal documentation, add usage examples, write developer notes, or clarify workflows.

### ✔️ **Code Quality Improvements**
Apply refactoring, reduce duplication, enforce design patterns, or align with best practices.

---

## 📐 Coding Standards

To keep the project consistent and maintainable, contributors should follow these conventions:

### **1. C# Style**
- Use *PascalCase* for public members and types  
- Use *camelCase* for private fields  
- Prefer expression-bodied members where appropriate  
- Avoid large methods — break logic into smaller units

### **2. MVVM**
- Avoid code-behind unless required (e.g., event handlers Revit forces)  
- Use observable properties (`ObservableObject`)  
- Use `RelayCommand` or `AsyncRelayCommand`  
- Keep ViewModels UI-independent

### **3. Project Structure**
Organize code into:
- `/ViewModels`
- `/Views`
- `/Commands`
- `/Models`
- `/Revit` (Revit-specific logic)

### **4. Error Handling**
- Fail gracefully  
- Use descriptive exceptions  
- Log errors where necessary (future telemetry integration)

---

## 🔄 Development Workflow (High-Level)

A typical contribution follows this pattern:

1. **Identify a task** (bug, enhancement, new tool)  
2. **Discuss the idea** with the team (optional but recommended)  
3. **Create a feature branch**  
4. **Implement the change** following MVVM + project standards  
5. **Test in relevant Revit versions**  
6. **Prepare documentation or update existing docs**  
7. **Submit a pull request**  

The next page explains the GitHub workflow, including branching, cloning, and PR standards.

---

## 🤝 Thank You for Contributing

Every contribution—big or small—helps improve ZTools and the daily workflow of engineers and technicians across Zutari.  
Your effort is appreciated, and this documentation is here to ensure you have everything you need to build confidently and effectively.

If you need help or guidance, feel free to reach out to the team on Teams or open a discussion in the repository.

---
