interface MinipackConfigModuleRule {
  test: RegExp;
  use: (sourceCode: string) => string;
}

interface MinipackConfigModule {
  rules?: MinipackConfigModuleRule[];
}

export interface MinipackConfig {
  entry: string;
  output: string;
  module?: MinipackConfigModule;
}
