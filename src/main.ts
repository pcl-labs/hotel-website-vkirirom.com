import Vue from 'vue'
import App from './App.vue'
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
import { light } from './constants/themes'
import store from './store'
import Vuetify from 'vuetify/lib'
import IconFacebook from './components/IconFacebook.vue'
import IconGoogle from './components/IconGoogle.vue'
import IconMessage from './components/IconMessage.vue'
import IconMessageDark from './components/IconMessageDark.vue'
import IconLock from './components/IconLock.vue'
import Fragment from 'vue-fragment'

Vue.use(Fragment.Plugin)
Vue.use(Vuetify)
Vue.use(VueHead)
Vue.use(VueMarkdown)

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
    selectedText: '#fff',
    text: '#828282',
    inRange: '#77C381',
    inRangeBorder: '#4f4f4f',
    keyboardShortcuts: '#4B7F52'
  }
})

Vue.config.productionTip = false

new Vue({
  // @ts-ignore
  vuetify: new Vuetify({
    icons: {
      iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
      values: {
        facebook: {
          component: IconFacebook,
          props: {}
        },
        google: {
          component: IconGoogle
        },
        message: {
          component: IconMessage
        },
        messageDark: {
          component: IconMessageDark
        },
        lock: {
          component: IconLock
        },
      }
    },
    theme: {
      dark: false,
      themes: {
        light
      }
    }
  }),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
