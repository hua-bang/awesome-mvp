import { MinipackConfig } from "../../src";
import path from "path";

const config: MinipackConfig = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: path.resolve(__dirname, "./dist/main.js"),
};

export default config;
