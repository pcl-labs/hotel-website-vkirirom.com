<template>
  <fragment>
    <v-dialog
      dark
      persistent
      v-if="tempFix"
      v-model="isDialogOpen"
      :width="376"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      transition="dialog-bottom-transition"
    >
      <booking-confirm-dates
        v-if="currentStep.id === steps.confirmDates.id"
        @booking-close="closeDialog"
        @booking-cancel="cancelBooking"
        :next-step="isAuthenticated ? steps.confirmGuests : steps.auth"
      ></booking-confirm-dates>

      <booking-auth
        v-if="currentStep.id === steps.auth.id"
        @booking-close="closeDialog"
        @booking-cancel="cancelBooking"
        :next-step="steps.confirmGuests"
      ></booking-auth>

      <booking-confirm-guests
        v-if="currentStep.id === steps.confirmGuests.id"
        @booking-close="closeDialog"
        @booking-cancel="cancelBooking"
        :next-step="steps.confirmBooking"
      ></booking-confirm-guests>

      <booking-confirm-booking
        v-if="currentStep.id === steps.confirmBooking.id"
        :has-confirm-button="true"
        @booking-close="closeDialog"
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
const BookingConfirmDates = () => import('@/components/BookingConfirmDates.vue');
const BookingAuth = () => import('@/components/BookingAuth.vue');
const BookingConfirmGuests = () => import('@/components/BookingConfirmGuests.vue');
const BookingConfirmBooking = () => import('@/components/BookingConfirmBooking.vue');

export default Vue.extend({
  name: 'booking-dialog',
  components: {
    BookingConfirmDates,
    BookingAuth,
    BookingConfirmGuests,
    BookingConfirmBooking
  },
  props: {
    // item is resort
    item: {
      required: true
    }
  },
  data() {
    return {
      tempFix: false
    };
  },
  mounted() {
    // @ts-ignore
    this.patchFocusError();
  },
  computed: {
    dialog() {
      return (this as any).$store.getters['booking/dialog'];
    },
    isDialogOpen: {
      get() {
        const isOpen = (this as any).$store.getters['booking/dialog'].isOpen;
        return isOpen;
      },
      set(value: boolean) {
        (this as any).$store.dispatch('booking/updateDialog', {
          isOpen: value
        });
      }
    },
    currentStep(): number {
      return (this as any).$store.getters['booking/currentStep'];
    },
    isAuthenticated(): boolean {
      return (this as any).$store.getters['auth/isAuthenticated'];
    },
    steps() {
      return (this as any).$store.getters['booking/steps'];
    }
  },
  methods: {
    patchFocusError() {
      this.$nextTick(() => {
        // @ts-ignore
        this.tempFix = true;
      });
    },
    // NOTE: can be used outside of component by ref
    openDialog() {
      // TODO: Refactor
      // @ts-ignore
      (this as any).$store.dispatch('booking/startBooking', {
        resort: (this as any).item,
        returnUrl: `/listing/${this.$route.params.id}`
      });
      (this as any).$store.dispatch('booking/updateDialog', {
        isOpen: true
      });
    },
    closeDialog() {
      (this as any).$store.dispatch('booking/updateDialog', {
        isOpen: false
      });
    },
    cancelBooking() {
      (this as any).$store.dispatch('booking/cancelBooking');
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
