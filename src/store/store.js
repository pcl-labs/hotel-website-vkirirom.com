import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth.js"
import reservation from "./modules/reservation.js"
import resort from "./modules/resort.js"

Vue.use(Vuex);

export const store = new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    resort,
    reservation
  }
});

export default store;