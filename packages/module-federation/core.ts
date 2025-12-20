import { RemoteHandler } from './remote-handler';
import type { ModuleFederationOptions } from './typings/module';

export class ModuleFederation {
  options: ModuleFederationOptions | null = null;
  remoteHandler: RemoteHandler = new RemoteHandler();

  init(options: ModuleFederationOptions) {
    this.options = options;
  }


  async loadRemote(id: string) {

    const remoteMeta = this.options?.remotes?.[id];

    if (!remoteMeta) {
      throw new Error(`Remote ${id} not found`);
    }

    const moduleFactory = await this.remoteHandler?.loadRemote(id, remoteMeta);
    return moduleFactory;
  }
}

export default ModuleFederation;