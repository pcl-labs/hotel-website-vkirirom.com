<template>
  <v-form name="Register" v-model="valid">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" class="mb-2">
          <v-row no-gutters>
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
        </v-col>

        <separator-or></separator-or>

        <v-flex xs12 v-if="registerError">
          <p class="light--text">{{ registerError }}</p>
        </v-flex>

        <v-flex xs12>
          <v-btn
            x-large
            block
            color="primary"
            style="font-size:16px;"
            class="py-3 text-transform-none mb-4 dark--text"
            dark
            @click="signupWithEmail = true"
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
        <v-flex xs12 class="text-center mb-4 body-2">
          <p class="mb-0">
            <a @click="$emit('auth-forgot-password')">Forgot password?</a>
          </p>
        </v-flex>
        <v-flex xs12>
          <v-divider class="light-border"></v-divider>
        </v-flex>
        <v-flex xs12 class="text-center light--text mt-4 body-2">
          <p class="mb-0">
            Already have an account?
            <a @click="$emit('auth-login')">Log in</a>
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
  data() {
    return {
      valid: false,
      visible: false,
      signupWithEmail: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&](?=.{8,})/.test(
            v
          ) ||
          'Password must be atleast 8 characters long, containing at least 1 lowercase character, 1 uppercase character, 1 special character, 1 number'
      ]
    }
  },
  methods: {
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
        return store.state['auth/email']
      },
      set(value) {
        store.commit('auth/updateEmail', value)
      }
    },
    password: {
      get() {
        return store.state['auth/password']
      },
      set(value) {
        store.commit('auth/updatePassword', value)
      }
    },
    isAuthenticated() {
      return store.getters['auth/isAuthenticated']
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
