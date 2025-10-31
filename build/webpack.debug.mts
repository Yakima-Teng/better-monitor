import webpack from "webpack";
import { merge } from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import common from "#build/webpack.common";
import { toCamelCase } from "#build/utils";
import { pkgName } from "#build/constants";

const config: webpack.Configuration = merge(common, {
  mode: "none",
  output: {
    // @ts-ignore
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

export default config;
