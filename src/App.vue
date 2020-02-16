<template>
  <v-app class="wrapper" :class="hiddenLanguagesClasses" id="app">
    <router-view />
    <snackbars-global></snackbars-global>
    <page-progress-bar-global v-if="shouldShowProgressBar"></page-progress-bar-global>
    <page-splash-screen v-if="shouldShowSplashScreen" :visibility-timeout="Infinity"></page-splash-screen>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { languageCodes, appTitle } from '@/constants/app'
import SnackbarsGlobal from '@/components/SnackbarsGlobal.vue'
import PageProgressBarGlobal from '@/components/PageProgressBarGlobal.vue'
import PageSplashScreen from '@/components/PageSplashScreen.vue'

export default Vue.extend({
  name: 'app',
  metaInfo: {
    title: appTitle
  },
  components: { SnackbarsGlobal, PageProgressBarGlobal, PageSplashScreen },
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
    },
    shouldShowSplashScreen(): boolean {
      const firstRouteEntered = store.getters['loading/firstRouteEntered']
      return !firstRouteEntered
    },
    shouldShowProgressBar(): boolean {
      const firstRouteEntered = store.getters['loading/firstRouteEntered']
      return firstRouteEntered
    }
  }
})
</script>

<style lang="scss">
// global style
@import '@/styles/global-main.scss';
</style>
