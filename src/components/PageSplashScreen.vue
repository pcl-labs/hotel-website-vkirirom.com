<template>
  <transition name="fade">
    <v-overlay :z-index="zindexSplashScreen" :value="overlay" color="darkBlue" :opacity="1" class="text-center">
      <transition name="fade">
        <v-img
          v-if="shouldShowLogo"
          class="logo"
          contain
          :height="64"
          src="https://res.cloudinary.com/die9ji2vn/image/upload/f_auto/v1578304830/Home%20Page/logo2_qoiy2d.png"
        ></v-img>
      </transition>
      <img
        class="d-none"
        @load="shouldShowLogo = true"
        src="https://res.cloudinary.com/die9ji2vn/image/upload/f_auto/v1578304830/Home%20Page/logo2_qoiy2d.png"
      />
      <v-progress-circular
        indeterminate
        color="white"
        :size="24"
        :width="2"
        class="mt-8"
        :class="{ 'visibility-hidden': !shouldShowLoading }"
      ></v-progress-circular>
    </v-overlay>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import { zindexSplashScreen } from '@/styles/variables.scss';
const waitingUntilShowingLoading = 3000;
const visibilityTimeout = 6000;

export default Vue.extend({
  name: 'page-splash-screen',
  data: () => ({
    shouldShowLogo: false,
    zindexSplashScreen,
    visibilityTimedOut: false,
    shouldShowLoading: false
  }),
  mounted() {
    this.timers();
  },
  methods: {
    timers() {
      const loadingTimer = setTimeout(() => {
        this.shouldShowLoading = true;
      }, waitingUntilShowingLoading);

      const visibilityTimer = setTimeout(() => {
        this.visibilityTimedOut = true;
      }, visibilityTimeout);

      this.$once('hook:destroyed', () => {
        clearTimeout(loadingTimer);
        clearTimeout(visibilityTimer);
      });
    }
  },
  computed: {
    overlay(): boolean {
      if (this.visibilityTimedOut) {
        return false;
      }
      return true;
    }
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>

<style lang="scss" scoped>
.logo {
  margin-top: rem(56px);
}
</style>
