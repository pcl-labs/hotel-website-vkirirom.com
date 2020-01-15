<template>
  <div class="page light--text">
    <div class="page-content brand-gradient">
      <v-container class="pa-0" v-if="$vuetify.breakpoint.smAndDown">
        <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
        <v-container class="brand-gradient py-8 px-4">
          <booking-payment></booking-payment>
        </v-container>
      </v-container>
      <v-container v-else class="is-limited light--text px-0 py-8">
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <div class="pr-7">
              <booking-payment></booking-payment>
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="px-1">
              <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BookingPayment from '@/components/BookingPayment.vue'
import BookingConfirmBooking from '@/components/BookingConfirmBooking.vue'
import store from '@/store'

export default Vue.extend({
  name: 'booking-payment-page',
  components: { BookingPayment, BookingConfirmBooking },
  mounted() {
    store.dispatch('booking/updateCurrentStep', this.steps.paymentInfo)
  },
  computed: {
    steps() {
      return store.getters['booking/steps']
    },
    returnUrl() {
      return store.getters['booking/bookingInfo'].returnUrl
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
