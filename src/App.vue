<template>
  <v-app style="background: linear-gradient(115.51deg, #00243E 0%, #003E3A 100%);" id="app">
    <Toolbar></Toolbar>
      <router-view :key="$route.name + ($route.params.id || '')"/> 
      <!-- for reloading created while trying to navigate to different ids in the dynamic route -->
  </v-app>
</template>

<script>
const Toolbar = () => import ('@/components/Toolbar.vue')

export default {
  name: "app",
  components: {
    Toolbar,
  },

}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  body{
    overflow-x: hidden;
  }
  html {
    scroll-behavior: smooth;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
