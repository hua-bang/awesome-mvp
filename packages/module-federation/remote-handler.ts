import { Module } from './module';
import { fetchRemoteModuleOptions } from './utils/fetch';
import type { RemoteItemDefinition } from "./typings";

export class RemoteHandler {

  modules: Record<string, Module> = {};

  async loadRemote(id: string, remote: RemoteItemDefinition) {
    let module = this.modules[id];

    if (!module) {
      const moduleOptions = await fetchRemoteModuleOptions(remote);
      module = new Module(moduleOptions);
    }

    return await module.get(id);
  }
}

export default RemoteHandler;