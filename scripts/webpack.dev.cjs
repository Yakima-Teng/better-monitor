const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackInjectAttributesPlugin = require("html-webpack-inject-attributes-plugin");
const common = require("./webpack.common.cjs");
const { resolve, PROJECT_PATH } = require("./constants.cjs");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    host: "127.0.0.1", // 指定 host，不设置的话默认是 localhost
    port: 9200, // 指定端口，默认是8080
    compress: true, // 是否启用 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    client: {
      // 禁用错误遮罩层
      overlay: false,
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // 开一个本地服务查看报告
      analyzerHost: "127.0.0.1", // host 设置
      analyzerPort: 9201, // 端口号设置
      // 是否在默认浏览器中自动打开报告
      openAnalyzer: false,
    }),
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, "./public/index.html"),
      scriptLoading: "blocking",
      // 添加自定义属性
      attributes: {
        // 43是一个测试项目的项目id
        "data-project-id": "43",
        crossorigin: "anonymous",
      },
    }),
    new htmlWebpackInjectAttributesPlugin(),
  ],
});
