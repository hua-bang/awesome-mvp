import { bundle } from "./core/bundle";
import { createModuleGraph } from "./core/module";
import { MinipackConfig } from "./typings";
import fs from "fs";

class Minipack {
  constructor(private minipackConfig: MinipackConfig) {}

  compile() {
    const moduleGraph = createModuleGraph(this.minipackConfig);
    const bundleCode = bundle(moduleGraph);
    const { output } = this.minipackConfig;
    fs.writeFileSync(output, bundleCode);
  }
}

export const build = (minipackConfig: MinipackConfig) => {
  const minipack = new Minipack(minipackConfig);
  minipack.compile();
};
