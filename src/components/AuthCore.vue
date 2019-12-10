<template>
  <fragment>
    <auth-login v-if="activeState === 'auth-login'"></auth-login>
    <auth-login-existing-account
      v-if="activeState === 'auth-login-existing-account'"
    ></auth-login-existing-account>
    <auth-signup v-if="activeState === 'auth-signup'"></auth-signup>
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
  mounted() {
    this.setCurrentUrl()
  },
  computed: {
    activeState() {
      return store.getters['auth/activeState']
    },
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    setCurrentUrl() {
      this.$store.commit('auth/updateCurrentURL', window.location.href)
    }
  }
})
</script>
