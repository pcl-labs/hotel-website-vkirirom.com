<template>
  <v-app style="background: linear-gradient(115.51deg, #00243E 0%, #003E3A 100%);" id="app">
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
