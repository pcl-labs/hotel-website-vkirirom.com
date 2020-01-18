<template>
  <v-app class="wrapper" :class="hiddenLanguagesClasses" id="app">
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
  },
  computed: {
    hiddenLanguagesClasses() {
      const languageCodes = ['en', 'kh']
      const selectedLanguageCode = store.getters['language/config'].selectedLanguageCode
      return languageCodes.filter(code => code !== selectedLanguageCode).map(code => `hide-lang-${code}`)
    }
  }
}
</script>

<style lang="scss">
// global style
@import '@/styles/global-main.scss';
</style>
