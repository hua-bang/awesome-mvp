export interface Output {
  path: string;
  filename: string;
}

export interface MinipackConfig {
  entry: string;
  output: Output;
}
