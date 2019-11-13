<template>
  <v-app style="background: linear-gradient(115.51deg, #00243E 0%, #003E3A 100%);" id="app">
    <Toolbar></Toolbar>
    <router-view :key="$route.name + ($route.params.id || '')" />
    <!-- for reloading created while trying to navigate to different ids in the dynamic route -->
  </v-app>
</template>

<script>
const Toolbar = () => import("@/components/Toolbar.vue");

export default {
  name: "app",
  components: {
    Toolbar
  }
};
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
body {
  overflow-x: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  a {
    color: #b9bcc1;
    &:hover,
    &:active,
    &:focus {
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
.v-btn {
  height: 40px;
}
.v-btn--large {
  height: 48px;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
