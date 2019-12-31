<template>
  <fragment>
    <v-container class="is-limited light--text px-2 px-md-0 py-8">
      <v-row no-gutters>
        <v-col class="px-md-3 order-2 order-md-1" cols="12" md="8">
          <div class="mx-6 mx-md-0">
            <booking-review-rules></booking-review-rules>
          </div>
        </v-col>
        <v-col class="pb-0 order-1 order-md-2" cols="12" md="4">
          <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
        </v-col>
      </v-row>
    </v-container>

    <Footer></Footer>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import BookingReviewRules from '@/components/BookingReviewRules.vue'
import BookingConfirmBooking from '@/components/BookingConfirmBooking.vue'
import Footer from '@/components/Footer.vue'
import store from '@/store'

export default Vue.extend({
  name: 'booking-review-rules-page',
  components: { BookingReviewRules, BookingConfirmBooking, Footer },
  computed: {
    bookingResort() {
      return store.getters['booking/bookingInfo'].resort
    },
    returnUrl() {
      return store.getters['booking/bookingInfo'].returnUrl
    }
  }
})
</script>
