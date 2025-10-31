import webpack from "webpack";
import WebpackBar from "webpackbar";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { joinPath } from "nsuite";
import { PATH_SRC, PATH_DIST, pkgName, pkgVersion, buildDate, FRONTEND_DOMAIN, BACKEND_DOMAIN } from "#build/constants";

const config: webpack.Configuration = {
  // 定义了入口文件路径
  entry: {
    index: joinPath(PATH_SRC, "./index.mts"),
  },
  // 定义了编译打包之后的文件名以及所在路径。还有打包的模块类型
  output: {
    clean: true,
    // 打包后的产物名
    filename: `${pkgName}.umd.js`,
    // 在全局变量中增加一个全局变量用于访问SDK，如 window.TypescriptSdkStarter
    library: {
      // 打包成umd模块
      type: "umd",
      // export这个属性需要设置，否则导出后，外层会包有一层default
      export: "default",
    },
    // 路径
    path: PATH_DIST,
    globalObject: "this",
  },
  resolve: {
    alias: {
      "@": PATH_SRC,
    },
    extensions: [".mts", ".ts", ".tsx", ".js"],
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
        test: /\.(?:js|mjs|cjs)$/,
        exclude: (modulePath) => {
          if (/node_modules/.test(modulePath)) {
            // axios需要用babel转码
            return !/node_modules[/\\]axios/.test(modulePath);
          }
          return false;
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.(mts)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env"]],
            },
          },
          {
            loader: "ts-loader",
            options: {
              // ts-loader 配置
              compilerOptions: {
                // TypeScript 编译选项
                target: "esnext",
                module: "nodenext",
                moduleResolution: "nodenext",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
