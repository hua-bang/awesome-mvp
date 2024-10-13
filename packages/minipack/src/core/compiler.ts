import fs from "fs";
import { createModuleGraph } from "./module";
import { bundle } from "./bundle";
import { MinipackConfig } from "../typings";
import MinipackPluginManager from "./plugin";
import minipackHooks from "./hooks";

class MinipackCompiler {
  private pluginsManager: MinipackPluginManager = new MinipackPluginManager(this);
  public hooks = minipackHooks;

  constructor(private minipackConfig: MinipackConfig) {
    const { plugins = [] } = this.minipackConfig;
    this.pluginsManager.apply(plugins);
    this.hooks.config.call(this.minipackConfig);
    this.hooks.start.call(this);
  }

  compile() {
    const moduleGraph = createModuleGraph(this.minipackConfig);
    const bundleCode = bundle(moduleGraph);
    const { output } = this.minipackConfig;
    fs.writeFileSync(output, bundleCode);
    this.hooks.emit.call(moduleGraph, this);
  }
}

export { MinipackCompiler };
