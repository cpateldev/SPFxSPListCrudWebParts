/*
  Below code works for both WebParts and Extensions as well including React components
  
  **npm dependencies**

  npm install @pnp/sp --save
  npm install @pnp/graph --save
  npm install @pnp/logging --save

*/

// import pnp and pnp logging system
import { spfi, SPFI, SPFx, ISPFXContext } from "@pnp/sp";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import { LogLevel, PnPLogging } from "@pnp/logging";

// imports for modules you want to use, comment out those you are not going to use
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/graph/users";

//Using a singleton or lazy initialization pattern could improve maintainability and avoid unintended state sharing.

export const getSP = (() => {
  let _sp: SPFI | null = null;
  return (context: ISPFXContext): SPFI => {
    if (!_sp && !!context) {
      _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    return _sp!;
  };
})();

export const getGraph = (() => {
  let _graph: GraphFI | null = null;
  return (context: ISPFXContext): GraphFI => {
    if (!_graph && !!context) {
      _graph = graphfi()
        .using(graphSPFx(context))
        .using(PnPLogging(LogLevel.Warning));
    }
    return _graph!;
  };
})();