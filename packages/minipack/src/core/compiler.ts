import fs from "fs";
import { createModuleGraph } from "./module";
import { bundle } from "./bundle";
import { MinipackConfig } from "../typings";

class MinipackCompiler {
  constructor(private minipackConfig: MinipackConfig) {}

  compile() {
    const moduleGraph = createModuleGraph(this.minipackConfig);
    const bundleCode = bundle(moduleGraph);
    const { output } = this.minipackConfig;
    fs.writeFileSync(output, bundleCode);
  }
}

export { MinipackCompiler };
