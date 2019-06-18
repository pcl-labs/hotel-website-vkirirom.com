// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import Vuetify from 'vuetify'
import Slick from 'vue-slick'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueResource from 'vue-resource';
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker';
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css';
import VueGtm from 'vue-gtm';
import './sitemapMiddleware'
import VueRouterSitemap from 'vue-router-sitemap'

Vue.use(Vuetify)
Vue.use(Slick)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueRouterSitemap)
Vue.use(AirbnbStyleDatepicker, {
  sundayFirst: false,
  dateLabelFormat: 'dddd, MMMM D, YYYY',
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
    'December',
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
  },
});

Vue.use(VueGtm, {
  id: 'GTM-PMXGLXR', // Your GTM ID
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  ignoredViews: ['homepage'] // If router, you can exclude some routes name (case insensitive) (optional)
});

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
