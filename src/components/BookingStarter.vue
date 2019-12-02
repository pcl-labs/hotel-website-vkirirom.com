<template>
  <fragment>
    <slot name="default" />
      <!-- <booking-confirm-dates></booking-confirm-dates>
      <auth-login></auth-login>
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

export default Vue.extend({
  name: 'booking-starter',
  methods: {
    start() {
      console.log('start booking flow...')
    }
  }
})
</script>

<style lang="scss" scoped>
//
</style>
