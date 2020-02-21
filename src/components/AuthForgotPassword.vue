<template>
  <v-form
    name="ForgotPassword"
    v-model="isFormValid"
    @submit.prevent=""
    class="d-flex flex-column flex-grow-1 justify-space-between"
  >
    <v-container fluid class="pa-0 d-flex flex-column flex-grow-1 justify-space-between">
      <v-row no-gutters class="flex-grow-0">
        <v-col cols="12">
          <p class="light--text">
            Enter the email address associated with your account, and we'll email you a link to reset your password.
          </p>
          <!-- remove -->
          <p class="error--text">Comming soon</p>
        </v-col>

        <v-col cols="12">
          <!-- enable -->
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
            disabled
            :rules="rules.email"
          >
            <v-icon slot="append">$vuetify.icons.message</v-icon>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="flex-grow-0">
        <v-col cols="12" v-if="forgotPasswordError">
          <p class="error--text">{{ forgotPasswordError }}</p>
        </v-col>
        <v-col cols="12">
          <!-- enable -->
          <v-btn
            x-large
            block
            color="primary"
            class="py-3 text-transform-none mb-8 dark--text"
            dark
            @click="submit"
            type="submit"
            :disabled="true || !isFormValid"
            :loading="loading"
          >
            <v-spacer></v-spacer>
            <span>Send Reset Link</span>
            <v-spacer></v-spacer>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-divider class="light-border"></v-divider>
        </v-col>
        <v-col cols="12" class="text-center light--text mt-4 body-2">
          <p class="mb-0">
            <a @click="updateActiveState('auth-login')">Back to Login</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import store from '@/store';

export default {
  name: 'auth-signup',
  data() {
    return {
      isFormValid: false,
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
        ]
      }
    };
  },
  methods: {
    updateActiveState(value) {
      (this as any).$store.dispatch('auth/updateActiveState', value);
    },
    submit() {
      (this as any).$store.dispatch('auth/sendResetPasswordLink');
    }
  },
  computed: {
    email: {
      get() {
        return (this as any).$store.getters['auth/email'];
      },
      set(value) {
        (this as any).$store.commit('auth/updateEmail', value);
      }
    },
    loading() {
      return (this as any).$store.getters['auth/loading'];
    },
    forgotPasswordError() {
      return (this as any).$store.getters['auth/forgotPasswordError'];
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
