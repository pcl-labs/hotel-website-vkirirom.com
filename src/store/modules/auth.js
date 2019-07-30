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
    loginError: '',
    registerError: ''
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
    },
    loginError: state => {
      return state.loginError
    },
    registerError: state => {
      return state.registerError
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
        Vue.http.get('https://stagingapi.whynot.earth/api/v0/authentication/ping').then(function(data){
          context.state.user = data.body;
          context.state.loading = false;
        })
        return context;
      }, response =>{
          if(response){
            context.state.loading = false;
            context.state.loginError = "Username or password is incorrect, please try again.";
          }
      });
    },
    register(context){
      context.state.loading=true,
      Vue.http.post('https://stagingapi.whynot.earth/api/v0/authentication/register', {
        email: context.state.email,
        password: context.state.password
      }).then(function(data){
        context.state.token = data.body;
        Vue.http.get('https://stagingapi.whynot.earth/api/v0/authentication/ping').then(function(data){
          context.state.user = data.body;
          context.state.loading = false;
        })
        return context;
      }, response =>{
          if(response){
            context.state.loading = false;
            context.state.registerError = response.body[0].description;
          }
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