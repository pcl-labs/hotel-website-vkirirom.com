<template>
  <v-app style="background: linear-gradient(115.51deg, #00243E 0%, #003E3A 100%);" id="app">
    <Toolbar></Toolbar>
    <!-- TODO: remove :key similar to https://github.com/whynotearth/shinta-mani-wild/pull/298 -->
    <router-view :key="$route.name + ($route.params.id || '')" />
  </v-app>
</template>

<script>
import store from '@/store'
const Toolbar = () => import('@/components/Toolbar.vue')

export default {
  name: 'app',
  components: {
    Toolbar
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      store.dispatch('auth/ping').catch(error => {
        console.log('User is not authenticated')
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
