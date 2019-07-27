// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueResource from 'vue-resource'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import VueHead from 'vue-head'
import VueMarkdown from 'vue-markdown'
import {store} from './store/store'
import './registerServiceWorker'
import '@/mixins.global.js'

// import './sitemapMiddleware'
// import VueRouterSitemap from 'vue-router-sitemap'

Vue.use(Vuetify,{
  iconfont: 'md',
})

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueHead)
Vue.use(VueMarkdown)

// Vue.use(VueRouterSitemap)
Vue.use(AirbnbStyleDatepicker, {
  sundayFirst: true,
  dateLabelFormat: 'dddd, MMMM D, YYYY',
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  
});

// function getRoutesList(routes, pre) {
//   return routes.reduce((array, route) => {
//     const path = `${pre}${route.path}`;

//     if (route.path !== '*') {
//       array.push(path);
//     }

//     if (route.children) {
//       array.push(...getRoutesList(route.children, `${path}/`));
//     }

//     return array;
//   }, []);
// }

// getRoutesList(router.options.routes, 'https://cranky-nightingale-3731fc.netlify.com');

// function getRoutesXML() {
//   const list = getRoutesList(router.options.routes, 'https://cranky-nightingale-3731fc.netlify.com')
//     .map(route => `<url><loc>${route}</loc></url>`)
//     .join('\r\n');
//   return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//     ${list}
//   </urlset>`;
// }

// getRoutesXML();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
