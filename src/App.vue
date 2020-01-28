<template>
  <v-app class="wrapper" :class="hiddenLanguagesClasses" id="app">
    <!-- TODO: remove :key similar to https://github.com/whynotearth/shinta-mani-wild/pull/298 -->
    <router-view :key="$route.name + ($route.params.id || '')" />
  </v-app>
</template>

<script>
import store from '@/store'
import { languageCodes } from '@/constants/app'

export default {
  name: 'app',
  created() {
    this.getUser()
    this.clearTemporaryStates()
  },
  methods: {
    getUser() {
      store.dispatch('auth/ping').catch(error => {
        console.log('User is not authenticated')
      })
    },
    clearTemporaryStates() {
      store.commit('auth/updateLoading', false)
    }
  },
  computed: {
    hiddenLanguagesClasses() {
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
