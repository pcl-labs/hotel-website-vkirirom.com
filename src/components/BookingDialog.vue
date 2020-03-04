<template>
  <fragment>
    <v-dialog
      dark
      v-model="isDialogOpen"
      :width="376"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      transition="dialog-bottom-transition"
    >
      <booking-confirm-dates
        v-if="currentStep.id === steps.confirmDates.id"
        @booking-cancel="cancelBooking"
        :next-step="steps.confirmGuests"
      ></booking-confirm-dates>

      <booking-confirm-guests
        v-if="currentStep.id === steps.confirmGuests.id"
        @booking-cancel="cancelBooking"
        :next-step="steps.confirmBooking"
      ></booking-confirm-guests>

      <booking-confirm-booking
        v-if="currentStep.id === steps.confirmBooking.id"
        :has-confirm-button="true"
        :has-cancel-button="true"
        @booking-submit="submitBooking"
        @booking-cancel="cancelBooking"
      ></booking-confirm-booking>
    </v-dialog>

    <!-- 
    <booking-review-rules></booking-review-rules>
    <booking-customer-info></booking-customer-info>
    <booking-payment-info></booking-payment-info>
    <booking-thank-you></booking-thank-you> -->
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { bookingStep } from '../types';
import { setOrUpdateUrlHashParameter } from '../helpers';
const BookingConfirmDates = () => import('@/components/BookingConfirmDates.vue');
const BookingConfirmGuests = () => import('@/components/BookingConfirmGuests.vue');
const BookingConfirmBooking = () => import('@/components/BookingConfirmBooking.vue');

export default Vue.extend({
  name: 'booking-dialog',
  components: {
    BookingConfirmDates,
    BookingConfirmGuests,
    BookingConfirmBooking
  },
  watch: {
    currentStep: {
      handler(step) {
        setOrUpdateUrlHashParameter('step', step.urlHash);
        step.id > this.steps.notStarted.id && this.scrollViewToTop();
      }
    }
  },
  computed: {
    isDialogOpen: {
      get() {
        return (this as any).$store.getters['booking/dialog'].isOpen;
      },
      set(isOpen) {
        this.updateDialog(isOpen);
      }
    },
    currentStep(): number {
      return (this as any).$store.getters['booking/currentStep'];
    },
    steps() {
      return (this as any).$store.getters['booking/steps'];
    }
  },
  methods: {
    scrollViewToTop() {
      this.$nextTick(() => {
        const dialogElement = document.querySelector('.v-dialog--active') as Element;
        dialogElement.scrollTo(0, 0);
      });
    },
    submitBooking() {
      this.updateDialog(false);
      this.$router.push({ name: 'booking-review-rules' });
    },
    cancelBooking() {
      this.updateDialog(false);
      this.$store.dispatch('booking/cancelBooking');
    },
    updateDialog(isOpen) {
      this.$store.dispatch('booking/updateDialog', { isOpen });
    }
  }
});
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
