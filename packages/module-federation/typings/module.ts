export type RemoteItemDefinition = string;

export type Remotes = Record<string, RemoteItemDefinition>;

export interface ModuleOptions {
  id: string;
  name: string;
  metaData: Record<string, any>;
}

export type SharedDependencies = Record<string, { lib: () => any; }>;

export interface ModuleFederationOptions {
  name: string;
  remotes?: Remotes;
  shared?: SharedDependencies;
}