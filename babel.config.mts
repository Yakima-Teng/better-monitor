module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript'
      ]
    },
    build: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            loose: true
          }
        ]
      ]
    }
  }
}
