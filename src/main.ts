import Vue from 'vue'
import App from './App.vue'
import '@/connection/init'
import VueHead from 'vue-head'
// @ts-ignore
import VueMarkdown from 'vue-markdown'
import './registerServiceWorker'
import '@/mixins.global'
import router from './router'
import store from './store'
import Fragment from 'vue-fragment'
import './plugins/datepicker'
import vuetify from './plugins/vuetify'

Vue.use(Fragment.Plugin)
Vue.use(VueHead)
Vue.use(VueMarkdown)

Vue.config.productionTip = false

new Vue({
  // @ts-ignore
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
