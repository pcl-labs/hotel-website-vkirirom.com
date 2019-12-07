<template>
  <v-form name="Login" v-model="valid">
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
                ><v-icon class="mr-4">$vuetify.icons.google</v-icon
                ><span>Continue with Google</span></v-btn
              >
            </v-col>
          </v-row>
        </v-col>

        <separator-or></separator-or>

        <v-flex xs12 v-if="loginError">
          <p class="light--text">{{ loginError }}</p>
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
            required
            dark
            :rules="emailRules"
          >
            <v-icon slot="append"
              >$vuetify.icons.message</v-icon
            >
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            dark
            class="mb-1"
            v-model="password"
            outlined
            label="Password"
            name="Password"
            color="light"
            required
            :type="isPasswordVisible ? 'text' : 'password'"
            :rules="passwordRules"
          >
            <v-icon slot="append">$vuetify.icons.lock</v-icon>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-btn
            x-large
            block
            color="primary"
            style="font-size:16px;"
            class="py-3 text-capitalize mb-4 dark--text"
            dark
            @click="login()"
            :disabled="!valid"
            :loading="loading"
          >
            <v-spacer></v-spacer>
            <span>Log in</span>
            <v-spacer></v-spacer>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 class="text-center mb-4 body-2">
          <p class="mb-0"><a @click="$emit('auth-forgot-password')">Forgot password?</a></p>
        </v-flex>
        <v-flex xs12>
          <v-divider class="light-border"></v-divider>
        </v-flex>
        <v-flex xs12 class="text-center light--text mt-4 body-2">
          <p class="mb-0">Don't have any account? <a @click="$emit('auth-signup')">Sign up</a></p>
        </v-flex>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import SeparatorOr from '@/components/SeparatorOr.vue'
import store from '@/store'

export default {
  name: 'auth-login',
  components: { SeparatorOr },
  data() {
    return {
      valid: false,
      isPasswordVisible: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
        v => /^\S+@\S+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password is required']
    }
  },
  methods: {
    login() {
      store.dispatch('auth/login')
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
    loginError() {
      return store.getters['auth/loginError']
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/utility.scss';
</style>
