<template>
  <div class="page">
    <div class="page-content brand-gradient">
      <!-- mobile -->
      <v-container class="pa-0" v-if="$vuetify.breakpoint.smAndDown">
        <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
        <v-container class="brand-gradient py-8 px-4">
          <h1 class="mb-4 font-weight-bold display-1">{{ steps.reviewPolicies.title }}</h1>
          <booking-review-rules></booking-review-rules>
        </v-container>
      </v-container>
      <!-- desktop -->
      <v-container v-else class="is-limited light--text px-md-0 py-8">
        <v-row no-gutters>
          <v-col cols="12">
            <h1 class="mb-4 font-weight-bold display-2">{{ steps.reviewPolicies.title }}</h1>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <div class="pr-7">
              <booking-review-rules></booking-review-rules>
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BookingReviewRules from '@/components/BookingReviewRules.vue'
import BookingConfirmBooking from '@/components/BookingConfirmBooking.vue'
import store from '@/store'

export default Vue.extend({
  name: 'booking-review-rules-page',
  components: { BookingReviewRules, BookingConfirmBooking },
  mounted() {
    store.dispatch('booking/updateCurrentStep', this.steps.reviewPolicies)
  },
  computed: {
    steps() {
      return store.getters['booking/steps']
    },
    bookingResort() {
      return store.getters['booking/bookingInfo'].resort
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
