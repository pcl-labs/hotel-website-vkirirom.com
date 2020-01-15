<template>
  <div class="page light--text">
    <div class="page-content brand-gradient">
      <v-container class="pa-0" v-if="$vuetify.breakpoint.smAndDown">
        <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
        <v-container class="brand-gradient py-8 px-4">
          <booking-customer-info></booking-customer-info>
        </v-container>
      </v-container>
      <v-container v-else class="is-limited light--text px-0 py-8">
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <div class="pr-7">
              <booking-customer-info></booking-customer-info>
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
import BookingCustomerInfo from '@/components/BookingCustomerInfo.vue'
import BookingConfirmBooking from '@/components/BookingConfirmBooking.vue'
import store from '@/store'

export default Vue.extend({
  name: 'booking-customer-info-page',
  components: { BookingCustomerInfo, BookingConfirmBooking },
  computed: {
    returnUrl() {
      return store.getters['booking/bookingInfo'].returnUrl
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
