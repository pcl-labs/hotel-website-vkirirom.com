<template>
  <!-- booking toolbar -->
  <v-toolbar-items class="toolbar--booking-nav">
    <v-btn
      :disabled="shouldBeDisabled(steps.reviewPolicies)"
      active-class="is-active"
      to="/booking/review-rules"
      class="text-transform-none light--text py-4"
      text
      >Review Rules</v-btn
    >
    <v-icon :disabled="shouldBeDisabled(steps.customerInfo)" color="light">keyboard_arrow_right</v-icon>
    <v-btn
      :disabled="shouldBeDisabled(steps.customerInfo)"
      active-class="is-active"
      to="/booking/customer-info"
      class="text-transform-none light--text py-4"
      text
      >Contact Info</v-btn
    >
    <v-icon :disabled="shouldBeDisabled(steps.paymentInfo)" color="light">keyboard_arrow_right</v-icon>
    <v-btn
      :disabled="shouldBeDisabled(steps.paymentInfo)"
      active-class="is-active"
      to="/booking/payment"
      class="text-transform-none light--text py-4"
      text
      >Payment</v-btn
    >
  </v-toolbar-items>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
export default Vue.extend({
  name: 'booking-navigation',
  methods: {
    shouldBeDisabled(step) {
      return step.id > this.currentStep.id
    }
  },
  computed: {
    currentStep() {
      return store.getters['booking/currentStep']
    },
    steps() {
      return store.getters['booking/steps']
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.toolbar--booking-nav {
  .v-btn:before {
    background: none;
  }
  ::v-deep .v-btn__content {
    padding-top: rem(3px);
    padding-bottom: rem(3px);
    border-bottom: 1px solid transparent;
  }
  .is-active::v-deep .v-btn__content {
    padding-bottom: rem(3px);
    border-bottom: 1px solid $primary;
  }
}
</style>
