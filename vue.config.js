const webpack = require('webpack')

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
  // chainWebpack: config => {
  //   // config.plugins.delete('prefetch')

  //   const preloadPatterns = [/Home(.)+?\.css$/, /Critical(.)+?\.css$/, /Card(.)+?\.css$/, /Footer(.)+?\.css$/]

  //   // Adding a file to preload blacklist
  //   config.plugin('preload').tap(options => {
  //     console.log('=>>>>>>>>>>', options)

  //     options[0].include = preloadPatterns
  //     console.log('after ===============>', options)

  //     return options
  //   })
  //   config.plugin('prefetch').tap(options => {
  //     // if (!options[0].fileBlacklist) options[0].fileBlacklist = []
  //     // options[0].fileBlacklist.concat(preloadPatterns)
  //     options[0].include = []
  //     return options
  //   })
  // },
  configureWebpack: {
    plugins: [
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
