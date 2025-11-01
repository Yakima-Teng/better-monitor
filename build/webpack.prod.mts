import webpack from "webpack";
import { rmSync } from "node:fs";
import { merge } from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import common from "#build/webpack.common";
import { toCamelCase } from "#build/utils";
import { PATH_DIST, pkgName, pkgVersion, buildDate, buildYear } from "#build/constants";

rmSync(PATH_DIST, { recursive: true, force: true });

const bannerPlugin = new webpack.BannerPlugin({
  banner: [
    `Copyright (c) ${buildYear} ${pkgName}. All rights reserved.`,
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

const configs: webpack.Configuration[] = [
  // 默认为UMD版本
  merge(common, {
    mode: "production",
    output: {
      clean: false,
      // @ts-ignore
      library: {
        name: toCamelCase(pkgName),
      },
    },
    optimization,
    plugins: [bannerPlugin],
  }),
  // .min.js其实也是UMD版本
  merge(common, {
    mode: "production",
    output: {
      clean: false,
      // 打包后的产物名
      filename: `${pkgName}.min.js`,
      // @ts-ignore
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

export default configs;
