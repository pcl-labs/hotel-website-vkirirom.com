<template>
  <v-container class="is-limited light--text">
    <v-row no-gutters="">
      <v-col cols="12" md="8">
        <booking-review-policies></booking-review-policies>
      </v-col>
      <v-col cols="12" md="4">
        <booking-confirm-booking @booking-close="onClose"></booking-confirm-booking>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import BookingReviewPolicies from '@/components/BookingReviewPolicies.vue'
import BookingConfirmBooking from '@/components/BookingConfirmBooking.vue'
import store from '@/store'
export default Vue.extend({
  components: { BookingReviewPolicies, BookingConfirmBooking },
  computed: {
    bookingResort() {
      return store.getters['booking/bookingInfo'].resort
    }
  },
  methods: {
    onClose() {
      this.$router.push({ name: this.bookingResort.route, params: { id: this.bookingResort.slug } })
      store.dispatch('booking/cancelBooking')
    }
  }
})
</script>

<style lang="scss" scoped>
//
</style>
