<template>
  <v-form name="Register" v-model="valid" @submit.prevent="">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" class="mb-2">
          <!-- by oauth providers -->
          <v-row no-gutters v-if="formMode === 'by-oauth'">
            <v-col cols="12">
              <v-btn
                x-large
                block
                outlined
                dark
                class="mb-8 text-capitalize light--text py-3"
                @click="oauth('Facebook')"
                ><v-spacer></v-spacer
                ><v-icon class="mr-4">$vuetify.icons.facebook</v-icon
                ><span>Continue with Facebook</span><v-spacer></v-spacer>
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                x-large
                block
                outlined
                dark
                class="mb-8 text-capitalize light--text py-3"
                @click="oauth('Google')"
                ><v-spacer></v-spacer
                ><v-icon class="mr-4">$vuetify.icons.google</v-icon
                ><span>Continue with Google</span><v-spacer></v-spacer
                ><v-icon>keyboard_arrow_right</v-icon></v-btn
              >
            </v-col>
          </v-row>

          <!-- by email -->
          <div v-if="formMode === 'by-email'">
            <p class="text-center light--text mb-4 body-2">
              Sign up with <a @click="oauth('Facebook')">Facebook</a> or
              <a @click="oauth('Google')">Google</a>
            </p>
          </div>
        </v-col>

        <separator-or></separator-or>

        <v-flex xs12 v-if="registerError">
          <p class="error--text">{{ registerError }}</p>
        </v-flex>

        <!-- by oauth providers -->
        <v-flex xs12 v-if="formMode === 'by-oauth'">
          <v-btn
            x-large
            block
            color="primary"
            class="py-3 text-transform-none mb-4 dark--text"
            dark
            @click="formMode = 'by-email'"
            :disabled="!valid"
            :loading="loading"
          >
            <v-spacer></v-spacer>
            <v-icon class="mr-4">$vuetify.icons.messageDark</v-icon>
            <span>Sign up with Email</span>
            <v-spacer></v-spacer>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>

        <!-- by email -->
        <fragment v-if="formMode === 'by-email'">
          <v-flex xs12>
              <!-- TODO: change e-mail to first name -->
            <v-text-field
              v-model="firstName"
              outlined
              label="First name"
              name="E-mail"
              color="light"
              type="text"
              required
              :rules="rules.firstName"
              dark
            >
              <v-icon slot="append" color="light">account</v-icon>
            </v-text-field>
          </v-flex>

          <v-flex xs12>
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
              :rules="rules.email"
            >
              <v-icon slot="append">$vuetify.icons.message</v-icon>
            </v-text-field>
          </v-flex>

          <v-flex xs12>
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
          </v-flex>

          <v-flex xs12>
            <v-btn
              x-large
              block
              color="primary"
              class="py-3 text-transform-none mb-4 dark--text"
              dark
              @click="register"
              type="submit"
              :disabled="!valid"
              :loading="loading"
            >
              <v-spacer></v-spacer>
              <span>Sign Up Now</span>
              <v-spacer></v-spacer>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-flex>
        </fragment>

        <v-flex xs12 class="text-center mb-4 body-2">
          <p class="mb-0">
            <a @click="updateActiveState('auth-forgot-password')">Forgot password?</a>
          </p>
        </v-flex>
        <v-flex xs12>
          <v-divider class="light-border"></v-divider>
        </v-flex>
        <v-flex xs12 class="text-center light--text mt-4 body-2">
          <p class="mb-0">
            Already have an account?
            <a @click="updateActiveState('auth-login')">Log in</a>
          </p>
        </v-flex>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import SeparatorOr from '@/components/SeparatorOr.vue'
import store from '@/store'

// TODO: if register error happened and account exists, then $emit 'auth-login-existing-account'

export default {
  name: 'auth-signup',
  components: { SeparatorOr },
  data() {
    return {
      firstName: '',
      lastName: '',
      formMode: 'by-oauth',
      valid: false,
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
          v => /(?=.*[^A-Za-z0-9])/.test(v) || 'Must have special character(s)',
        ]
      }
    }
  },
  methods: {
    updateActiveState(value) {
      store.dispatch('auth/updateActiveState', value)
    },
    register() {
      store.dispatch('auth/register')
    },
    oauth(provider) {
      store.commit('auth/updateProvider', provider),
        window.location.assign(store.getters['auth/oauth']),
        store.dispatch('auth/ping')
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
    password: {
      get() {
        return store.getters['auth/password']
      },
      set(value) {
        store.commit('auth/updatePassword', value)
      }
    },
    loading() {
      return store.getters['auth/loading']
    },
    registerError() {
      return store.getters['auth/registerError']
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/utility.scss';
</style>
