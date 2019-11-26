<template>
  <router-view :key="$route.name + ($route.params.id || '')"/> 
</template>

<script>
const Toolbar = () => import ('@/components/Toolbar.vue')

export default {
  name: "app",
  components: {
    Toolbar,
  },
  created(){
    this.$store.dispatch('auth/ping')
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';

  #app {
    font-family: $font-family-sans-serif;
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
  .v-carousel__controls{
    background: transparent !important;
    .v-btn__content{
      margin: 0;
      padding: 0;
    }
    .v-icon{
      font-size: 7px !important;
      color: white !important;
    }
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
