import { MinipackConfig } from "../../src";
import path from "path";
import { getTSLoader, watermarkLoader } from "../../src/tool-kit/loaders";

const config: MinipackConfig = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: path.resolve(__dirname, "./dist/main.js"),
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ts 文件
        use: [getTSLoader(), watermarkLoader], // 指定你的 ho-loader 文件路径
      },
      {
        test: /\.ho$/, // 匹配 .ho 文件
        use(sourceCode) {
          return sourceCode;
        },
      },
    ],
  },
  plugins: [
    {
      apply(compiler) {
        compiler.hooks.config.tap('logConfig', (config: any) => {
          console.log('config', config);
        });
        compiler.hooks.emit.tap('logConfig', (moduleGraph: any) => {
          console.log('moduleGraph', moduleGraph);
        });
      },
    }
  ],
};

export default config;
