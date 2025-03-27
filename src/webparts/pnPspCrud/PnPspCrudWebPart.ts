import { Log } from "@microsoft/sp-core-library";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
// Import the getGraph and getSP functions from pnpjsConfig.ts file.
import { getSP, getGraph } from "../pnpJSConfig";
import { SPFI } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";

import { GraphFI } from "@pnp/graph";
import styles from "./PnPspCrudWebPart.module.scss";
import { IListItem, IPetListItem } from "../Common/IListItem";
import SharePointRepository from "../Repository/SharePointRepository";

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
    console.log("PnPspCrudWebPart._renderListAsync");

    /*
    Call another web's list item using PnPjs
    https://pnp.github.io/pnpjs/sp/webs/#access-a-web

    The above examples show you how to use the constructor to create the base url for the Web although none of them are usable as is until you add observers. 
    You can do so by either adding them explicitly with a using...

    import { spfi, SPFx } from "@pnp/sp";
    import { Web } from "@pnp/sp/webs";

    const web1 = Web("https://tenant.sharepoint.com/sites/myweb").using(SPFx(this.context));

    without line ".using(SPFx(this.context))" you will get the error 'Error: No observers registered for this request. (https://pnp.github.io/pnpjs/queryable/queryable#no-observers-registered-for-this-request)'
    */
    try {
      const weburl =
        "https://m365devlab01.sharepoint.com/sites/PowerPlatformDev";
      //const _web = Web(weburl).using(SPFx(this.context)); // Approach 1: requires - import { SPFI } from "@pnp/sp";
      const _web = Web([_sp.web, weburl]); // Approach 2: recommended. No need to import SPFI

      const petsItem: IPetListItem = await _web.lists
        .getByTitle("Pets")
        .items.getById(1)();

      console.log("Pets Item Title: " + petsItem.Title);
      if (!!petsItem) {
        Log.info(LOG_SOURCE, `Pets Item Title: ${petsItem.Title}`);
        this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">Pets Item Title:: ${petsItem.Title}</div>`;
      }

      // Call the SharePointRepository class to get one Pet item
      const petsItem1: IPetListItem = await new SharePointRepository<IPetListItem>(
        _sp,
        "Pets",
        weburl
      ).getOne(1);

      Log.info(LOG_SOURCE, "Success");
      if (!!petsItem1) {  
        Log.info(LOG_SOURCE, `Pets Item Title: ${petsItem1.Title}`);
        this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">SPRepo > Pets Item Title:: ${petsItem1.Title} and Breed:: ${petsItem1.Breed} </div>`;
      }

    } catch (error) {
      console.error(error);
      Log.error(LOG_SOURCE, error);
      throw new Error(error);
    }

    // Call _sp instance's get the item by Id
    const sourceItem: IListItem = await _sp.web.lists
      .getByTitle("Invoices")
      .items.getById(1)();      

    Log.info(LOG_SOURCE, "Success");
    if (!!sourceItem) {
      Log.info(LOG_SOURCE, `Item Title: ${sourceItem.Title}`);
      this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">Item Title:: ${sourceItem.Title}</div>`;
    }

    // Call the SharePointRepository class to get one
    const sourceItem1: IListItem = await new SharePointRepository<IListItem>(
      _sp,
      "Invoices"
    ).getOne(1);

    Log.info(LOG_SOURCE, "Success");
    if (!!sourceItem1) {
      Log.info(LOG_SOURCE, `Item Title: ${sourceItem1.Title}`);
      this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">Item Title:: ${sourceItem1.Title}</div>`;
    }

    // Call the SharePointRepository class to get one with query options
    const sourceItem2: IListItem = await new SharePointRepository<IListItem>(
      _sp,
      "Invoices"
    ).getOne(1, { select: ["Title", "Amount"] });
    Log.info(LOG_SOURCE, "Success");
    if (!!sourceItem2) {
      Log.info(LOG_SOURCE, `Item Title: ${sourceItem2.Title}`);
      this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">Item Title:: ${sourceItem2.Title}, Amount:: ${sourceItem2.Amount}</div>`;
    }

    Log.info(LOG_SOURCE, "Getting User...");
    /*
    const user = await _graph.me();
    if (!!user) {
      Log.info(LOG_SOURCE, `User: ${user.displayName}`);
      this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">User: ${user.displayName}</div>`;
    }
    */

    // Get the current user using Graph API
    this.getCurrentUser().catch((error) => {
      Log.error(LOG_SOURCE, error);
    });

    // Get all items
    const sourceItems: IListItem[] = await new SharePointRepository<IListItem>(
      _sp,
      "Invoices"
    ).getAll();
    if (!!sourceItems) {
      sourceItems.forEach((item: IListItem) => {
        Log.info(LOG_SOURCE, `Item Title: ${item.Title}`);
        this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">Item Title: ${item.Title}</div>`;
      });
    }

    // Get items by CAML query
    const camlQuery = {
      ViewXml: `<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>Invoice 1</Value></Eq></Where></Query></View>`,
    };
    const sourceItemsByCAML: IListItem[] =
      await new SharePointRepository<IListItem>(
        _sp,
        "Invoices"
      ).getItemsByCAMLQuery(camlQuery);

    if (!!sourceItemsByCAML) {
      sourceItemsByCAML.forEach((item: IListItem) => {
        Log.info(LOG_SOURCE, `Item Title: ${item.Title}`);
        this.domElement.innerHTML += `<div class="${styles.pnPspCrud}">Item Title: ${item.Title}</div>`;
      });
    }
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
