## Folder Structure with detailed documentation

```
📁 .vscode/
    └── 📄 settings.json - Configuration settings for Visual Studio Code.
    └── 📄 launch.json - Configuration for launching and debugging the application.
📁 config/
    ├── 📄 config.json - Configuration file for the project.
    ├── 📄 copy-assets.json - Configuration for copying assets.
    └── 📄 deploy-azure-storage.json - Configuration for deploying to Azure Storage.
    ├── 📄 serve.json - Configuration for serving the project locally.
    └── 📄 package-solution.json - Configuration for packaging the solution.

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
    │   │   ├── 📄 PnPspCrudWebPart.module.scss - Styling for the PnP SharePoint CRUD web part.
    │   │   ├── 📄 PnPspCrudWebPart.ts - Entry file for the PnP SharePoint CRUD web part.
    │   │   └── 📄 PnPspCrudWebPart.manifest.json - Manifest file for the PnP SharePoint CRUD web part.
    │   ├── 📁 pnpJsReactCrud/
    │   │   ├── 📁 components/
    │   │   │   ├── 📄 IPnpJsReactCrudProps.ts - Interface for the properties of the PnP JS React CRUD component.
    │   │   │   ├── 📄 PnpJsReactCrud.tsx - Main React component for the PnP JS CRUD operations.
    │   │   │   └── 📄 PnpJsReactCrud.module.scss - Styling for the PnP JS CRUD component.
    │   │   ├── 📄 PnpJsReactCrudWebPart.ts - Entry file for the PnP JS CRUD web part.
    │   │   └── 📄 PnpJsReactCrudWebPart.manifest.json - Manifest file for the PnP JS CRUD web part.            
    ├── 📄 index.ts - Main entry point for the project.
    └── 📄 webparts.ts - Entry point for all web parts.

📄 .gitignore - Specifies files and directories to be ignored by Git.
📄 gulpfile.js - Gulp tasks for build automation.
📄 package.json - Project metadata and dependencies.
📄 README.md - Project documentation.
📄 tsconfig.json - TypeScript configuration file.

```
