module.exports = {
  transpileDependencies: ['vuex-persist'],
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  }
}