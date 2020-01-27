<template>
  <!-- booking toolbar -->
  <v-toolbar-items v-if="desktopMode" class="toolbar--booking-nav">
    <v-btn
      :disabled="shouldBeDisabled(steps.reviewPolicies)"
      active-class="is-active"
      to="/booking/review-rules"
      class="text-transform-none light--text py-4 title font-weight-medium"
      text
      >{{ steps.reviewPolicies.title }}</v-btn
    >
    <v-icon :disabled="shouldBeDisabled(steps.customerInfo)" color="light">keyboard_arrow_right</v-icon>
    <v-btn
      :disabled="shouldBeDisabled(steps.customerInfo)"
      active-class="is-active"
      to="/booking/customer-info"
      class="text-transform-none light--text py-4 title font-weight-medium"
      text
      >{{ steps.customerInfo.title }}</v-btn
    >
    <v-icon :disabled="shouldBeDisabled(steps.paymentInfo)" color="light">keyboard_arrow_right</v-icon>
    <v-btn
      :disabled="shouldBeDisabled(steps.paymentInfo)"
      active-class="is-active"
      to="/booking/payment"
      class="text-transform-none light--text py-4 title font-weight-medium"
      text
      >{{ steps.paymentInfo.title }}</v-btn
    >
  </v-toolbar-items>

  <div v-else class="booking-navigation--mobile d-flex justify-center align-center text-center">
    <div class="d-inline-flex flex-column mx-auto">
      <p class="booking-navigation--title-mobile mb-1 title font-weight-medium light--text">{{ currentStep.title }}</p>
      <div class="d-flex mx-auto">
        <div
          :class="{ active: shouldBeActive(steps.reviewPolicies) }"
          class="booking-navigation--bar bar-1 mr-2 pt-1"
        ></div>
        <div
          :class="{ active: shouldBeActive(steps.customerInfo) }"
          class="booking-navigation--bar bar-2 mr-2 pt-1"
        ></div>
        <div :class="{ active: shouldBeActive(steps.paymentInfo) }" class="booking-navigation--bar bar-3 pt-1"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
export default Vue.extend({
  name: 'booking-navigation',
  props: {
    desktopMode: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    shouldBeDisabled(step) {
      return step.id > this.currentStep.id
    },
    shouldBeActive(step) {
      return step.id === this.currentStep.id
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
.booking-navigation--title-mobile {
  line-height: rem(16px);
}
.booking-navigation--bar {
  border-bottom: 2px solid map-get($grey, 'lighten-1');
  width: rem(32px);
  &.active {
    border-color: $primary;
  }
}
</style>
