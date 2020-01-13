<template>
  <v-app style="background: linear-gradient(115.51deg, #00243E 0%, #003E3A 100%);" id="app">
    <page-header></page-header>
    <!-- TODO: remove :key similar to https://github.com/whynotearth/shinta-mani-wild/pull/298 -->
    <router-view :key="$route.name + ($route.params.id || '')" />
  </v-app>
</template>

<script>
import store from '@/store'
const PageHeader = () => import('@/components/PageHeader.vue')

export default {
  name: 'app',
  components: {
    PageHeader
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
@import '@/styles/global-main.scss';
</style>
