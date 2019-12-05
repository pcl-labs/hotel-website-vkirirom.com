<template>
<!-- https://res.cloudinary.com/die9ji2vn/image/upload/v1575488759/website-static/icon/facebook-logo_xqpxva.svg -->
<!-- https://res.cloudinary.com/die9ji2vn/image/upload/v1575488759/website-static/icon/search_dzt53z.svg -->
<!-- https://res.cloudinary.com/die9ji2vn/image/upload/v1575488759/website-static/icon/message_exocww.svg -->
<!-- https://res.cloudinary.com/die9ji2vn/image/upload/v1575488759/website-static/icon/locked_iub8pj.svg -->
  <v-form name="Login" v-model="valid">
    <v-container fluid>
      <v-row no-gutters class="ml-8 mr-8">
        <v-col cols="12">
          <h3 class="w-100 headerText text-center mb-4" text-center>
            Log in with
          </h3>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-row>
            <v-col xs6>
              <v-btn x-large block text class="btn" @click="oauth('Facebook')"
                >Facebook</v-btn
              >
            </v-col>
            <v-col xs6>
              <v-btn x-large block text class="btn" @click="oauth('Google')"
                >Google</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-flex xs5>
          <v-divider style="background-color:#3D424E;"></v-divider>
        </v-flex>
        <v-flex xs2 class="text-center" style="padding:0; margin-top:-12px;">
          <span class="normalText">or</span>
        </v-flex>
        <v-flex xs5>
          <v-divider style="background-color:#3D424E;"></v-divider>
        </v-flex>
        <div class="mt-8"></div>

        <v-flex xs12 v-if="loginError">
          <p class="normalText">{{ loginError }}</p>
        </v-flex>
        <v-flex xs12>
          <v-text-field
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
            <v-icon slot="append" color="#B9BCC1">email</v-icon>
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
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
            <v-icon slot="append" color="#B9BCC1">lock</v-icon>
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-checkbox
            v-model="remember"
            label="Remember me"
            color="#B9BCC1"
            dark
            style="margin:0; padding:0;"
            height="22px"
          >
          </v-checkbox>
        </v-flex>
        <v-flex xs6 text-right>
          <a @click="visible = !visible" class="yellowLink normalText">
            {{ visible ? 'Hide' : 'Show' }} Password
          </a>
        </v-flex>
        <v-flex xs12>
          <v-btn
            x-large
            block
            color="#F7B947"
            style="font-size:16px;"
            class="formBtn"
            dark
            @click="login()"
            :disabled="!valid"
            :loading="loading"
          >
            Log in
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-divider
            style="background-color:#3D424E; margin-top:8px; margin-bottom:5px"
          ></v-divider>
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
      remember: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
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

<style scoped>
.formBtn {
  height: 55px;
  margin-bottom: 16px;
  border-radius: 3px;
  text-transform: capitalize;
}
.headerText {
  font-size: 20px;
  color: #b9bcc1;
  margin-bottom: 5px;
  margin-top: -10px;
}
.btn {
  border: 2px solid #b9bcc1;
  border-radius: 3px;
  height: 55px;
  text-transform: capitalize;
  font-size: 16px;
  color: #b9bcc1;
  margin-bottom: 13px;
  padding: 0;
}
.v-input__slot {
  margin: 0;
  height: 55px;
  /*To make the total margin:30px */
  margin-bottom: 5px;
}
.yellowLink {
  font-size: 16px;
  text-decoration: none;
  color: #f7b947;
}
.normalText {
  font-size: 16px;
  color: #b9bcc1;
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
</style>
