/*
npm install @microsoft/sp-adaptive-card-extension-base --save


import { AdaptiveCardExtensionContext } from "@microsoft/sp-adaptive-card-extension-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import { LogLevel, PnPLogging } from "@pnp/logging";

let _sp: SPFI;
let _graph: GraphFI;

export const getSP = (context: AdaptiveCardExtensionContext): SPFI => {
  if (!!context) {
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};

export const getGraph = (context: AdaptiveCardExtensionContext): GraphFI => {
  if (!!context) {
    _graph = graphfi()
      .using(graphSPFx(context))
      .using(PnPLogging(LogLevel.Warning));
  }
  return _graph;
};


*/

