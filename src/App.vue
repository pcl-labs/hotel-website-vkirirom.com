<template>
  <v-app class="wrapper" :class="hiddenLanguagesClasses" id="app">
    <router-view />
    <snackbars-global></snackbars-global>
    <page-progress-bar-global v-if="shouldShowProgressBar"></page-progress-bar-global>
    <page-splash-screen v-if="isSplashScreenVisible"></page-splash-screen>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { languageCodes, appTitle } from '@/constants/app';
const SnackbarsGlobal = () => import(/* webpackMode: "eager" */ '@/components/SnackbarsGlobal.vue');
const PageProgressBarGlobal = () => import(/* webpackMode: "eager" */ '@/components/PageProgressBarGlobal.vue');
const PageSplashScreen = () => import(/* webpackMode: "eager" */ '@/components/PageSplashScreen.vue');

export default Vue.extend({
  name: 'app',
  metaInfo: {
    title: appTitle
  },
  components: { SnackbarsGlobal, PageProgressBarGlobal, PageSplashScreen },
  created() {
    this.clearTemporaryStates();
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        await (this as any).$store.dispatch('auth/ping');
      } catch (error) {
        console.log(error.message);
      }
    },
    clearTemporaryStates() {
      (this as any).$store.commit('auth/updateLoading', false);
    }
  },
  computed: {
    hiddenLanguagesClasses() {
      const selectedLanguageCode = (this as any).$store.getters['language/config'].selectedLanguageCode;
      return languageCodes.filter(code => code !== selectedLanguageCode).map(code => `hide-lang-${code}`);
    },
    isSplashScreenVisible(): boolean {
      return (this as any).$store.getters['loading/isSplashScreenVisible'];
    },
    shouldShowProgressBar(): boolean {
      return !this.isSplashScreenVisible;
    }
  }
});
</script>

<style lang="scss">
// global style
@import '@/styles/global-main.scss';
</style>
