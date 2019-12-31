<template>
  <!-- booking toolbar -->
  <v-toolbar-items class="toolbar--booking-nav">
    <v-btn active-class="is-active" to="/booking/review-rules" class="text-transform-none light--text py-4" text
      >Review Rules</v-btn
    >
    <v-icon color="light">keyboard_arrow_right</v-icon>
    <v-btn active-class="is-active" to="/booking/customer-info" class="text-transform-none light--text py-4" text
      >Customer Info</v-btn
    >
    <v-icon color="light">keyboard_arrow_right</v-icon>
    <v-btn active-class="is-active" to="/booking/payment" class="text-transform-none light--text py-4" text
      >Payment</v-btn
    >
  </v-toolbar-items>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
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
