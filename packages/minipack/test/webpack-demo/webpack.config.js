const path = require("path");

const StatoscopeWebpackPlugin = require("@statoscope/webpack-plugin").default;

module.exports = {
  entry: {
    index: {
      import: "./src/index.js",
      runtime: "runtime",
    },
    main: {
      import: "./src/main.js",
      runtime: "runtime",
    },
    test: {
      import: "./src/test.js",
      runtime: "runtime",
    },
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name]_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ho$/, // 匹配 .ho 文件
        use: path.resolve(__dirname, "./loaders/ho-loader.js"), // 指定你的 ho-loader 文件路径
      },
    ],
  },
  plugins: [new StatoscopeWebpackPlugin()],
  optimization: {
    splitChunks: {
      chunks: "all", // 表示所有的 chunk 都会被提取出来
      cacheGroups: {
        common: {
          name: "common",
          minChunks: 3, // 被至少 3 个 chunk 引用时提取
          minSize: 0, // 大小为 0 时提取
          priority: -10,
          reuseExistingChunk: true, // 如果模块已经存在于某个 chunk 中，则重用它
        },
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react-vendor",
          chunks: "all",
        },
      },
    },
  },
};
