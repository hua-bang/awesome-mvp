import { createModuleGraph } from "./module";
import { MinipackConfig } from "./typings";

export const build = (minipackConfig: MinipackConfig) => {
  const moduleGraph = createModuleGraph(minipackConfig);
  console.log("moduleGraph", moduleGraph);
};
