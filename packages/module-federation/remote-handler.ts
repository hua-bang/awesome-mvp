import { Module } from './module';
import { fetchRemoteModuleOptions } from './utils/fetch';
import type { RemoteItemDefinition } from "./typings";
import type ModuleFederation from './core';

export class RemoteHandler {

  modules: Record<string, Module> = {};
  host: ModuleFederation;

  constructor(host: ModuleFederation) {
    this.host = host;
  }

  async loadRemote(id: string, remote: RemoteItemDefinition) {
    let module = this.modules[id];

    if (!module) {
      const moduleOptions = await fetchRemoteModuleOptions(remote);
      module = new Module(moduleOptions);
      await module.init(this.host.options?.shared || {});
    }

    return await module.get(id);
  }
}

export default RemoteHandler;