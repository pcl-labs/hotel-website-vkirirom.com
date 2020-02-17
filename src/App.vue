<template>
  <v-app class="wrapper" :class="hiddenLanguagesClasses" id="app">
    <router-view />
    <snackbars-global></snackbars-global>
    <page-progress-bar-global></page-progress-bar-global>
  </v-app>
</template>

<script>
import store from '@/store'
import { languageCodes, appTitle } from '@/constants/app'
import SnackbarsGlobal from '@/components/SnackbarsGlobal.vue'
import PageProgressBarGlobal from '@/components/PageProgressBarGlobal.vue'

export default {
  name: 'app',
  metaInfo: {
    title: appTitle
  },
  components: { SnackbarsGlobal, PageProgressBarGlobal },
  created() {
    this.clearTemporaryStates()
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        await store.dispatch('auth/ping')
      } catch (error) {
        console.log(error.message)
      }
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
