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

Vue.use(Vuetify)
Vue.use(Slick)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
  
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
