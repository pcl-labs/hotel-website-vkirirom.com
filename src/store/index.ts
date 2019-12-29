import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import booking from './modules/booking'
import payment from './modules/payment'
import layout from './modules/layout'
import resort from './modules/resort'
import loading from './modules/loading'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['reservation', 'booking', 'resort'],
  key: 'store'
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    loading,
    auth,
    resort,
    booking,
    payment,
    layout
  }
})
