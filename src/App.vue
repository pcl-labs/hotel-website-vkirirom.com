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
  created(){
    this.$store.dispatch('auth/ping')
  }
}
</script>

<style lang="scss">
  body{
    overflow-x: hidden;
  }
  html {
    scroll-behavior: smooth;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    a {
      color: #b9bcc1;
      &:hover, &:active, &:focus {
        color: #d4d6d9;
      }
    }
  }
  // TODO: Change to rem units?
  h1 {
    font-size: 36px;
    line-height: 48px;
    color: #b9bcc1;
  }
  h2 {
    font-size: 28px;
    line-height: 40px;
    color: #b9bcc1;
  }
  h3 {
    font-size: 20px;
    line-height: 32px;
    color: #b9bcc1;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    color: #b9bcc1;
  }
  a {
    font-size: 16px;
    line-height: 24px;
    text-decoration: none;
  }
  li {
    color: #b9bcc1;
    font-size: 16px;
    line-height: 24px;
  }
  .container {
    padding-left: 8px;
    padding-right: 8px;
  }
  @media only screen and (min-width: 576px) {
    .container {
      max-width: 544px;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
  }
  @media only screen and (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media only screen and (min-width: 960px) {
    .container {
      max-width: 904px !important;
    }
  }
  .v-btn {
    height: 40px;
  }
  .v-btn--large {
    height: 48px;
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
