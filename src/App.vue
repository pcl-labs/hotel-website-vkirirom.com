<template>
  <v-app style="background: linear-gradient(128.38deg, #121416 0%, #313A4F 100%);">
    <v-toolbar flat app dark dense color="#191C21">
    <img src="../static/img/Logo.png">
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat style="font-size: 16px;line-height: 19px; color: #D8DADE; text-transform:capitalize">Home</v-btn>
      <v-btn flat style="font-size: 16px;line-height: 19px; color: #D8DADE; text-transform:capitalize">Listing</v-btn>
      <v-btn flat style="font-size: 16px;line-height: 19px; color: #D8DADE; text-transform:capitalize">Contact</v-btn>
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

</style>
