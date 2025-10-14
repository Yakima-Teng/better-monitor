import { defineConfig } from "rollup";
import { parseEnvFiles } from "nsuite";
import typescript from "@rollup/plugin-typescript";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";
import bundleSize from "rollup-plugin-bundle-size";
import license from "rollup-plugin-license";
import pkg from "./package.json" with { type: "json" };

const version = pkg.version;

const { NODE_ENV, MODE } = process.env;

parseEnvFiles(["../.env.local", `../.env.${MODE}`, "../.env"]);

const licenseConfig = {
  banner: [
    "Bundle of <%= pkg.name %>",
    "Generated: <%= moment().format('YYYY-MM-DD HH:mm:ss') %>",
    "Version: <%= pkg.version %>",
  ].join("\n"),
};

const config = defineConfig({
  input: "src/index.mts",
  output: [
    {
      file: "dist/better-monitor.min.js",
      format: "es",
      plugins: [
        getBabelOutputPlugin({
          presets: [["@babel/preset-env", { modules: "umd" }]],
        }),
        terser(),
        license(licenseConfig),
        bundleSize(),
      ],
    },
    {
      file: "dist/better-monitor.js",
      format: "es",
      plugins: [
        getBabelOutputPlugin({
          presets: [["@babel/preset-env", { modules: "umd" }]],
        }),
        license(licenseConfig),
        bundleSize(),
      ],
    },
    {
      file: "dist/better-monitor.common.js",
      format: "cjs",
      plugins: [license(licenseConfig), bundleSize()],
    },
    {
      file: "dist/better-monitor.esm.js",
      format: "es",
      plugins: [license(licenseConfig), bundleSize()],
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      "process.env.MODE": JSON.stringify(MODE),
      "process.env.BUILD_DATE": () => JSON.stringify(new Date()),
      "process.env.BUILD_VERSION": JSON.stringify(version),
    }),
    typescript(),
    json(),
    commonjs(),
    nodeResolve(),
  ],
});

export default config;
