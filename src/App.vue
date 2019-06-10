<template>
  <v-app style="background: linear-gradient(128.38deg, #121416 0%, #313A4F 100%);" id="app">
    <v-toolbar app dark color="#191C21" style="box-shadow: 0px 1px 0px #121416;">
    <img src="../static/img/Logo.png">
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat style="color: #D8DADE; text-transform:capitalize"><h3>Accommodation</h3></v-btn>
      <v-btn flat style="color: #D8DADE; text-transform:capitalize"><h3>Events</h3></v-btn>
      <v-btn flat style="color: #D8DADE; text-transform:capitalize"><h3>Experience</h3></v-btn>
      <v-btn flat style="color: #D8DADE; text-transform:capitalize"><h3>Food</h3></v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <home></home>
  </v-app>
</template>

<script>
import home from './components/Home'

export default {
  components:{
    home
  }
}
</script>

<style>
  #app{
    font-family: 'Lato', sans-serif;
    
  }
</style>
