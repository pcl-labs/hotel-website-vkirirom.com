module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuex-persist'],
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "src/styles/global-ghost.scss";'
      }
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  }
}
