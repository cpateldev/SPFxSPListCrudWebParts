
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import { LogLevel, PnPLogging } from "@pnp/logging";


let _graph: GraphFI;

export const getGraph = (context?: WebPartContext): GraphFI => {
  if (!!context) {
    //You must add the @pnp/logging package to include the PnPLogging behaviour it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _graph = graphfi()
      .using(graphSPFx(context))
      .using(PnPLogging(LogLevel.Warning));
  }
  return _graph;
};


/*
Azure Portal App Registration: SharePoint Online Client Extensibility Web Application Principal or SharePoint Online Client Web Extensibility

We need to set the scope of the API to get the information from graph API.
Open package-solution.json file in config directory.
Add the below code in the webApiPermissionRequests array.

    "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "User.Read.All"
      }
    ]
OR for multiple scopes

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

OR
if domain isolated flag is true in package solution file.

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

*/