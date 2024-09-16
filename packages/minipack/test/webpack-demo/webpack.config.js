import { getTSLoader } from "../../src/tool-kit/loaders";
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ho 文件
        use: getTSLoader(), // 指定你的 ho-loader 文件路径
      },
      {
        test: /\.ho$/, // 匹配 .ho 文件
        use: path.resolve(__dirname, "./loaders/ho-loader.js"), // 指定你的 ho-loader 文件路径
      },
    ],
  },
};
