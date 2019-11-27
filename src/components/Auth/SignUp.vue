<template>
  <v-form name="Register" v-model="valid">
    <v-container class="signup-container" grid-list-md>      
      <v-row class="ml-6 mr-6">
        <v-flex xs12 class="headerText" text-center>Sign up with</v-flex>
        <v-flex xs6>
          <v-btn block text class="btn" @click="oauth('Facebook')">Facebook</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn block text class="btn" @click="oauth('Google')">Google</v-btn>
        </v-flex>
        <v-flex xs5 style="margin-bottom:6px;">
          <v-divider style="background-color:#3D424E;"></v-divider>
        </v-flex>
        <v-flex xs2 text-center style="margin-top:-6px; margin-bottom:6px; padding:0;">
          <span class="normalText">or</span>
        </v-flex>
        <v-flex xs5 style="margin-bottom:6px;">
          <v-divider style="background-color:#3D424E;"></v-divider>
        </v-flex>
        <v-flex xs12 v-if="registerError">
          <p class="normalText">{{registerError}}</p>
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
          <a @click="visible=!visible" class="yellowLink">
            {{visible?'Hide':'Show'}} Password
          </a>
        </v-flex>
        <v-flex xs12>
          <v-btn block color="#F7B947" style="font-size:16px;" class="formBtn" dark @click="register()" :disabled="!valid" :loading="loading">
            Sign up
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-divider style="background-color:#3D424E; margin-top:5px; margin-bottom:5px"></v-divider>
        </v-flex>
      </v-row>
    </v-container>
  </v-form>      
</template>

<script>
export default {
  data(){
    return{
      valid : false,
      visible : false,
      remember: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&](?=.{8,})/.test(v) || 'Password must be atleast 8 characters long, containing at least 1 lowercase character, 1 uppercase character, 1 special character, 1 number'
      ],
    }
  },
  methods:{
    register(){
      this.$store.dispatch('auth/register')
    },
    oauth(provider){
      this.$store.commit('auth/updateProvider', provider),
      window.location.assign(this.$store.getters["auth/oauth"]),
      this.$store.dispatch('auth/ping')
    }
  },
  computed:{
    email:{
      get(){
        return this.$store.state["auth/email"];
      },
      set(value){
        this.$store.commit('auth/updateEmail', value)
      }
    },
    password:{
      get(){
        return this.$store.state["auth/password"];
      },
      set(value){
        this.$store.commit('auth/updatePassword', value)
      }
    },
    isAuthenticated(){
      return this.$store.getters["auth/isAuthenticated"]
    },
    loading(){
      return this.$store.getters["auth/loading"]
    },
    registerError(){
      return this.$store.getters["auth/registerError"]
    }
  }
}
</script>

<style scoped>
  .formBtn{
    height:55px; margin-bottom:10px; border-radius: 3px; text-transform: capitalize;
  }
  .headerText{
    font-size:20px;
    color: #B9BCC1;
    margin-bottom:5px;
    margin-top:-10px;
  }
  .btn{
    border: 2px solid #B9BCC1;
    border-radius: 3px;
    height: 55px;
    text-transform: capitalize;
    font-size: 16px;
    color: #B9BCC1;
    margin-bottom:13px;
    padding: 0;
  }
  .v-input__slot{
    margin: 0;
    height: 55px;
    /*To make the total margin:30px */
    margin-bottom: 5px; 
  }
  .yellowLink{
    font-size:16px; text-decoration:none; color: #F7B947;
  }
  .normalText{
    font-size: 16px;
    color: #B9BCC1;
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

  .signup-container {
    max-width: none;
  }
</style>
