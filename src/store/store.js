import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth.js"
import reservation from "./modules/reservation.js"
import resort from "./modules/resort.js"
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['reservation', 'resort'],
  key: 'store'
})

Vue.use(Vuex);

export const store = new Vuex.Store({
  namespaced: true,
  plugins: [vuexLocal.plugin],
  modules: {
    auth,
    resort,
    reservation
  }
});

export default store;
