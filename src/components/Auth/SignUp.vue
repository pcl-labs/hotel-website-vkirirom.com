<template>
  <v-form name="Register" v-model="valid">      
    <v-layout row wrap class="ma-4">
      <v-flex xs12>
        <v-btn block flat class="btn">Continue with Facebook</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn block flat class="btn">Continue with Instagram</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn block flat class="btn">Continue with Google</v-btn>
      </v-flex>
      <v-flex xs5 style="margin-bottom:15px;">
        <v-divider style="background-color:#3D424E;"></v-divider>
      </v-flex>
      <v-flex xs2 text-xs-center style="margin-top:-12px; margin-bottom:15px;">
        <span class="normalText">or</span>
      </v-flex>
      <v-flex xs5 style="margin-bottom:15px;">
        <v-divider style="background-color:#3D424E;"></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="email"
          outline
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
          outline
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
      <v-flex xs6 text-xs-right>
        <a @click="visible=!visible" class="yellowLink">
          {{visible?'Hide':'Show'}} Password
        </a>
      </v-flex>
      <v-flex xs12>
        <v-btn block color="#F7B947" class="formBtn" dark @click="register()" :disabled="!valid">
          Sign up
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-divider style="background-color:#3D424E; margin-bottom:10px"></v-divider>
      </v-flex>
    </v-layout>
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
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(v) || 'Password must contain at least 1 lowercase character, 1 uppercase character, 1 special character, 1 number'
      ],
    }
  },
  methods:{
    register(){
      this.$store.dispatch('register')
    }
  },
  computed:{
    email:{
      get(){
        return this.$store.state.email;
      },
      set(value){
        this.$store.commit('updateEmail', value)
      }
    },
    password:{
      get(){
        return this.$store.state.password;
      },
      set(value){
        this.$store.commit('updatePassword', value)
      }
    }
  }
}
</script>

<style>
  .formBtn{
    height:55px; margin-bottom:20px; border-radius: 3px; text-transform: capitalize;
  }
  .btn{
    border: 2px solid #B9BCC1;
    border-radius: 3px;
    height: 55px;
    text-transform: capitalize;
    font-size: 16px;
    color: #B9BCC1;
    margin-bottom:26px;
    padding: 0;
  }
  .v-input__slot{
    margin: 0;
    height: 55px;
    /*To make the total margin:30px */
    margin-bottom: 10px; 
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
</style>
