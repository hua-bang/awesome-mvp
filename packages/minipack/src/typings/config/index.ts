import { Loader } from "../loader";

interface MinipackConfigModuleRule {
  test: RegExp;
  use: Loader;
}

interface MinipackConfigModule {
  rules?: MinipackConfigModuleRule[];
}

export interface MinipackConfig {
  entry: string;
  output: string;
  module?: MinipackConfigModule;
}
