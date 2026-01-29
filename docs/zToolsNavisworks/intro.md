---
id: intro
title: ZToolsNavisworks
sidebar_label: Introduction
---

# ZTools Navisworks Add-ins

ZTools is a suite of Autodesk Navisworks Manage add-ins designed to enhance BIM coordination workflows by automating data extraction, reporting, and integration with external systems.
The tools focus on clash detection intelligence, data standardization, and seamless backend integration, reducing manual effort and improving visibility across projects.

The suite is built using WPF with MVVM, ensuring a modern, responsive, and maintainable user interface aligned with enterprise BIM tooling standards.

<p align="center">
  <img src="/Zutari-Dev-Wiki/img/ztools-navis-ribbon.png" alt="Automation" width="650" height="120" />
</p>

---

## Why a Suite of Navisworks Plugins?

Modern coordination workflows require more than just viewing clashes — they require actionable data, traceability, and integration with dashboards and reporting platforms.

ZTools for Navisworks addresses this by:

- Automating clash data extraction
- Enforcing consistent reporting standards
- Eliminating manual exports and connection setup
- Integrating directly with centralized backend services

By providing a unified plugin suite, teams can maintain consistent clash reporting across projects, disciplines, and Navisworks versions.

## 📌 Plugins
### 1. Clash Data Reporting

The **Clash Data Reporting plugin** is the first tool in the ZTools Navisworks suite.
It enables BIM coordinators and project teams to extract, structure, and publish clash detection data directly from Navisworks into centralized systems — without manual configuration or repetitive exports.

<p align="center">
  <img src="/Zutari-Dev-Wiki/img/clash-data-reporting.png" alt="Automation" width="750" height="450" />
</p>

#### Features:

- **Clash Data Extraction**
  - Extracts all clash tests from the Navisworks document.
  - Supports clash groups and individual clash results.
  - Collects detailed properties including:
    - Project name (resolved from backend)
    - Clash test name
    - Disciplines involved
    - Zones
    - Clash status counts:
      - New
      - Active
      - Approved
      - Reviewed
      - Resolved
    - Total clash count
    - Tolerance
    - Priority
    - Test creation / execution date

- **Backend-Driven Project Mapping**  
  - Clash data is sent directly to a backend API.

- **SQL Database Integration**  
  - Backend persists clash data into a SQL Server database.  

- **XML Export**  
  - Optional export of clash data to a structured XML file.  

