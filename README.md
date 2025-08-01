# SPFx SPO List CRUD Web Parts

## Table of Contents
- [SPFx SPO List CRUD Web Parts](#spfx-spo-list-crud-web-parts)
  - [Table of Contents](#table-of-contents)
  - [Summary](#summary)
  - [Features](#features)
  - [Compatibility](#compatibility)
  - [Prerequisites](#prerequisites)
  - [Applies to](#applies-to)
  - [Authors](#authors)
  - [Version history](#version-history)
  - [Minimal Path to Awesome](#minimal-path-to-awesome)
    - [Install react and reactdom packages](#install-react-and-reactdom-packages)
  - [Debugging](#debugging)
  - [Graph API Permissions](#graph-api-permissions)
    - [For this solution,](#for-this-solution)
    - [For multiple scopes](#for-multiple-scopes)
    - [OR if domain isolated flag is true in package solution file.](#or-if-domain-isolated-flag-is-true-in-package-solution-file)
  - [Solution Structure](#solution-structure)
    - [SPFx Assets locations](#spfx-assets-locations)
  - [References](#references)
  - [Disclaimer](#disclaimer)

## Summary

This project contains SharePoint Framework (SPFx) web parts that demonstrate CRUD (Create, Read, Update, Delete) operations on SharePoint Online lists. The web parts are built using React and leverage the SharePoint REST API to interact with list data. These examples showcase how to perform basic data manipulation tasks within a SharePoint Online environment, providing a practical reference for developers looking to implement similar functionality in their own SPFx solutions.

## Features

This solution contains two webparts

1. PnPJS SP CRUD
2. PnPJS React CRUD

This extension illustrates the following concepts:

- How to use getsp and getgraph modules to centrally create _sp and _graph objects using common context
- How to perform CRUD operations using pnpjs sp api on sample SP List
- How to read user details using pnpjs graph api.
- How to configure PnPJS logging.
 
> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## Compatibility

> [!WARNING] Important
> Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.20.0](https://img.shields.io/badge/SPFx-1.20.0-blue.svg?style=for-the-badge)
![Node.js v18](https://img.shields.io/badge/Node.js-v18-darkgreen.svg?style=for-the-badge)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg?style=for-the-badge)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg?style=for-the-badge)

![SP2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg?style=for-the-badge)
![SP 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg?style=for-the-badge "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench](https://img.shields.io/badge/Local%20Workbench-Not%20Supported-red.svg?style=for-the-badge)


For more information about SPFx compatibility, please refer to <https://aka.ms/spfx-matrix>

## Prerequisites

![SPFx 1.20.0](https://img.shields.io/badge/SPFx-1.20.0-blue.svg?style=for-the-badge)
![Node.js v18](https://img.shields.io/badge/Node.js-v18-darkgreen.svg?style=for-the-badge)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)


> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)


## Authors

**Chirag Patel**

## Version history

|Version|Date| Comments|
|--------|-- | --------|
| 1.0.2 | March 30, 2025 | Initial Release |

---

## Minimal Path to Awesome

### Install react and reactdom packages

> [!IMPORTANT]
>
> **`react@17.0.1 react-dom@17.0.1`** are required version for SPFx 1.20.1 compatibility

```PowerShell
npm i react@17.0.1 react-dom@17.0.1 --save-exact
```
> **Other dependencies to validate if *npm install* does not resolve**

``` PowerShell
npm install @microsoft/applicationinsights-web --save

npm install office-ui-fabric-react --save

npm install simple-react-validator --save

npm install @pnp/sp --save
```

> Include any additional steps as needed.

## Debugging

> [!WARNING]Debug solution locally
>
> ```PowerShell
> gulp clean
> gulp build
> gulp serve --nobrowser
> ```
>```URL
> https://m365devlab01.sharepoint.com/sites/M365AppDev/_layouts/workbench.aspx
>```

## Graph API Permissions

Permissions are defined in `package-solution.json` file to grant graph api access level.

### For this solution, 

```json
"webApiPermissionRequests": [
  {
    "resource": "Microsoft Graph",
    "scope": "User.Read.All"
  }
]
```

### For multiple scopes

```json
    "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "Directory.Read.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "User.Read"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "User.Read.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Group.Read.All"
    }
  ]
 ```
 
 ### OR if domain isolated flag is true in package solution file.

```json
"isDomainIsolated": true,
    "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "Directory.Read.All"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "User.Read"
      }
    ]    
```
## Solution Structure

```
📁 .vscode/
    └── 🛠️ settings.json - Configuration settings for Visual Studio Code.
    └── 🛠️ launch.json - Configuration for launching and debugging the application.

📁 config/
    ├── 🛠️ config.json - Configuration file for the project.
    ├── 📋 copy-assets.json - Configuration for copying assets.
    ├── 🛠️ deploy-azure-storage.json - Configuration for deploying to Azure Storage.
    ├── 🔌 serve.json - Configuration for serving the project locally.
    └── 📦 package-solution.json - Configuration for packaging the solution.

📁 lib/
    └── 📄 index.js - Compiled JavaScript files.

📁 node_modules/ - Directory containing project dependencies.
    ├── 📁 @pnp/
    │   ├── 📁 sp/ - SharePoint PnP JS library.
    │   ├── 📁 graph/ - Microsoft Graph PnP JS library.
    │   └── 📁 logging/ - PnP logging library.
    ├── 📁 react/ - React library version 17.0.1.
    └── 📁 react-dom/ - React DOM library version 17.0.1.
    └── 📁 [Other npm packages]

📁 src/
    ├── 📁 webparts/
    │   ├── 📁 pnPspCrud/
    │   │   ├── 📝 PnPspCrudWebPart.module.scss - Styling for the PnP SharePoint CRUD web part.
    │   │   ├── 📄 PnPspCrudWebPart.ts - Entry file for the PnP SharePoint CRUD web part.
    │   │   └── 📜 PnPspCrudWebPart.manifest.json - Manifest file for the PnP SharePoint CRUD web part.
    │   ├── 📁 pnpJsReactCrud/
    │   │   ├── 📁 components/
    │   │   │   ├── 📄 IPnpJsReactCrudProps.ts - Interface for the properties of the PnP JS React CRUD component.
    │   │   │   ├── ⚛️ PnpJsReactCrud.tsx - Main React component for the PnP JS CRUD operations.
    │   │   │   └── 📝 PnpJsReactCrud.module.scss - Styling for the PnP JS CRUD component.
    │   │   ├── 📄 PnpJsReactCrudWebPart.ts - Entry file for the PnP JS CRUD web part.
    │   │   └── 📜 PnpJsReactCrudWebPart.manifest.json - Manifest file for the PnP JS CRUD web part.            
    ├── 📄 index.ts - Main entry point for the project.
    └── 📄 webparts.ts - Entry point for all web parts.

📝 .gitignore - Specifies files and directories to be ignored by Git.
📝 .npmignore - Specifies files and directories to be ignored by npm during package installation.
⚡ gulpfile.js - Gulp tasks for build automation.
📦 package.json - Project metadata and dependencies.
📘 README.md - Project documentation.
🎯 .yo-rc.json - Yeoman configuration file.
⚙️ tsconfig.json - TypeScript compiler configuration file that specifies root files and compiler options required to compile the project.

```
### SPFx Assets locations

> **Tenant App Catalog**
>
> https://`<tenant>`.sharepoint.com/sites/`appcatalog`/_layouts/15/tenantAppCatalog.aspx/manageApps
>
> **ClientSide Assets library:**
>
> https://`<tenant>`.sharepoint.com/sites/`<site name>`/**ClientSideAssets**
>
> **Component Manifests**
>
> https://`<tenant>`.sharepoint.com/sites/`<site name>`/**ComponentManifests**

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

[Go to TOC](#table-of-contents)
