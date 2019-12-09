<template>
  <fragment>
    <auth-login
      v-if="authState === 'login'"
      @auth-forgot-password="
        changeAuthState('forgot-password', { title: 'Reset Password' })
      "
      @auth-signup="changeAuthState('signup', { title: 'Sign Up' })"
    ></auth-login>
    <auth-login-existing-account
      v-if="authState === 'login-existing-account'"
      @auth-forgot-password="
        changeAuthState('forgot-password', { title: 'Reset Password' })
      "
      @auth-login="changeAuthState('login', { title: 'Log In' })"
    ></auth-login-existing-account>
    <auth-signup
      v-if="authState === 'signup'"
      @auth-login="changeAuthState('login', { title: 'Log In' })"
      @auth-login-existing-account="
        changeAuthState('login-existing-account', { title: '' })
      "
    ></auth-signup>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import AuthLogin from '@/components/AuthLogin.vue'
import AuthLoginExistingAccount from '@/components/AuthLoginExistingAccount.vue'
import AuthSignup from '@/components/AuthSignup.vue'

export default Vue.extend({
  name: 'auth-core',
  components: { AuthLogin, AuthSignup, AuthLoginExistingAccount },
  data() {
    return {
      authState: 'login'
    }
  },
  computed: {
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    }
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal === true) {
        this.$emit('authenticate')
        this.$emit('message', { title: 'Welcome!' })
      }
      console.log('isAuthenticated newVal:', newVal)
    }
  },
  methods: {
    changeAuthState(newState, data) {
      this.authState = newState
      this.$emit('change-auth-state', data)
    }
  }
})
</script>
