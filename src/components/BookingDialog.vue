<template>
  <fragment>
    <!-- we load the activator (e.g. "book now" button) here -->
    <slot name="default" />

    <v-dialog
      dark
      persistent
      v-model="isDialogOpen"
      :width="currentStep.width"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      transition="dialog-bottom-transition"
    >
      <booking-confirm-dates
        v-if="currentStep.id === steps.confirmDates.id"
        @booking-close="onClose"
        :next-step="isAuthenticated ? steps.confirmGuests : steps.auth"
      ></booking-confirm-dates>

      <booking-auth
        v-if="currentStep.id === steps.auth.id"
        @booking-close="onClose"
        :next-step="steps.confirmGuests"
      ></booking-auth>

      <booking-confirm-guests
        v-if="currentStep.id === steps.confirmGuests.id"
        @booking-close="onClose"
        :next-step="steps.confirmBooking"
      ></booking-confirm-guests>
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
import BookingConfirmDates from '@/components/BookingConfirmDates.vue'
import BookingAuth from '@/components/BookingAuth.vue'
import BookingConfirmGuests from '@/components/BookingConfirmGuests.vue'

export default Vue.extend({
  name: 'booking-dialog',
  components: { BookingConfirmDates, BookingAuth, BookingConfirmGuests },
  watch: {
    currentStep(newVal, oldValue) {
      this.isDialogOpen = newVal.id > 0
      this.setDocumentClasses()
    }
  },
  computed: {
    dialog() {
      return store.getters['booking/dialog']
    },
    isDialogOpen: {
      get() {
        return store.getters['booking/dialog'].isOpen
      },
      set(value: boolean) {
        store.dispatch('booking/updateDialog', {
          isOpen: value
        })
      }
    },
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
    // NOTE: can be used outside of component by ref
    openDialog() {

      store.dispatch('booking/updateCurrentStep', this.steps.confirmDates)
      store.dispatch('booking/updateDialog', {
        isOpen: true
      })
    },
    closeDialog() {
      store.dispatch('booking/updateDialog', {
        isOpen: false
      })
    },
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
