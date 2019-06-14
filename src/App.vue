<template>
  <v-app style="background: linear-gradient(128.38deg, #121416 0%, #313A4F 100%);" id="app">
    <Toolbar></Toolbar>
    <router-view/>
  </v-app>
</template>

<script>

import Toolbar from '@/components/Toolbar';

export default {
  name: "app",
  components: {
    Toolbar,
  }
}
</script>

<style>
  #app{
    font-family: 'Lato', sans-serif;
    
  }
  html {
    scroll-behavior: smooth;
  }
</style>
