<template>
  <fragment>
    <page-header></page-header>
    <div class="page light--text">
      <div class="page-content brand-gradient">
        <v-container class="pa-0" v-if="$vuetify.breakpoint.smAndDown">
          <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
          <v-container class="brand-gradient py-8 px-4">
            <h1 class="mb-4 font-weight-bold display-1">{{ steps.paymentInfo.title }}</h1>
            <booking-payment></booking-payment>
          </v-container>
        </v-container>
        <v-container v-else class="is-limited light--text px-0 py-8">
          <v-row no-gutters>
            <v-col cols="12">
              <h1 class="mb-4 font-weight-bold display-2">{{ steps.paymentInfo.title }}</h1>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="7">
              <div class="pr-7">
                <booking-payment></booking-payment>
              </div>
            </v-col>
            <v-col cols="12" md="5">
              <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue';
const BookingPayment = () => import('@/components/BookingPayment.vue');
const BookingConfirmBooking = () => import('@/components/BookingConfirmBooking.vue');
const PageHeader = () => import('@/components/PageHeader.vue');
import store from '@/store';

export default Vue.extend({
  name: 'booking-payment-page',
  components: { PageHeader, BookingPayment, BookingConfirmBooking },
  mounted() {
    (this as any).$store.dispatch('booking/updateCurrentStep', (this as any).steps.paymentInfo);
  },
  computed: {
    steps() {
      return (this as any).$store.getters['booking/steps'];
    },
    returnUrl() {
      return (this as any).$store.getters['booking/bookingInfo'].returnUrl;
    }
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
