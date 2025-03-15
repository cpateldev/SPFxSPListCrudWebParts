import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// Import the getGraph and getSP functions from pnpjsConfig.ts file.
import { getSP } from '../pnpJSConfig';
import { SPFI } from "@pnp/sp";
import styles from './PnPspCrudWebPart.module.scss';
import { IListItem } from "../Common/IListItem";

export interface IPnPspCrudWebPartProps {
}

// eslint-disable-next-line no-var
var _sp: SPFI;
// eslint-disable-next-line no-var
//let graph: GraphFI;

export default class PnPspCrudWebPart extends BaseClientSideWebPart<IPnPspCrudWebPartProps> {  
  public render(): void {
    console.log("Rendering");
    this._renderListAsync()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        console.log("Rendered");
      })
      .catch((e) => {
        console.error(e);
      });
    //this.domElement.innerHTML = `<div class="${ styles.pnPspCrud }"></div>`;
  }

  protected onInit(): Promise<void> {
    // Initialize our _sp object that we can then use in other packages without having to pass around the context.
    // Check out pnpjsConfig.ts for an example of a project setup file.
    _sp = getSP(this.context);
    //graph = getGraph(this.context);
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  private async _renderListAsync(): Promise<void> {
    const sourceItem: IListItem = await _sp.web.lists
      .getByTitle("SPFxCRUDOperationsTest")
      .items.getById(1)();
    console.log("Success");
    if (!!sourceItem) {
      console.log(`Item Title: ${sourceItem.Title}`);
      this.domElement.innerHTML = `<div class="${styles.pnPspCrud}">Item Title: ${sourceItem.Title}</div>`;
    }
  }
}
