import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth.js"
import reservation from "./modules/reservation.js"

Vue.use(Vuex);

// const vuexPersist = new VuexPersist({
//   storage: window.localStorage
// });

export const store = new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    reservation
  }
});

export default store;