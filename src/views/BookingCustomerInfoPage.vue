<template>
  <booking-customer-info></booking-customer-info>
</template>

<script lang="ts">
import Vue from 'vue'
import BookingCustomerInfo from '@/components/BookingCustomerInfo.vue'
export default Vue.extend({
  name: 'booking-customer-info-page',
  components: { BookingCustomerInfo }
})
</script>

<style lang="scss" scoped>
//
</style>
