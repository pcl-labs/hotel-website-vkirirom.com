import Vue from "vue"

export default {
  namespaced: true,
  state:{
    email: '',
    password: '',
    token: '',
    status: '',
    user: {}
  },
  getters:{
    email: state => {
      return state.email
    },
    password: state => {
      return state.password
    },
    isAuthenticated: state => {
      return state.user.isAuthenticated
    }
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
        context.state.token = data.body;
        return context;
      }).then(function(context) {
        Vue.http.get('https://stagingapi.whynot.earth/api/v0/authentication/ping',{
        }).then(function(data){
          context.state.user = data.body;
          console.log(context.state.user);
        })
      });
    },
    register(context){
      Vue.http.post('https://stagingapi.whynot.earth/api/v0/authentication/register', {
        email: context.state.email,
        password: context.state.password
      }).then(function(data){
          context.state.token = data.body;
      });
    },
    // ping(context){
    //   Vue.http.get('https://stagingapi.whynot.earth/api/v0/authentication/ping',{
    //     Authorisation: "Bearer" + "context.state.token"
    //   }).then(function(data){
    //     context.state.user = data.body;
    //   })
    // }
  },
}