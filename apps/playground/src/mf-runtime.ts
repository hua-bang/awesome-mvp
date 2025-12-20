import { ModuleFederation } from "module-federation";
import type { ModuleFederationOptions } from "module-federation";

const moduleFederationOptions: ModuleFederationOptions = {
  name: 'playground',
  remotes: {
    // Define your remotes here
    'mf_provider_demo': 'http://localhost:3090/mf-manifest.json',
  }
};

const initModuleFederation = () => {
  const moduleFederation = new ModuleFederation();
  moduleFederation.init(moduleFederationOptions);
  return moduleFederation;
}


const mfInstance = initModuleFederation();
export default mfInstance;






