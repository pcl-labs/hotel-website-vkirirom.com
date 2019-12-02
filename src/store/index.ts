import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import reservation from './modules/reservation'
// import booking from './modules/booking'
import layout from './modules/layout'
import resort from './modules/resort'
import loading from './modules/loading'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['reservation', 'resort'],
  key: 'store'
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    loading,
    auth,
    resort,
    // TODO: remove
    reservation,
    // booking,
    layout
  }
})
