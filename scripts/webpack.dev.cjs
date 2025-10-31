const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackInjectAttributesPlugin = require("html-webpack-inject-attributes-plugin");
const common = require("./webpack.common.cjs");
const { resolve, pkgName, PROJECT_PATH } = require("./constants.cjs");
const { toCamelCase } = require("./utils.cjs");

module.exports = merge(common, {
  mode: "development",
  output: {
    library: {
      name: toCamelCase(pkgName),
    },
  },
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
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, "./public/index.html"),
      scriptLoading: "blocking",
      // 添加自定义属性
      attributes: {
        // 43是一个测试项目的项目id
        "data-project-id": "43",
        "data-api": "1",
        crossorigin: "anonymous",
      },
    }),
    new htmlWebpackInjectAttributesPlugin(),
  ],
});
