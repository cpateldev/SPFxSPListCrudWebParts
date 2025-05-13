/*

npm install @microsoft/sp-component-base --save



import { BaseComponentContext } from "@microsoft/sp-component-base";
import { spfi, SPFI, SPFx as spSPFx } from "@pnp/sp";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import { LogLevel, PnPLogging } from "@pnp/logging";

let _sp: SPFI;
let _graph: GraphFI;

export const getSP = (context: BaseComponentContext): SPFI => {
  if (!!context) {
    _sp = spfi().using(spSPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};

export const getGraph = (context: BaseComponentContext): GraphFI => {
  if (!!context) {
    _graph = graphfi()
      .using(graphSPFx(context))
      .using(PnPLogging(LogLevel.Warning));
  }
  return _graph;
};

*/