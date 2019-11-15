import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../components/Home.vue')
const searchpage = () => import('../components/searchpage.vue')
const Listing = () => import('../components/Listing.vue')
const thankYou = () => import('../components/thankYou.vue')
const Contact = () => import('../components/Contact.vue')
const Reservation = () => import('../components/Reservation/Reservation.vue')
const ReviewRules = () => import('../components/Reservation/ReviewRules.vue')
const ConfirmAndPay = () =>
  import('../components/Reservation/ConfirmAndPay.vue')
const Guest = () => import('../components/Guest.vue')

import store from '@/store'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/search/:id',
    component: searchpage
  },
  {
    path: '/listing/:id',
    component: Listing
  },
  {
    path: '/thanks',
    component: thankYou
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/reservation',
    component: Reservation,
    children: [
      {
        path: 'reviewrules',
        component: ReviewRules
      },
      {
        path: 'confirmandpay',
        component: ConfirmAndPay
      }
    ]
  },
  {
    path: '/guest',
    component: Guest
  },
  {
    path: '/nature-city-investment-cambodia-property',
    redirect: '/listing/nature-city-investment-cambodia-property'
  },
  // {
  //   path: '/jp',
  //   beforeEnter(to, from, next) {
  //       // Put the full page url including the protocol http(s) below
  //       window.location = "http://jp.vkirirom.com"
  //   }
  // },
  {
    path: '/kh',
    beforeEnter() {
      // Put the full page url including the protocol http(s) below
      window.location.href = 'http://kh.vkirirom.com'
    }
  },
  {
    path: '/*/',
    redirect: '/'
  }
]

Vue.use(VueRouter)

let unsubscribeStore: any = null
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      const loading = store.getters['loading/isLoading']
      if (loading) {
        unsubscribeStore = store.subscribe((mutation, state) => {
          const loading = store.getters['loading/isLoading']
          if (mutation.type === 'loading/loading' && loading === false) {
            resolve(savedPosition || { x: 0, y: 0 })
            unsubscribeStore()
          }
        })
      } else {
        resolve(savedPosition || { x: 0, y: 0 })
      }
    })
  }
})

router.beforeResolve((to, from, next) => {
  store.commit('loading/loading', true)
  next()
})
router.afterEach((to, from) => {
  const alwaysShowLoadingAtFirst = 700
  setTimeout(() => {
    store.commit('loading/loading', false)
  }, alwaysShowLoadingAtFirst)
})

export default router
