<template>
  <v-container class="is-limited light--text">
    <v-row>
      <v-col cols="12" md="8">
        <booking-review-rules></booking-review-rules>
      </v-col>
      <v-col cols="12" md="4">
        <booking-confirm-booking @booking-cancel="cancelBooking"></booking-confirm-booking>
      </v-col>
    </v-row>
    <v-overlay :opacity="0.96" :value="overlay">Caneling...</v-overlay>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import BookingReviewRules from '@/components/BookingReviewRules.vue'
import BookingConfirmBooking from '@/components/BookingConfirmBooking.vue'
import store from '@/store'

const SHOW_OVERLAY_DURATION = 1000

export default Vue.extend({
  name: 'booking-review-rules-page',
  components: { BookingReviewRules, BookingConfirmBooking },
  data() {
    return {
      overlay: false
    }
  },
  computed: {
    bookingResort() {
      return store.getters['booking/bookingInfo'].resort
    },
    returnUrl() {
      return store.getters['booking/bookingInfo'].returnUrl
    }
  },
  methods: {
    cancelBooking() {
      this.overlay = true
      const returnUrl = this.returnUrl
      setTimeout(() => {
        store.dispatch('booking/cancelBooking')
        this.$router.push(returnUrl)
      }, SHOW_OVERLAY_DURATION)
    }
  }
})
</script>

<style lang="scss" scoped>
//
</style>
