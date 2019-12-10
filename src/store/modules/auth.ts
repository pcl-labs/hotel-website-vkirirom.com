// @ts-ignore
import { AuthenticationService } from '@/connection/resources.js'
import { APIPath } from '@/helpers'
import Vue from 'vue'
import store from '@/store'
import { setDocumentClassesOnToggleDialog } from '@/helpers'

const defaultUser = {
  id: 0,
  isAuthenticated: false,
  userName: ''
}

const authStates = {
  'auth-login': { title: 'Log In' },
  'auth-forgot-password': { title: 'Reset Password' },
  'auth-signup': { title: 'Sign Up' },
  'auth-login-existing-account': { title: '' }
}

const defaultState = {
  email: '',
  password: '',
  token: '',
  status: '',
  user: defaultUser,
  loading: false,
  loginError: '',
  registerError: '',
  provider: '',
  currentURL: '',
  activeState: 'auth-login',
  dialog: {
    title: 'Log In',
    isOpen: false
  },
  snackbar: {
    timeout: 3000,
    type: 'success',
    isOpen: false,
    message: ''
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    dialog: state => {
      return state.dialog
    },
    snackbar: state => {
      return state.snackbar
    },
    activeState: state => {
      return state.activeState
    },
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
    },
    oauth(state) {
      return APIPath(
        `/api/v0/authentication/provider/login?provider=${state.provider}&returnUrl=${state.currentURL}`
      )
    }
  },
  mutations: {
    updateDialog(state, payload) {
      state.dialog = payload
    },
    updateEmail(state, payload) {
      state.email = payload
    },
    updatePassword(state, payload) {
      state.password = payload
    },
    updateProvider(state, payload) {
      state.provider = payload
    },
    updateLoading(state, payload) {
      state.loading = payload
    },
    updateUser(state, payload) {
      Vue.set(state, 'user', payload)
    },
    updateCurrentURL(state, payload) {
      state.currentURL = payload
    },
    updateActiveState(state, payload) {
      state.activeState = payload
    },
    updateSnackbar(state, payload) {
      state.snackbar = payload
    }
  },
  actions: {
    updateDialog(context, payload) {
      const dialog = {
        ...context.state.dialog,
        ...payload
      }

      setDocumentClassesOnToggleDialog(dialog.isOpen)
      context.commit('updateDialog', dialog)
    },
    updateSnackbar(context, payload) {
      const snackbar = {
        ...context.state.snackbar,
        ...payload
      }
      context.commit('updateSnackbar', snackbar)
    },
    updateActiveState(context, payload) {
      context.commit('updateActiveState', payload)

      context.commit('updateDialog', {
        ...context.state.dialog,
        title: authStates[payload].title
      })
    },
    login(context) {
      context.commit('updateLoading', true)
      AuthenticationService.login({
        model: {
          email: context.state.email,
          password: context.state.password
        }
      })
        .then(token => {
          // TODO: update token by commit
          context.state.token = token
          store.dispatch('auth/updateSnackbar', {
            isOpen: true,
            type: 'success',
            timeout: 5000,
            message: 'Welcome!'
          })
          store.dispatch('auth/ping')
        })
        .catch(error => {
          const response = error.response && error.response.data
          context.commit('updateLoading', false)
          if (response) {
            context.state.loginError =
              'Username or password is incorrect, please try again.'
          }
        })
    },
    register(context) {
      context.commit('updateLoading', true)
      AuthenticationService.register({
        model: {
          email: context.state.email,
          password: context.state.password
        }
      })
        .then(token => {
          context.state.token = token
          store.dispatch('auth/ping')
        })
        .catch(error => {
          const response = error.response && error.response.data
          context.commit('updateLoading', false)
          if (response) {
            context.state.registerError = response[0].description
          }
        })
    },
    logout(context) {
      context.commit('updateLoading', true)
      AuthenticationService.logout().then(() => {
        context.commit('updateLoading', false)
        context.commit('updateUser', defaultUser)
      })
    },
    ping(context) {
      AuthenticationService.ping({
        headers: {
          Authorization: `Bearer ${context.state.token}`
        }
      })
        .then(user => {
          context.commit('updateUser', user)
        })
        .catch(() => {
          console.log("Can't authenticate")
        })
        .finally(() => {
          context.commit('updateLoading', false)
        })
    }
  }
}
