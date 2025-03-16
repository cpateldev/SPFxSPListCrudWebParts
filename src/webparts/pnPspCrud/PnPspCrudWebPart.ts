import { Log } from "@microsoft/sp-core-library";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
// Import the getGraph and getSP functions from pnpjsConfig.ts file.
import { getSP, getGraph } from "../pnpJSConfig";
import { SPFI } from "@pnp/sp";
import { GraphFI } from "@pnp/graph";
import styles from "./PnPspCrudWebPart.module.scss";
import { IListItem } from "../Common/IListItem";

export interface IPnPspCrudWebPartProps {}
const LOG_SOURCE: string = "PnPspCrudWebPart Web Part";

let _sp: SPFI;
let _graph: GraphFI;

export default class PnPspCrudWebPart extends BaseClientSideWebPart<IPnPspCrudWebPartProps> {
  public render(): void {
    Log.info(LOG_SOURCE, "PnPspCrudWebPart Rendering...");
    this._renderListAsync()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        Log.info(LOG_SOURCE, "Rendered");
      })
      .catch((e) => {
        console.error(e.message + e.stack);
        Log.error(LOG_SOURCE, e.message + e.stack);
      });
    //this.domElement.innerHTML = `<div class="${ styles.pnPspCrud }"></div>`;
  }

  protected onInit(): Promise<void> {
    // Initialize our _sp object that we can then use in other packages without having to pass around the context.
    // Check out pnpjsConfig.ts for an example of a project setup file.
    _sp = getSP(this.context);
    _graph = getGraph(this.context);
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  private async _renderListAsync(): Promise<void> {
    const sourceItem: IListItem = await _sp.web.lists
      .getByTitle("Invoices")
      .items.getById(1)();

    Log.info(LOG_SOURCE, "Success");
    if (!!sourceItem) {
      Log.info(LOG_SOURCE, `Item Title: ${sourceItem.Title}`);
      this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">Item Title: ${sourceItem.Title}</div>`;
    }

    Log.info(LOG_SOURCE, "Getting User...");
    /*
    const user = await _graph.me();
    if (!!user) {
      Log.info(LOG_SOURCE, `User: ${user.displayName}`);
      this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">User: ${user.displayName}</div>`;
    }
    */
    this.getCurrentUser().catch((error) => {
      Log.error(LOG_SOURCE, error);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getCurrentUser(): Promise<void> {    
    const currentUser = await _graph.me().catch((error) => {
      Log.error(LOG_SOURCE, error);
    });

    if (currentUser) {
      this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">User: ${currentUser.displayName}</div>`;
    }
  }
}
