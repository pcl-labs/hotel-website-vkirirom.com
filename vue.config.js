const webpack = require('webpack');

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
  chainWebpack(config) {
    const preloadPatterns = [/(app|vendor|Home|Critical|Card|Footer)(.)+?\.(css|js)$/];
    const blacklistPatterns = [/(Test)(.)+?\.(css|js)$/];

    if (config.plugins.has('preload')) {
      config.plugin('preload').tap(options => {
        options[0].include = 'all';
        options[0].fileWhitelist = [...preloadPatterns];
        options[0].fileBlacklist = [...blacklistPatterns];
        // console.log('options preload =========================>', options);
        return options;
      });
    }

    if (config.plugins.has('prefetch')) {
      const prefetchBlacklist = [/(Contact)(.)+?\.(css|js)$/];
      config.plugin('prefetch').tap(options => {
        options[0].fileBlacklist = [
          /\.map$/,
          /hot-update\.js$/,
          ...preloadPatterns,
          ...blacklistPatterns,
          ...prefetchBlacklist
        ];
        // console.log('options prefetch ------------------------>', options);
        return options;
      });
    }
  },
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
};
