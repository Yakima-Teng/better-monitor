import webpack from "webpack";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import htmlWebpackInjectAttributesPlugin from "html-webpack-inject-attributes-plugin";
import { joinPath } from "nsuite";
import common from "#build/webpack.common";
import { PATH_PUBLIC, pkgName } from "#build/constants";
import { toCamelCase } from "#build/utils";

const config: webpack.Configuration = merge(common, {
  mode: "development",
  output: {
    // @ts-ignore
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
      template: joinPath(PATH_PUBLIC, "./index.html"),
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

export default config;
