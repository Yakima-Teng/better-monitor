const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { toCamelCase } = require("./utils.cjs");
const {
  resolve,
  PROJECT_PATH,
  pkgName,
  pkgVersion,
  buildDate,
  FRONTEND_DOMAIN,
  BACKEND_DOMAIN,
} = require("./constants.cjs");

module.exports = {
  // 定义了入口文件路径
  entry: {
    index: resolve(PROJECT_PATH, "./src/index.mts"),
  },
  // 定义了编译打包之后的文件名以及所在路径。还有打包的模块类型
  output: {
    clean: true,
    // 打包后的产物名
    filename: `${pkgName}.js`,
    // 在全局变量中增加一个全局变量用于访问SDK，如 window.TypescriptSdkStarter
    library: toCamelCase(pkgName),
    // 打包成umd模块
    libraryTarget: "umd",
    // libraryExport这个属性需要设置，否则导出后，外层会包有一层default
    libraryExport: "default",
    // 路径
    path: resolve(PROJECT_PATH, "./dist"),
    globalObject: "this",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
      "@docs": resolve(__dirname, "../docs"),
      "@public": resolve(__dirname, "../public"),
      "@test": resolve(__dirname, "../test"),
    },
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new WebpackBar({
      name: "正在卖力打包中~",
      color: "#fa8c16",
    }),
    new webpack.DefinePlugin({
      "process.env.MODE": JSON.stringify(process.env.MODE),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BUILD_DATE": JSON.stringify(buildDate),
      "process.env.BUILD_VERSION": JSON.stringify(pkgVersion),
      "process.env.FRONTEND_DOMAIN": JSON.stringify(FRONTEND_DOMAIN),
      "process.env.BACKEND_DOMAIN": JSON.stringify(BACKEND_DOMAIN),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(mts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
