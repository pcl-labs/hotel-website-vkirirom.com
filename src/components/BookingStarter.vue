<template>
  <fragment>
    <slot name="default" />

    <v-dialog
      persistent
      v-model="isDialogOpen"
      width="332"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :hide-overlay="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <booking-confirm-dates
        @booking-close="onClose"
        v-if="currentStep === 1"
        :next-step="isAuthenticated ? 3 : 2"
      ></booking-confirm-dates>
    </v-dialog>

    <!-- <auth-login></auth-login>
    <auth-register></auth-register>
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
      isDialogOpen: false
    }
  },
  watch: {
    currentStep(newVal, oldValue) {
      this.isDialogOpen = newVal > 0
      if (this.isDialogOpen) {
        document.documentElement.classList.add(
          'overflow-y-hidden',
          'dialog--is-open'
        )
      } else {
        document.documentElement.classList.remove(
          'overflow-y-hidden',
          'dialog--is-open'
        )
      }
    }
  },
  computed: {
    currentStep(): number {
      return store.getters['booking/currentStep']
    },
    isAuthenticated(): boolean {
      return this.$store.getters['auth/isAuthenticated']
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
.dialog--is-open {
  .v-overlay--active ~ .v-application--wrap {
    filter: blur(8px);
  }
  .v-overlay__scrim {
    background-color: rgba(black, 0.4) !important;
  }
}
</style>
