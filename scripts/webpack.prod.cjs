const webpack = require("webpack");
const fs = require("fs");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.cjs");
const { resolve, PROJECT_PATH, pkgName, pkgVersion, buildDate } = require("./constants.cjs");
const { toCamelCase } = require("./utils.cjs");

const pathDist = resolve(PROJECT_PATH, "./dist");
fs.rmSync(pathDist, { recursive: true, force: true });

const year = new Date().getFullYear();

const bannerPlugin = new webpack.BannerPlugin({
  banner: [
    `Copyright (c) ${year} ${pkgName}. All rights reserved.`,
    `Version: ${pkgVersion}`,
    `Build: ${buildDate}`,
  ].join("\n"),
  raw: false,
  entryOnly: true,
});

const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      // 不将注释提取到单独的文件中
      extractComments: false,
    }),
  ],
};

module.exports = [
  // 默认为UMD版本
  merge(common, {
    mode: "production",
    output: {
      clean: false,
      library: {
        name: toCamelCase(pkgName),
      },
    },
    optimization,
    plugins: [bannerPlugin],
  }),
  // CommonJS版本
  merge(common, {
    output: {
      clean: false,
      // 打包后的产物名
      filename: `${pkgName}.cjs.js`,
      // 在全局变量中增加一个全局变量用于访问SDK，如 window.TypescriptSdkStarter
      library: {
        // This configuration generates tree-shakable output for ES Modules.
        type: "commonjs-static",
      },
    },
    experiments: {
      outputModule: true,
    },
    mode: "production",
    optimization,
    plugins: [bannerPlugin],
  }),
  // ESM版本
  merge(common, {
    output: {
      clean: false,
      // 打包后的产物名
      filename: `${pkgName}.esm.js`,
      // 在全局变量中增加一个全局变量用于访问SDK，如 window.TypescriptSdkStarter
      library: {
        // This configuration generates tree-shakable output for ES Modules.
        type: "modern-module",
      },
    },
    experiments: {
      outputModule: true,
    },
    mode: "production",
    optimization,
    plugins: [bannerPlugin],
  }),
];
