<template>
  <fragment>
    <slot name="default" />

    <v-dialog @click:outside="onClose" v-model="isModalOpen" width="500">
      <v-card>
        <booking-confirm-dates v-if="currentStep === 1"></booking-confirm-dates>
      </v-card>
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
import BookingConfirmDates from '@/components/BookingConfirmDates.vue'

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
//
</style>
