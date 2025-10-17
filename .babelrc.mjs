/**
 * babel config
 * @param {import('@babel/core').ConfigAPI} api
 * @returns {import('@babel/core').TransformOptions}
 */
export default function (api) {
  api.cache.forever();

  /** @type {import('@babel/core').TransformOptions["presets"]} */
  const presets = [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },
        modules: false,
      },
    ],
    "@babel/preset-typescript",
  ];

  /** @type {import('@babel/core').TransformOptions["plugins"]} */
  const plugins = []

  return {
    presets,
    plugins,
    sourceType: "module",
    exclude: ["node_modules"],
  };
}
