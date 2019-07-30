import Vue from "vue"

export default {
  namespaced: true,
  state:{
    email: '',
    password: '',
    token: '',
    status: '',
    user: {
      id: 0,
      isAuthenticated: false,
      userName: ''
    },
    loading: false,
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
    },
    loading: state => {
      return state.loading
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
      context.state.loading=true,
      Vue.http.post('https://stagingapi.whynot.earth/api/v0/authentication/login', {
        email: context.state.email,
        password: context.state.password
      }).then(function(data){
        context.state.token = data.body;
        return context;
      }).then(function(context) {
        Vue.http.get('https://stagingapi.whynot.earth/api/v0/authentication/ping').then(function(data){
          context.state.user = data.body;
          context.state.loading = false;
          this.$router.push("/reservation/reviewrules")
          console.log(context.state.user);
        })
      });
    },
    register(context){
      context.state.loading=true,
      Vue.http.post('https://stagingapi.whynot.earth/api/v0/authentication/register', {
        email: context.state.email,
        password: context.state.password
      }).then(function(data){
          context.state.token = data.body;
          return context;
      }).then(function(context) {
        Vue.http.get('https://stagingapi.whynot.earth/api/v0/authentication/ping').then(function(data){
          context.state.user = data.body;
          context.state.loading = false,
          console.log(context.state.user);
        })
      });
    },
    logout(context){
      context.state.loading = true,
      Vue.http.post('https://stagingapi.whynot.earth/api/v0/authentication/logout').then(function(){
        context.state.loading = false,
        context.state.user.isAuthenticated = false
      })
    }
    // ping(context){
    //   Vue.http.get('https://stagingapi.whynot.earth/api/v0/authentication/ping',{
    //     Authorisation: "Bearer" + "context.state.token"
    //   }).then(function(data){
    //     context.state.user = data.body;
    //   })
    // }
  },
}