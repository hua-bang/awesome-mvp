import { MinipackConfig } from "../typings";
import { MinipackCompiler } from "./compiler";

export const build = (minipackConfig: MinipackConfig) => {
  const minipack = new MinipackCompiler(minipackConfig);
  minipack.compile();
};

export * from "./compiler";
