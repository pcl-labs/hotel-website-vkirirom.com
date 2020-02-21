<template>
  <v-card tile :elevation="0" color="dark" class="d-flex flex-column">
    <div class="d-flex flex-column flex-grow-1">
      <div class="position-relative hero-dialog--hero">
        <v-img
          :aspect-ratio="376 / 192"
          :max-height="192"
          :max-width="'100%'"
          :src="
            transformCloudinaryUrl(
              'https://res.cloudinary.com/die9ji2vn/image/upload/v1577609316/Booking%20Flow/LogIn_bl4sz3.png',
              'f_auto'
            )
          "
        ></v-img>
        <div class="position-absolute mx-4 mt-4 hero-dialog--toolbar">
          <v-btn class="ma-0" x-small fab color="rgba(0,0,0,0.4)" depressed @click="$emit('booking-cancel')">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </div>
        <div class="position-absolute hero-dialog--title text-center brand-2--text w-100">
          <h2 class="display-1 mb-0 font-weight-bold">
            {{ dialog.title }}
          </h2>
        </div>
      </div>

      <v-card color="dark pt-6 px-4 pb-9 light--text d-flex flex-column flex-grow-1" tile :ripple="false">
        <div class="d-flex flex-column flex-grow-1">
          <div class="light--text mx-auto d-flex flex-column flex-grow-1">
            <auth-core />
          </div>
        </div>
      </v-card>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
const AuthCore = () => import('@/components/AuthCore.vue');

export default Vue.extend({
  name: 'booking-auth',
  components: { AuthCore },
  props: {
    nextStep: {
      type: Object,
      required: true
    }
  },
  mounted() {
    (this as any).$store.dispatch('auth/updateActiveState', 'auth-login');
    if ((this as any).isAuthenticated) {
      (this as any).goNextStep();
    }
  },
  computed: {
    dialog() {
      return (this as any).$store.getters['auth/dialog'];
    },
    isAuthenticated(): boolean {
      return (this as any).$store.getters['auth/isAuthenticated'];
    }
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        (this as any).goNextStep();
      }
    }
  },
  methods: {
    goNextStep() {
      (this as any).$store.dispatch('booking/updateCurrentStep', (this as any).nextStep);
    }
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
@import '@/styles/dialog-with-hero.scss';
</style>
