<template>
  <div class="page">
    <div class="page-content brand-gradient">
      <v-container class="pa-0" v-if="$vuetify.breakpoint.smAndDown">
        <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
        <v-container class="brand-gradient py-8 px-4">
          <booking-thanks></booking-thanks>
        </v-container>
      </v-container>
      <v-container v-else class="is-limited light--text px-md-0 py-8">
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <div class="pr-7">
              <booking-thanks></booking-thanks>
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

    <page-footer></page-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BookingThanks from '@/components/BookingThanks.vue'
import BookingConfirmBooking from '@/components/BookingConfirmBooking.vue'
import PageFooter from '@/components/PageFooter.vue'
import store from '@/store'

export default Vue.extend({
  name: 'booking-thanks-page',
  components: { BookingThanks, BookingConfirmBooking, PageFooter },
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
