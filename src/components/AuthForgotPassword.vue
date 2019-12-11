<template>
  <v-form name="ForgotPassword" v-model="valid">
    <v-container fluid>
      <v-row no-gutters>
        <v-flex xs12>
          <p class="light--text">
            Enter the email address associated with your account, and we'll
            email you a link to reset your password.
          </p>
        </v-flex>

        <v-flex xs12 v-if="forgotPasswordError">
          <p class="error--text">{{ forgotPasswordError }}</p>
        </v-flex>

        <v-flex xs12>
          <v-text-field
            class="mb-1 mt-2"
            v-model="email"
            outlined
            label="E-mail address"
            name="E-mail"
            type="email"
            color="light"
            dark
            required
            validate-on-blur
            :rules="rules.email"
          >
            <v-icon slot="append">$vuetify.icons.message</v-icon>
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-btn
            x-large
            block
            color="primary"
            class="py-3 text-transform-none mb-8 dark--text"
            dark
            @click="sendResetPasswordLink"
            :disabled="!valid"
            :loading="loading"
          >
            <v-spacer></v-spacer>
            <span>Send Reset Link</span>
            <v-spacer></v-spacer>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12>
          <v-divider class="light-border"></v-divider>
        </v-flex>
        <v-flex xs12 class="text-center light--text mt-4 body-2">
          <p class="mb-0">
            <a @click="updateActiveState('auth-login')">Back to Login</a>
          </p>
        </v-flex>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import SeparatorOr from '@/components/SeparatorOr.vue'
import store from '@/store'

export default {
  name: 'auth-signup',
  components: { SeparatorOr },
  data() {
    return {
      valid: false,
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
        ]
      }
    }
  },
  methods: {
    updateActiveState(value) {
      store.dispatch('auth/updateActiveState', value)
    },
    sendResetPasswordLink() {
      store.dispatch('auth/sendResetPasswordLink')
    }
  },
  computed: {
    email: {
      get() {
        return store.getters['auth/email']
      },
      set(value) {
        store.commit('auth/updateEmail', value)
      }
    },
    loading() {
      return store.getters['auth/loading']
    },
    forgotPasswordError() {
      return store.getters['auth/forgotPasswordError']
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/utility.scss';
</style>
