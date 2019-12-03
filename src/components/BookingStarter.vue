<template>
  <fragment>
    <slot name="default" />

    <v-dialog persistent v-model="isModalOpen" width="316">
      <v-card tile :elevation="0">
        <v-toolbar dense flat dark color="dark">
          <v-btn class="ma-0" small icon dark depressed @click="onClose">
            <v-icon color="gray-82">close</v-icon>
          </v-btn>
          <v-toolbar-title class="light--text pl-0 ml-n4">Choose Dates</v-toolbar-title>
        </v-toolbar>
      </v-card>

      <booking-confirm-dates v-if="currentStep === 1"></booking-confirm-dates>
    </v-dialog>

    <!-- <auth-login></auth-login>
    <auto-register></auto-register>
    <booking-confirm-guests></booking-confirm-guests>
    <booking-confirm-booking></booking-confirm-booking>
    <booking-review-policies></booking-review-policies>
    <booking-customer-info></booking-customer-info>
    <booking-payment-info></booking-payment-info>
    <booking-thank-you></booking-thank-you> -->
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
const BookingConfirmDates = () => import('@/components/BookingConfirmDates.vue')

export default Vue.extend({
  name: 'booking-starter',
  components: { BookingConfirmDates },
  data() {
    return {
      isModalOpen: false
    }
  },
  watch: {
    currentStep(newVal) {
      this.isModalOpen = newVal > 0
    }
  },
  computed: {
    currentStep() {
      return store.getters['booking/currentStep']
    }
  },
  methods: {
    onClose() {
      store.dispatch('booking/updateCurrentStep', 0)
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep {
  .v-dialog {
    border-radius: 0;
  }
  .v-toolbar__title {
    width: calc(100% - #{rem(28px)});
  }
}
</style>

<style lang="scss">
// global
.v-overlay--active ~ .v-application--wrap {
  filter: blur(8px);
}
.v-overlay__scrim {
  background-color: rgba(black, 0.4) !important;
}
</style>
