const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const pkg = require('../package.json')
const common = require('./webpack.common.cjs');

const year = new Date().getFullYear()

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 不将注释提取到单独的文件中
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: [
        `Copyright (c) ${year} ${pkg.name}. All rights reserved.`,
        `Version: ${pkg.version}`,
        `Build: ${new Date().toISOString()}`
      ].join('\n'),
      raw: false,
      entryOnly: true,
    }),
  ]
});
