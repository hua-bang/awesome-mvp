import { MinipackPlugin } from "./typings";

class MinipackPluginManager {
  plugins: MinipackPlugin[] = [];
  compiler: any;

  constructor(compiler: any) {
    this.compiler = compiler;
  }

  apply(plugins: MinipackPlugin[]) {
    this.plugins = [...this.plugins, ...plugins];
    this.plugins.forEach(plugin => {
      plugin.apply(this.compiler);
    })
  }
}

export {
  MinipackPlugin,
  MinipackPluginManager
}

export default MinipackPluginManager;