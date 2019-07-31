import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth.js"
import reservation from "./modules/reservation.js"
import resort from "./modules/resort.js"
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.sessionStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

export const store = new Vuex.Store({
  namespaced: true,
  modules: {
    auth,
    resort,
    reservation
  },
  plugins: [vuexLocalStorage.plugin]
});

export default store;