<template>
  <!-- https://res.cloudinary.com/die9ji2vn/image/upload/v1575488759/website-static/icon/facebook-logo_xqpxva.svg -->
  <!-- https://res.cloudinary.com/die9ji2vn/image/upload/v1575488759/website-static/icon/search_dzt53z.svg -->
  <!-- https://res.cloudinary.com/die9ji2vn/image/upload/v1575488759/website-static/icon/message_exocww.svg -->
  <!-- https://res.cloudinary.com/die9ji2vn/image/upload/v1575488759/website-static/icon/locked_iub8pj.svg -->
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
        <v-flex xs5>
          <v-divider class="light-divider"></v-divider>
        </v-flex>
        <v-flex xs2 class="text-center" style="padding:0; margin-top:-12px;">
          <span class="light--text">or</span>
        </v-flex>
        <v-flex xs5>
          <v-divider class="light-divider"></v-divider>
        </v-flex>
        <div class="mt-8"></div>

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
            color="#B9BCC1"
            type="email"
            required
            dark
            :rules="emailRules"
          >
            <v-icon slot="append" color="#B9BCC1"
              >$vuetify.icons.message</v-icon
            >
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            class="mb-1"
            v-model="password"
            outlined
            label="Password"
            name="Password"
            color="#B9BCC1"
            required
            :type="visible ? 'text' : 'password'"
            dark
            :rules="passwordRules"
          >
            <v-icon slot="append" color="#B9BCC1">$vuetify.icons.lock</v-icon>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-btn
            x-large
            block
            color="#F7B947"
            style="font-size:16px;"
            class="py-3 text-capitalize mb-4"
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
          <p class="mb-0"><a>Forgot password?</a></p>
        </v-flex>
        <v-flex xs12>
          <v-divider class="light-divider"></v-divider>
        </v-flex>
        <v-flex xs12 class="text-center light--text mt-4 body-2">
          <p class="mb-0">Don't have any account? <a>Sign up</a></p>
        </v-flex>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { get } from 'http'
export default {
  data() {
    return {
      valid: false,
      visible: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
        v => /^\S+@\S+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password is required'],
      route: this.$route
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login')
    },
    oauth(provider) {
      this.$store.commit('auth/updateProvider', provider),
        window.location.assign(this.$store.getters['auth/oauth']),
        this.$store.dispatch('auth/ping')
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.getters['auth/email']
      },
      set(value) {
        this.$store.commit('auth/updateEmail', value)
      }
    },
    password: {
      get() {
        return this.$store.getters['auth/password']
      },
      set(value) {
        this.$store.commit('auth/updatePassword', value)
      }
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    loading() {
      return this.$store.getters['auth/loading']
    },
    loginError() {
      return this.$store.getters['auth/loginError']
    }
  }
}
</script>

<style scoped lang="scss">
.v-input__slot {
  margin: 0;
  height: 55px;
  /*To make the total margin:30px */
  margin-bottom: 5px;
}
@-webkit-keyframes autofill {
  to {
    color: white;
    background: transparent;
  }
}

input:-webkit-autofill {
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
}

.light-divider {
  border-color: $light;
}
</style>
