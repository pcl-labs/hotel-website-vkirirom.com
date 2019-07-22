import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth.js"

Vue.use(Vuex);

// const vuexPersist = new VuexPersist({
//   storage: window.localStorage
// });

export const store = new Vuex.Store({
  modules: {
    auth
  }
});