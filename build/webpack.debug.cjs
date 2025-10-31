const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const common = require("./webpack.common.cjs");
const { toCamelCase } = require("./utils.cjs");
const { pkgName } = require("./constants.cjs");

module.exports = merge(common, {
  mode: "none",
  output: {
    library: {
      name: toCamelCase(pkgName),
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // 开一个本地服务查看报告
      analyzerHost: "127.0.0.1", // host 设置
      analyzerPort: 9201, // 端口号设置
      // 是否在默认浏览器中自动打开报告
      openAnalyzer: false,
    }),
  ],
});
