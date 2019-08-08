import { AuthenticationService } from "@/connection/resources.js";
import { APIPath } from "@/helpers.js";
import Vue from "vue";

const defaultUser = {
  id: 0,
  isAuthenticated: false,
  userName: ""
};

export default {
  namespaced: true,
  state: {
    email: "",
    password: "",
    token: "",
    status: "",
    user: defaultUser,
    loading: false,
    loginError: "",
    registerError: "",
    provider: "",
    currentURL: ""
  },
  getters: {
    email: state => {
      return state.email;
    },
    password: state => {
      return state.password;
    },
    isAuthenticated: state => {
      return state.user.isAuthenticated;
    },
    loading: state => {
      return state.loading;
    },
    loginError: state => {
      return state.loginError;
    },
    registerError: state => {
      return state.registerError;
    },
    oauth(state) {
      const returnUrl = encodeURIComponent(OAUTH_RETURN_URL);
      return APIPath(
        `/api/v0/authentication/provider/login?provider=${
          state.provider
        }&returnUrl=${state.currentURL}`
      );
    }
  },
  mutations: {
    updateEmail(state, email) {
      state.email = email;
    },
    updatePassword(state, password) {
      state.password = password;
    },
    updateProvider(state, provider) {
      state.provider = provider;
    },
    updateLoading(state, payload) {
      state.loading = payload;
    },
    updateUser(state, payload) {
      Vue.set(state, "user", payload);
    },
    updateCurrentURL(state, payload) {
      state.currentURL = payload
    }
  },
  actions: {
    login(context) {
      context.commit("updateLoading", true);
      AuthenticationService.login({
        model: {
          email: context.state.email,
          password: context.state.password
        }
      })
        .then(token => {
          context.state.token = token;
          this.dispatch("auth/ping");
        })
        .catch(error => {
          const response = error.response && error.response.data;
          context.commit("updateLoading", false);
          if (response) {
            context.state.loginError =
              "Username or password is incorrect, please try again.";
          }
        });
    },
    register(context) {
      context.commit("updateLoading", true);
      AuthenticationService.register({
        model: {
          email: context.state.email,
          password: context.state.password
        }
      })
        .then(token => {
          context.state.token = token;
          this.dispatch("auth/ping");
        })
        .catch(error => {
          const response = error.response && error.response.data;
          context.commit("updateLoading", false);
          if (response) {
            context.state.registerError = response[0].description;
          }
        });
    },
    logout(context) {
      context.commit("updateLoading", true);
      AuthenticationService.logout().then(() => {
        context.commit("updateLoading", false);
        context.commit("updateUser", defaultUser);
      });
    },
    ping(context) {
      AuthenticationService.ping({
        headers: {
          Authorization: `Bearer ${context.state.token}`
        }
      })
        .then(user => {
          context.commit("updateUser", user);
        })
        .catch(() => {
          console.log("Can't authenticate");
        })
        .finally(() => {
          context.commit("updateLoading", false);
        });
    }
  }
};
