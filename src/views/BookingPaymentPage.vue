<template>
  <div class="page">
    <v-container class="is-limited light--text px-2 px-md-0 py-8">
      <v-row no-gutters>
        <v-col class="px-md-3 order-2 order-md-1" cols="12" md="8">
          <div class="mx-6">
            <booking-payment></booking-payment>
          </div>
        </v-col>
        <v-col class="pb-0 order-1 order-md-2" cols="12" md="4">
          <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
        </v-col>
      </v-row>
    </v-container>
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
  computed: {
    returnUrl() {
      return store.getters['booking/bookingInfo'].returnUrl
    }
  }
})
</script>
