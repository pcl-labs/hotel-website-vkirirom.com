import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    email: '',
    password: '',
  },
  getters:{

  },
  mutations:{
    updateEmail (state, email) {
      state.email = email
    },
    updatePassword (state, password) {
      state.password = password
    }
  },
  actions:{
    login(context){
      Vue.http.post('https://stagingapi.whynot.earth/api/v0/authentication/login', {
        email: context.state.email,
        password: context.state.password
      }).then(function(data){
          console.log(data);
      });
    }
  },

})