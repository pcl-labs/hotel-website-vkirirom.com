<template>
  <v-app style="background: linear-gradient(128.38deg, #121416 0%, #313A4F 100%);" id="app">
    <Toolbar></Toolbar>
    <router-view/>
    <Footer></Footer>
  </v-app>
</template>

<script>

import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';


export default {
  name: "app",
  components: {
    Toolbar,
    Footer
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
