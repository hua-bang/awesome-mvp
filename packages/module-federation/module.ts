import type { ModuleOptions, SharedDependencies } from "./typings";
import { global } from "./utils/global";
import { loadScript } from "./utils/load-script";

interface RemoteEntryExport {
  get: (id: string) => Promise<any>;
  init: (...args: any[]) => Promise<void>;
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
    let remoteEntryExport = this.remoteEntryExport;

    if (!remoteEntryExport) {
      remoteEntryExport = await this.getEntry();
    }

    const moduleFactory = await remoteEntryExport.get(id);
    return typeof moduleFactory === 'function' ? moduleFactory() : moduleFactory;
  }

  async init(shared: SharedDependencies) {
    let remoteEntryExport = this.remoteEntryExport;

    if (!remoteEntryExport) {
      remoteEntryExport = await this.getEntry();
    }

    const sharedConfig: Record<string, any> = {};

    for (const key in shared) {
      const lib = shared[key]?.lib;

      if (lib) {
        sharedConfig[key] = lib();
      }
    }

    await remoteEntryExport.init(sharedConfig);
  }
}

export default Module;