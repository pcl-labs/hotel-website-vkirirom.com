<template>
  <v-card tile :elevation="0" class="dark">
    <v-toolbar class="px-2" flat dark color="dark">
      <v-btn
        class="ma-0"
        small
        icon
        dark
        depressed
        @click="$emit('booking-close')"
      >
        <v-icon color="gray-82">close</v-icon>
      </v-btn>
      <v-toolbar-title class="light--text pl-0 ml-n4 text-center display-1">{{
        title
      }}</v-toolbar-title>
    </v-toolbar>

    <div class="d-flex flex-column">
      <div class="light--text mx-auto">
        <v-card color="dark px-2 pb-4" tile :ripple="false">
          <auth-login
            v-if="authState === 'login'"
            @auth-forgot-password="
              changeAuthState('forgot-password', { title: 'Reset Password' })
            "
            @auth-signup="changeAuthState('signup', { title: 'Sign Up' })"
          ></auth-login>
          <auth-signup
            v-if="authState === 'signup'"
            @auth-login="changeAuthState('login', { title: 'Log In' })"
          ></auth-signup>
        </v-card>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import AuthLogin from '@/components/AuthLogin.vue'
import AuthSignup from '@/components/AuthSignup.vue'

export default Vue.extend({
  name: 'booking-auth',
  components: { AuthLogin, AuthSignup },
  props: {
    nextStep: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // FIXME: set login
      authState: 'signup',
      // FIXME: set Log In
      title: 'Sign Up'
    }
  },
  computed: {
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    }
  },
  watch: {
    isAuthenticated(newVal) {
      console.log('isAuthenticated newVal', newVal);
      
    }
  },
  methods: {
    changeAuthState(newState, { title }) {
      this.authState = newState
      this.title = title
    },
    submit() {
      store.dispatch('booking/updateCurrentStep', this.nextStep)
    }
  }
})
</script>

<style lang="scss" scoped>
//
</style>
