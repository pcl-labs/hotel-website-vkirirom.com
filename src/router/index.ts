import Vue from 'vue'
import VueRouter from 'vue-router'

const HomePage = () => import('@/views/HomePage.vue')
const SearchPage = () => import('@/views/SearchPage.vue')
const ContactPage = () => import('@/views/ContactPage.vue')
const ListingPage = () => import('@/views/ListingPage.vue')
const BookingReviewRulesPage = () => import('@/views/BookingReviewRulesPage.vue')
const BookingCustomerInfoPage = () => import('@/views/BookingCustomerInfoPage.vue')
const BookingPaymentPage = () => import('@/views/BookingPaymentPage.vue')
const BookingThanksPage = () => import('@/views/BookingThanksPage.vue')
const KitchenSink = () => import('../views/KitchenSink.vue')

import store from '@/store'

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomePage
  },
  {
    path: '/search/:id',
    component: SearchPage,
    props: route => ({ slug: route.params.id })
  },
  {
    path: '/testing',
    component: KitchenSink
  },
  {
    name: 'listing',
    path: '/listing/:id',
    component: ListingPage,
    props: route => ({ slug: route.params.id })
  },
  {
    name: 'contact',
    path: '/contact',
    component: ContactPage
  },
  {
    name: 'booking-review-rules',
    path: '/booking/review-rules',
    component: BookingReviewRulesPage,
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-customer-info',
    path: '/booking/customer-info',
    component: BookingCustomerInfoPage,
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-payment',
    path: '/booking/payment',
    component: BookingPaymentPage,
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-thanks',
    path: '/booking/thanks',
    component: BookingThanksPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nature-city-investment-cambodia-property',
    redirect: '/listing/nature-city-investment-cambodia-property'
  },
  {
    path: '/kh',
    beforeEnter() {
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

// Auth guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    if (isAuthenticated) {
      next()
    } else {
      // if we have /login later, route to login page
      next('/')
    }
  } else {
    next()
  }
})

// set/unset loading
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
