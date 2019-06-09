import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import searchpage from '@/components/searchpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/searchpage',
      name: 'searchpage',
      component: searchpage
    }
  ]
})
