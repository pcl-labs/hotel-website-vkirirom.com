import Home from './components/Home.vue';
import searchpage from './components/searchpage.vue';
import Listing from './components/Listing.vue';
import thankYou from './components/thankYou.vue';


export default[
  {
    path:'/',
    component: Home
  },
  {
    path:'/search',
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
]