<template>
  <v-form
    name="Register"
    v-model="isFormValid"
    @submit.prevent=""
    class="d-flex flex-column flex-grow-1 justify-space-between"
  >
    <v-row no-gutters class="flex-grow-0">
      <v-col cols="12">
        <p class="text-center light--text mb-6 body-2">
          Sign up with <a @click="oauth('Facebook')">Facebook</a> or
          <a @click="oauth('Google')">Google</a>
        </p>
      </v-col>

      <separator-or></separator-or>

      <v-col cols="12">
        <v-text-field
          v-model="firstName"
          outlined
          label="First name"
          name="firstName"
          color="light"
          type="text"
          required
          :rules="rules.firstName"
          dark
        >
          <v-icon slot="append" color="light">account</v-icon>
        </v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="lastName"
          outlined
          label="Last name"
          name="lastName"
          color="light"
          type="text"
          dark
          required
          :rules="rules.lastName"
        >
          <v-icon slot="append" color="light">user</v-icon>
        </v-text-field>
      </v-col>

      <v-col cols="12">
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
          :rules="rules.email"
        >
          <v-icon slot="append">$vuetify.icons.message</v-icon>
        </v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="password"
          outlined
          label="Password"
          name="Password"
          color="light"
          :type="passwordIsVisible ? 'text' : 'password'"
          dark
          required
          :rules="rules.password"
        >
          <v-icon slot="append" color="light">lock</v-icon>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters class="flex-grow-0">
      <v-col cols="12" v-if="registerError">
        <p class="error--text">{{ registerError }}</p>
      </v-col>

      <v-col cols="12">
        <v-btn
          x-large
          block
          color="primary"
          class="py-3 text-transform-none mb-4 dark--text"
          dark
          @click="submit"
          type="submit"
          :disabled="!isFormValid"
          :loading="loading"
        >
          <v-spacer></v-spacer>
          <span>Sign Up Now</span>
          <v-spacer></v-spacer>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12" class="text-center mb-4 body-2">
        <p class="mb-0">
          <a @click="updateActiveState('auth-forgot-password')">Forgot password?</a>
        </p>
      </v-col>
      <v-col cols="12">
        <v-divider class="light-border"></v-divider>
      </v-col>
      <v-col cols="12" class="text-center light--text mt-4 body-2">
        <p class="mb-0">
          Already have an account?
          <a @click="updateActiveState('auth-login')">Log in</a>
        </p>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
const SeparatorOr = () => import('@/components/SeparatorOr.vue');
export default Vue.extend({
  components: { SeparatorOr },
  data() {
    return {
      isFormValid: false,
      firstName: '',
      lastName: '',
      passwordIsVisible: false,
      rules: {
        firstName: [v => !!v || 'First name is required'],
        lastName: [v => !!v || 'Last name is required'],
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
        ],
        password: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Must be atleast 8 characters long',
          v => /(?=.*[a-z])/.test(v) || 'Must have lowercase character(s)',
          v => /(?=.*[A-Z])/.test(v) || 'Must have uppercase character(s)',
          v => /(?=.*\d)/.test(v) || 'Must have number(s)',
          v => /(?=.*[^A-Za-z0-9])/.test(v) || 'Must have special character(s)'
        ]
      }
    };
  },
  methods: {
    updateActiveState(value) {
      (this as any).$store.dispatch('auth/updateActiveState', value);
    },
    async submit() {
      try {
        await (this as any).$store.dispatch('auth/register');
        (this as any).$store.dispatch('snackbar/show', {
          color: 'success',
          text: 'Signing up was successful',
          class: 'dark--text'
        });
      } catch (error) {
        console.log('Signup failed');
      }
    },
    oauth(provider) {
      (this as any).$store.commit('auth/updateProvider', provider);
      window.location.assign((this as any).$store.getters['auth/oauth']);
      (this as any).$store.dispatch('auth/ping');
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
    password: {
      get() {
        return (this as any).$store.getters['auth/password'];
      },
      set(value) {
        (this as any).$store.commit('auth/updatePassword', value);
      }
    },
    loading() {
      return (this as any).$store.getters['auth/loading'];
    },
    registerError() {
      return (this as any).$store.getters['auth/registerError'];
    }
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
