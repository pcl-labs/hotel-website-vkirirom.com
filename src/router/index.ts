import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import ('../components/Home.vue')
const searchpage = () => import ('../components/searchpage.vue')
const Listing = () => import ('../components/Listing.vue')
const thankYou = () => import ('../components/thankYou.vue')
const Contact = () => import ('../components/Contact.vue')
const Reservation = () => import ('../components/Reservation/Reservation.vue')
const ReviewRules = () => import ('../components/Reservation/ReviewRules.vue')
const ConfirmAndPay = () => import ('../components/Reservation/ConfirmAndPay.vue')
const Guest = () => import ('../components/Guest.vue')

const routes = [
  {
    path:'/',
    component: Home
  },
  {
    path:'/search/:id',
    component: searchpage
  },
  {
    path:'/listing/:id',
    component: Listing
  },
  {
    path:'/thanks',
    component: thankYou
  },
  {
    path:'/contact',
    component: Contact
  },
  {
    path:'/reservation',
    component: Reservation,
    children:[
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
        window.location = "http://kh.vkirirom.com"
    }
  },
  {
    path: '/*/',
    redirect: '/'
  },
]

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default router;
