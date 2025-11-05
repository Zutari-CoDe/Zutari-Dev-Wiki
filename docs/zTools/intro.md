---
id: intro
title: ZTools
sidebar_label: Introduction
---

# ZTools Revit Add-ins

ZTools is a suite of Autodesk Revit add-ins designed to enhance productivity and streamline repetitive design workflows.  
The suite supports multiple versions of Autodesk Revit (2023, 2024, and 2025) and leverages **WPF/WinForms with MVVM** for a modern, responsive user interface.

<p align="center">
<img src="/zutari-dev-wiki/img/ztools-ribbon.png" alt="Automation" width="820" height="120" />
</p>

---

## Why a Suite of Revit Plugins?

Modern BIM workflows demand consistency, automation, and efficiency. ZTools provides designers with purpose-built tools that automate tedious tasks, enforce company standards, and reduce manual errors.  
By consolidating these into a single suite, teams can maintain a consistent workflow across multiple projects and Revit versions.

## 📌 Plugins
### 1. Style Manager

The **Style Manager** is the first plugin in the ZTools suite. It is dedicated to managing Revit styles and ensuring compliance with company standards.  
The plugin provides a clear, tabbed interface to handle multiple style types.

<p align="center">
  <img src="/zutari-dev-wiki/img/styles-manager.png" alt="Automation" width="650" height="450" />
</p>

#### Features:

- **Line Patterns Manager**  
  - Create, update, and modify line patterns in Revit.  
  - Import/export line patterns via JSON for easy sharing and version control.  

- **Line Styles Manager**  
  - Manage line styles by mapping patterns, weights, and colors.  
  - Import/export JSON configurations to quickly apply standards.  

- **Object Styles Manager**  
  - Control line styles for categories and subcategories.  
  - Adjust visibility, projection, and cut styles consistently.  

- **Style Comparison**  
  - Compare project styles with company standards using JSON imports.  
  - Identify matching, different, or missing styles.  
  - Helps enforce compliance with organizational CAD/BIM standards.  

---

### 2. Section Export

The **Section Export** plugin is dedicated to creating sectioned exports of a model.  
The plugin exports a vertical section of a building model to a new Revit file. This allows users to isolate and export elements between two selected levels (floors) in a Revit project.

<p align="center">
  <img src="/zutari-dev-wiki/img/section-export.png" alt="Automation" width="400" height="450" />
</p>

#### Features:

- **Element Filtering & Selection**
  - Analyzes elements between a user-selected top and bottom level Filters out problematic elements that can't be copied (sketch-based elements, boundaries, line-based families).
  - Optionally includes curtain wall host elements when panels/mullions are selected.


- **Export Process**
  - Creates a new Revit project file
  - Copies elements in batches (50 at a time) to handle large datasets
  - Preserves the physical elevation of elements
  - Creates a matching level in the new file at the correct elevation
  - Reassigns all copied elements to reference the new level

- **Cleanup & Organization**
  - Removes the default "Level 1" from the new project
  - Creates a floor plan view for the exported section
  - Names the output file with timestamp and level information

- **3D Visualization**
  - Includes a ShowSection() method that displays the selected vertical section in a 3D view
  Sets up a section box to show only elements between the selected levels

- **Use Case**
  - This would be useful for extracting a single floor or multi-floor section from a large building model - for example, exporting floors 3-5 of a 20-story building as a standalone Revit file for detailed coordination or analysis.


## Roadmap

The Style Manager is the first step. ZTools will expand with additional plugins targeting automation, modeling efficiency, and quality assurance.

