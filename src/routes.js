import Home from './components/Home.vue'
import searchpage from './components/searchpage.vue'
import Listing from './components/Listing.vue'
import Experience from './components/Experience.vue'
import thankYou from './components/thankYou.vue'
import Contact from './components/Contact.vue'

export default[
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
    path:'/experience/:id',
    component: Experience
  },
  {
    path: '/nature-city-investment-cambodia-property',
    redirect: '/listing/nature-city-investment-cambodia-property'
  },
]

