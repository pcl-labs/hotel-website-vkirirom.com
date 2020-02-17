const webpack = require('webpack')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = {
  transpileDependencies: ['vuex-persist', 'vuetify', 'marked', 'vue-airbnb-style-datepicker', 'vue-head', 'portal-vue'],
  pwa: {
    name: require('./package.json').name,
    workboxOptions: {
      // skipWaiting: true
      // clientsClaim: true
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: '@import "src/styles/global-ghost.scss";'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new PreloadWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          APP_VERSION: '"' + escape(JSON.stringify(require('./package.json').version)) + '"',
          BUILD_DATE: new Date().getTime()
        }
      })
    ]
  },
  devServer: {
    disableHostCheck: true
  }
}
