---
id: clash-data-reporting
title: Clash Data Reporting
sidebar_label: Clash Data Reporting
---

The **Clash Data Reporting plugin** is the first tool in the ZTools Navisworks suite.
It enables BIM coordinators and project teams to extract, structure, and publish clash detection data directly from Navisworks into centralized systems — without manual configuration or repetitive exports.

---

### Features:

- ### Clash Data Extraction ###  
  - Extracts all clash tests from the Navisworks document and Collects detailed properties including:
    - Project name (resolved from backend)
    - Clash test name
    - Disciplines involved
    - Zones
    - Clash status counts
    - Tolerance
    - Priority
    - Test creation. 
  <p align="center">
    <img src="/Zutari-Dev-Wiki/img/clash-data-reporting-feature.png" alt="Automation" width="750" height="450" />
  </p>


- ### Backend-Driven Project Mapping ###  
  - Project names are retrieved from a central backend service which eliminates manual project selection or naming errors and ensures clash data is always associated with the correct project record. The image shown in **figure 1.1** below allows us to select a model from a backend server. 
  <p align="center">
    <img src="/Zutari-Dev-Wiki/img/clash-data-reporting-project.png" alt="Automation" width="750" height="450" />
  </p>

- ### SQL Database Integration ###  
  - User can export clash data directly into a SQL server database. The image shown in **figure 1.2** below allows us to export the data to an sql database without the need for connection strings. 
  <p align="center">
    <img src="/Zutari-Dev-Wiki/img/clash-data-reporting-cloud.png" alt="Automation" width="390" height="300" />
  </p>

- ### XML Export ###  
  - Users can optionaly export the clash data to a structured XML file. The image shown in **figure 1.3** below allows us export the data to an xml file. 
  <p align="center">
    <img src="/Zutari-Dev-Wiki/img/clash-data-reporting-xml.png" alt="Automation" width="390" height="300" />
  </p>
