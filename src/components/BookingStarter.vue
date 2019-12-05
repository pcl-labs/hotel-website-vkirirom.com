<template>
  <fragment>
    <slot name="default" />

    <v-dialog
      persistent
      v-model="isDialogOpen"
      :width="currentStep.width"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :hide-overlay="$vuetify.breakpoint.xsOnly"
      transition="dialog-bottom-transition"
    >
      <booking-confirm-dates
        @booking-close="onClose"
        v-if="currentStep.id === steps.confirmDates.id"
        :next-step="isAuthenticated ? steps.confirmGuests : steps.auth"
      ></booking-confirm-dates>

      <booking-auth
        @booking-close="onClose"
        v-if="currentStep.id === steps.auth.id"
        :next-step="steps.confirmGuests"
      ></booking-auth>
    </v-dialog>

    <!-- 
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
const BookingAuth = () => import('@/components/BookingAuth.vue')

export default Vue.extend({
  name: 'booking-starter',
  components: { BookingConfirmDates, BookingAuth },
  data() {
    return {
      isDialogOpen: false
    }
  },
  mounted() {
    this.resetComponentState()
  },
  watch: {
    currentStep(newVal, oldValue) {
      this.isDialogOpen = newVal.id > 0
      this.setDocumentClasses()
    }
  },
  computed: {
    currentStep(): number {
      return store.getters['booking/currentStep']
    },
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    },
    steps() {
      return store.getters['booking/steps']
    }
  },
  methods: {
    onClose() {
      store.dispatch('booking/updateCurrentStep', this.steps.notStarted)
    },
    setDocumentClasses() {
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
    },
    // this is for development purposes only, related to HMR
    resetComponentState() {
      this.isDialogOpen = true
      store.dispatch('booking/updateCurrentStep', this.steps.auth)
      this.setDocumentClasses()
      // FIXME:
      // this.isDialogOpen = false
      // store.dispatch('booking/updateCurrentStep', steps.notStarted)
      // this.setDocumentClasses()
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
