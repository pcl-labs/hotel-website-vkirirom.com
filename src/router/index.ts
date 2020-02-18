import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/testing',
    component: loadView('KitchenSink')
  },
  {
    name: 'home',
    path: '/',
    component: loadView('HomePage')
  },
  {
    path: '/search/:id',
    component: loadView('SearchPage'),
    props: route => ({ slug: route.params.id })
  },
  {
    name: 'listing',
    path: '/listing/:id',
    component: loadView('ListingPage'),
    props: route => ({ slug: route.params.id })
  },
  {
    name: 'contact',
    path: '/contact',
    component: loadView('ContactPage')
  },
  {
    name: 'booking-review-rules',
    path: '/booking/review-rules',
    component: loadView('BookingReviewRulesPage'),
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-customer-info',
    path: '/booking/customer-info',
    component: loadView('BookingCustomerInfoPage'),
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-payment',
    path: '/booking/payment',
    component: loadView('BookingPaymentPage'),
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-thanks',
    path: '/booking/thanks',
    component: loadView('BookingThanksPage'),
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

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
