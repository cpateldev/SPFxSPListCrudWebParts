// ********* DO NOT USE THIS VERSION OF PnP JS config. Use pnpJSConfig.ts instead ************

/* ALTERNATE WAY TO USE PNPJS CONFIGURATION

// import for """WebPartContext""" INSTEAD OF """ISPFXContext""" which we will use to configure our SPFI/GraphFI interfaces. 
// This is useful when you are working with SPFx webparts ONLY.

*/

import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { spfi, SPFI, SPFx as spSPFx } from "@pnp/sp";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import { LogLevel, PnPLogging } from "@pnp/logging";

// imports for modules you want to use
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/graph/users";

let _sp: SPFI;
let _graph: GraphFI;

export const getSP = (context?: WebPartContext): SPFI => {
  // old line 1 :: if (context !== null) { was erroring out, so solution is --> // new line:: if (!!context) { OR if (context !== undefined) {
  if (!!context) {
    //You must add the @pnp/logging package to include the PnPLogging behaviour it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _sp = spfi().using(spSPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};

export const getGraph = (context?: WebPartContext): GraphFI => {
  // old line 1 :: if (context !== null) { was erroring out, so solution is --> // new line:: if (!!context) { OR if (context !== undefined) {
  if (!!context) {
    //You must add the @pnp/logging package to include the PnPLogging behaviour it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _graph = graphfi()
      .using(graphSPFx(context))
      .using(PnPLogging(LogLevel.Warning));
  }
  return _graph;
};
