import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

const routes = [
  // {
  //   path: '/testing',
  //   component: () => import(/* webpackChunkName: "Test" */ '@/views/KitchenSink.vue')
  // },
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/HomePage.vue')
  },
  {
    path: '/search/:id',
    component: () => import(/* webpackChunkName: "Search" */ '@/views/SearchPage.vue'),
    props: route => ({ slug: route.params.id })
  },
  {
    name: 'listing',
    path: '/listing/:id',
    component: () => import(/* webpackChunkName: "Listing" */ '@/views/ListingPage.vue'),
    props: route => ({ slug: route.params.id })
  },
  {
    name: 'contact',
    path: '/contact',
    component: () => import(/* webpackChunkName: "Contact" */ '@/views/ContactPage.vue')
  },
  {
    name: 'booking-review-rules',
    path: '/booking/review-rules',
    component: () => import(/* webpackChunkName: "Booking1" */ '@/views/BookingReviewRulesPage.vue'),
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-customer-info',
    path: '/booking/customer-info',
    component: () => import(/* webpackChunkName: "Booking2" */ '@/views/BookingCustomerInfoPage.vue'),
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-payment',
    path: '/booking/payment',
    component: () => import(/* webpackChunkName: "Booking3" */ '@/views/BookingPaymentPage.vue'),
    meta: {
      requiresAuth: true,
      hasBookingNavigation: true
    }
  },
  {
    name: 'booking-thanks',
    path: '/booking/thanks',
    component: () => import(/* webpackChunkName: "Booking4" */ '@/views/BookingThanksPage.vue'),
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
      window.location.href = 'http://kh.vkirirom.com';
    }
  },
  {
    path: '/*/',
    redirect: '/'
  }
];

Vue.use(VueRouter);

let unsubscribeStore: any = null;
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      const loading = store.getters['loading/isLoading'];
      if (loading) {
        unsubscribeStore = store.subscribe((mutation, state) => {
          if (mutation.type === 'loading/loading' && store.getters['loading/isLoading'] === false) {
            resolve(savedPosition || { x: 0, y: 0 });
            unsubscribeStore();
          }
        });
      } else {
        resolve(savedPosition || { x: 0, y: 0 });
      }
    });
  }
});

// Auth guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    if (isAuthenticated) {
      next();
    } else {
      // if we have /login later, route to login page
      next('/');
    }
  } else {
    next();
  }
});

// set/unset loading
router.beforeResolve((to, from, next) => {
  store.commit('loading/loading', true);
  next();
});

router.afterEach((to, from) => {
  const alwaysShowLoadingAtFirst = 700;
  setTimeout(() => {
    store.commit('loading/loading', false);
  }, alwaysShowLoadingAtFirst);
});

export default router;
