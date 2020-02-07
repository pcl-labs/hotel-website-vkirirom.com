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
  forgotPasswordError: '',
  provider: '',
  returnURL: '',
  activeState: 'auth-login',
  dialog: {
    title: 'Log In',
    isOpen: false
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    dialog: state => {
      return state.dialog
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
    token: state => {
      return state.token
    },
    user: state => {
      return state.user
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
    forgotPasswordError: state => {
      return state.forgotPasswordError
    },
    oauth(state) {
      return APIPath(`/api/v0/authentication/provider/login?provider=${state.provider}&returnUrl=${state.returnURL}`)
    }
  },
  mutations: {
    updateDialog(state, payload) {
      state.dialog = payload
    },
    updateLoginError(state, payload) {
      state.loginError = payload
    },
    updateRegisterError(state, payload) {
      state.registerError = payload
    },
    updateForgotPasswordError(state, payload) {
      state.forgotPasswordError = payload
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
    updateToken(state, payload) {
      Vue.set(state, 'token', payload)
    },
    updateReturnUrl(state, payload) {
      console.log('payload returnUrl', payload)

      state.returnURL = payload
    },
    updateActiveState(state, payload) {
      state.activeState = payload
    },
    resetState(state) {
      for (const key in defaultState) {
        if (defaultState.hasOwnProperty(key)) {
          state[key] = defaultState[key]
        }
      }
    }
  },
  actions: {
    updateLoginError(context, payload) {
      context.commit('updateLoginError', payload)
    },
    updateReturnUrl(context, payload) {
      context.commit('updateReturnUrl', payload)
    },
    updateToken(context, payload) {
      context.commit('updateToken', payload)
    },
    updateUser(context, payload) {
      context.commit('updateUser', payload)
    },
    updateDialog(context, payload) {
      const dialog = {
        ...context.state.dialog,
        ...payload
      }

      setDocumentClassesOnToggleDialog(dialog.isOpen)
      context.commit('updateDialog', dialog)
    },
    updateActiveState(context, payload) {
      context.commit('updateActiveState', payload)
      context.commit('updateLoginError', '')
      context.commit('updateRegisterError', '')
      context.commit('updateForgotPasswordError', '')
      context.commit('updateDialog', {
        ...context.state.dialog,
        title: authStates[payload].title
      })
    },
    async loginStandard(context) {
      context.commit('updateLoginError', '')
      context.commit('updateLoading', true)
      try {
        const token = await AuthenticationService.login({
          model: {
            email: context.state.email,
            password: context.state.password
          }
        })
        await context.dispatch('updateToken', token)
        await store.dispatch('auth/ping')
        context.commit('updateLoading', false)
      } catch (error) {
        const message =
          (error.response && error.response.data) || 'Username or password is incorrect, please try again.'
        console.log('on catch loginStandard', error, error.response, message)
        context.commit('updateLoginError', message) // TODO: probably wrong
        context.commit('updateLoading', false)
        throw error
      }
    },
    register(context) {
      context.commit('updateLoading', true)
      context.commit('updateRegisterError', '')
      return new Promise((resolve, reject) => {
        AuthenticationService.register({
          model: {
            email: context.state.email,
            password: context.state.password
          }
        })
          .then(token => {
            context.state.token = token

            store
              .dispatch('auth/ping')
              .then(resolve)
              .catch(error => {
                console.log('Could not get user data after successful login')
                reject(error)
              })
              .finally(() => {
                context.commit('updateLoading', false)
              })
          })
          .catch(error => {
            reject(error)
            context.commit('updateLoading', false)

            const response = error.response && error.response.data
            if (response) {
              context.commit('updateRegisterError', response[0].description)
            } else {
              context.commit('updateRegisterError', 'Registration failed')
            }
            reject(error)
            context.commit('updateLoading', false)
          })
      })
    },
    sendResetPasswordLink(context) {
      // context.commit('updateLoading', true)
      // AuthenticationService.sendResetPasswordLink
      // TODO: send reset password link
    },
    logout(context) {
      context.commit('updateLoading', true)
      return AuthenticationService.logout().then(() => {
        context.commit('updateLoading', false)
        context.commit('resetState')
      })
    },
    async ping(context) {
      const token = context.getters.token
      if (!token) {
        console.log('no token available')
        return false
      }

      try {
        const user = await AuthenticationService.ping({ headers: { Authorization: `Bearer ${token}` } })
        await context.dispatch('updateUser', user)
      } catch (error) {
        console.log('wrong token on ping')
        alert('wrong token')
        return false
      }
      return true
    }
  }
}
