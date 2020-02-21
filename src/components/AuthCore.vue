<template>
  <fragment>
    <auth-login v-if="activeState === 'auth-login'"></auth-login>
    <auth-login-existing-account v-if="activeState === 'auth-login-existing-account'"></auth-login-existing-account>
    <auth-signup v-if="activeState === 'auth-signup'"></auth-signup>
    <auth-forgot-password v-if="activeState === 'auth-forgot-password'"></auth-forgot-password>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
const AuthLogin = () => import('@/components/AuthLogin.vue');
const AuthLoginExistingAccount = () => import('@/components/AuthLoginExistingAccount.vue');
const AuthSignup = () => import('@/components/AuthSignup.vue');
const AuthForgotPassword = () => import('@/components/AuthForgotPassword.vue');

export default Vue.extend({
  name: 'auth-core',
  components: { AuthLogin, AuthSignup, AuthLoginExistingAccount, AuthForgotPassword },
  computed: {
    activeState() {
      return (this as any).$store.getters['auth/activeState'];
    }
  }
});
</script>
