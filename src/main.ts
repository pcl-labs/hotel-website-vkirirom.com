// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'
// @ts-ignore
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import '@/connection/init'
import VueHead from 'vue-head'
// @ts-ignore
import VueMarkdown from 'vue-markdown'
import './registerServiceWorker'
import '@/mixins.global'
import router from './router'
import store from './store'

// import './sitemapMiddleware'
// import VueRouterSitemap from 'vue-router-sitemap'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.use(VueHead)
Vue.use(VueMarkdown)

// Vue.use(VueRouterSitemap)
Vue.use(AirbnbStyleDatepicker, {
  sundayFirst: true,
  dateLabelFormat: 'dddd, MMMM D, YYYY',
  days: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ],
  daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  colors: {
    selected: '#4B7F52',
    inRange: '#9bdba4',
    selectedText: '#fff',
    text: '#565a5c',
    inRangeBorder: '#4B7F52',
    disabled: '#fff',
    hoveredInRange: '#9bdba4',
    keyboardShortcuts: '#4B7F52'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
