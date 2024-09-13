import { bundle } from "./bundle";
import { createModuleGraph } from "./module";
import { MinipackConfig } from "./typings";
import fs from "fs";

export const build = (minipackConfig: MinipackConfig) => {
  const moduleGraph = createModuleGraph(minipackConfig);
  const bundleCode = bundle(moduleGraph);
  const { output } = minipackConfig;
  fs.writeFileSync(output, bundleCode);
};
