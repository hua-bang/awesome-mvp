import { MinipackConfig } from "../../src";
import path from "path";

const config: MinipackConfig = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: path.resolve(__dirname, "./dist/main.js"),
  module: {
    rules: [
      {
        test: /\.ho$/, // 匹配 .ho 文件
        use(sourceCode) {
          return sourceCode;
        },
      },
    ],
  },
};

export default config;
