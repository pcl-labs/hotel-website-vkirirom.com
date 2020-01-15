<template>
  <div class="page light--text">
    <div class="page-content brand-gradient">
      <v-container class="pa-0" v-if="$vuetify.breakpoint.smAndDown">
        <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
        <v-container class="brand-gradient">
          <booking-customer-info @open-shuttle-bus-info="openShuttleBusInfo"></booking-customer-info>
        </v-container>
      </v-container>
      <v-container v-else class="is-limited px-2 px-md-0 py-8">
        <v-row no-gutters>
          <v-col class="px-md-3" cols="12" md="8">
            <div class="mx-6">
              <booking-customer-info @open-shuttle-bus-info="openShuttleBusInfo"></booking-customer-info>
            </div>
          </v-col>
          <v-col class="pb-0" cols="12" md="4">
            <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
          </v-col>
        </v-row>
      </v-container>

      <resort-description-dialog ref="resortDescriptionRef" slug="Shuttle-Bus"></resort-description-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BookingCustomerInfo from '@/components/BookingCustomerInfo.vue'
import BookingConfirmBooking from '@/components/BookingConfirmBooking.vue'
import ResortDescriptionDialog from '@/components/ResortDescriptionDialog.vue'
import store from '@/store'

export default Vue.extend({
  name: 'booking-customer-info-page',
  components: { BookingCustomerInfo, BookingConfirmBooking, ResortDescriptionDialog },
  computed: {
    returnUrl() {
      return store.getters['booking/bookingInfo'].returnUrl
    }
  },
  methods: {
    openShuttleBusInfo() {
      // @ts-ignore
      this.$refs.resortDescriptionRef.openDialog()
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
