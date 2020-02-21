<template>
  <fragment>
    <page-header></page-header>

    <div class="page">
      <div class="page-content brand-gradient">
        <v-container class="pa-0" v-if="$vuetify.breakpoint.smAndDown">
          <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
          <v-container class="brand-gradient py-8 px-4">
            <h1 class="mb-4 font-weight-bold display-1">{{ steps.thankYou.title }}</h1>
            <booking-thanks></booking-thanks>
          </v-container>
        </v-container>
        <v-container v-else class="is-limited light--text px-md-0 py-8">
          <v-row no-gutters>
            <v-col cols="12">
              <h1 class="mb-4 font-weight-bold display-2">{{ steps.thankYou.title }}</h1>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="7">
              <div class="pr-7">
                <booking-thanks></booking-thanks>
              </div>
            </v-col>
            <v-col cols="12" md="5">
              <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <page-footer></page-footer>
    </div>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue';
const BookingThanks = () => import('@/components/BookingThanks.vue');
const BookingConfirmBooking = () => import('@/components/BookingConfirmBooking.vue');
const PageFooter = () => import('@/components/PageFooter.vue');
const PageHeader = () => import('@/components/PageHeader.vue');
import store from '@/store';

export default Vue.extend({
  name: 'booking-thanks-page',
  components: { PageHeader, BookingThanks, BookingConfirmBooking, PageFooter },
  computed: {
    steps() {
      return (this as any).$store.getters['booking/steps'];
    },
    returnUrl() {
      return (this as any).$store.getters['booking/bookingInfo'].returnUrl;
    }
  },
  destroyed() {
    if (process.env.VUE_APP_DEV_MODE == 1) {
      console.log('no clear booking in dev mode');
      return;
    }
    (this as any).$store.dispatch('booking/endBooking');
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
