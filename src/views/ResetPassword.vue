<template>
  <v-container align-center style="background: transparent;" fluid class="resetPasswordForm">
    <v-flex xs12 md6 class='reset-password-flex mx-auto'>
      <v-row>
        <v-col align-center xs12 fluid text-center>
          <h2>Reset Password</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col align-center xs12 fluid text-center>
          <h5>Enter your new password, and reenter to confirm. Minimum 6 characters.</h5>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs12 fluid text-center>
          <v-text-field
            v-model="password"
            outlined
            label="password"
            name="Password"
            color="light"
            type="password"
            required
            dark
            :rules="rules.password"
          >
          <v-icon slot="append" color="light">lock</v-icon>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs12 fluid text-center>
          <v-text-field
            v-model="confirmPassword"
            outlined
            label="Confirm Password"
            name="ConfirmPassword"
            color="light"
            type="password"
            required
            dark
            :rules="rules.password"
          >
          <v-icon slot="append" color="light">lock</v-icon>

          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-flex>
            <div
              class="v-input__control"
              style='border: 1px solid #aaa; padding: 5px;'
            >
              <div class="v-input__slot">
                <div class="v-input--selection-controls__input">
                  <input aria-checked="false" id="input-15" role="checkbox" type="checkbox" value="">
                  <div class="v-input--selection-controls__ripple">
                  </div>
                  <i aria-hidden="true" class="v-icon notranslate material-icons theme--dark">check_box_outline_blank</i>
                </div>
                <label for="input-15" class="v-label theme--dark" style="left: 0px; right: auto; position: relative;">
                  Yes I want to reset
                </label>
              </div>
            </div>
          </v-flex>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs12>
          <v-btn
            dark
            large
            depressed
            class="menubtn mx-auto text-transform-none dark--text reset-password--submit"
            color="yellow"
            v-on:click="submitResetPassword"
          >
            Reset Password <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-flex>
  </v-container>
</template>

<script>
  const Auth = () => import('@/store/modules/auth')
  import { mapState } from 'vuex';


  export default {
    name: "reset-password",
    methods: {
      submitResetPassword(event) {
        event.preventDefault();
        var urlParams = this.$route.params.id
        if (urlParams && this.resetConfirmation) {
          this.resetPassword(urlParams).
            catch(err => {
              //window.location.href = "/"
            })
        }
      },

      resetPassword(options = {}) {
        /**return new Promise((resolve, reject) => {
          const configs = Object.assign({}, options, { method: 'post' })
          configs.headers = Object.assign({}, options.headers, {
            'Content-Type': 'application/json'
          })
          let url = '/api/v0/reset-password'
          configs.url = url
          let data = null
          configs.data = data
          axios(configs)
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              reject(err)
            })
        })**/
      }
  },

  data(){
    return {
      password: '',
      confirmPassword: '',
      resetConfirmation: false,
      rules: {
        password: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Must be atleast 8 characters long',
          v => /(?=.*[a-z])/.test(v) || 'Must have lowercase character(s)',
          v => /(?=.*[A-Z])/.test(v) || 'Must have uppercase character(s)',
          v => /(?=.*\d)/.test(v) || 'Must have number(s)',
          v => /(?=.*[^A-Za-z0-9])/.test(v) || 'Must have special character(s)',
          function(v) {
            if (this.password != this.confirmPassword && (this.password != '' || this.confirmPassword != '')) {
              return "Both pasword fields must match."
            } else {
              return true
            }
          }.bind(this)
        ]
      }
    }
  }
};
</script>

<style>
  h2, h5 {
    color: #D8DADE;
  }
</style>
