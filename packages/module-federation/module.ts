import type { ModuleOptions } from "./typings";
import { global } from "./utils/global";
import { loadScript } from "./utils/load-script";

interface RemoteEntryExport {
  get: (id: string) => Promise<any>;
  init: (...args: any[]) => void;
}

export class Module {
  options: ModuleOptions;

  remoteEntryExport: RemoteEntryExport | null = null;

  constructor(options: ModuleOptions) {
    this.options = options;
  }

  async getEntry() {
    if (this.remoteEntryExport) {
      return this.remoteEntryExport;
    }

    const metaData = this.options.metaData;
    const remoteEntryUrl = `${metaData['publicPath']}${metaData?.remoteEntry?.name}`;

    await loadScript(remoteEntryUrl);

    this.remoteEntryExport = global[this.options.name] as RemoteEntryExport;

    return this.remoteEntryExport;
  }

  async get(id: string) {
    if (!this.remoteEntryExport) {
      await this.getEntry();
    }

    if (!this.remoteEntryExport) {
      throw new Error(`Remote entry export not found`);
    }

    const moduleFactory = await this.remoteEntryExport.get(id);
    return typeof moduleFactory === 'function' ? moduleFactory() : moduleFactory;
  }
}

export default Module;