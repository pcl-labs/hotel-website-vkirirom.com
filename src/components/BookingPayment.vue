<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-form v-model="isFormValid" @submit.prevent>
          <h4 class="mb-2 title font-weight-bold">Full name</h4>
          <v-text-field
            v-model="fullName"
            outlined
            label="E.g. Bill Shan"
            name="fullName"
            color="light"
            type="text"
            required
            :rules="rules.fullName"
            dark
          >
          </v-text-field>

          <h4 class="mb-2 title font-weight-bold">Pay with</h4>

          <v-radio-group dark v-model="payWith" class="ma-0 d-block">
            <v-card outlined color="transparent" class="mb-2" @click="payWith = 'cash'">
              <v-card-title>
                <v-radio color="green" label="Pay with cash" :value="'cash'" class="ma-0"></v-radio>
                <v-icon class="position-absolute payment--icon">$vuetify.icons.cash</v-icon>
              </v-card-title>
            </v-card>
            <v-card outlined color="transparent" class="mb-2" @click="payWith = 'card'">
              <v-card-title>
                <v-radio color="green" label="Pay with card" :value="'card'" class="ma-0"></v-radio>
                <v-icon class="position-absolute payment--icon">$vuetify.icons.creditCard</v-icon>
              </v-card-title>
            </v-card>
          </v-radio-group>

          <v-expand-transition>
            <div class="transition-fast-in-fast-out mb-6" v-show="payWith === 'card'">
              <h4 class="mb-2 title font-weight-bold">Billing Info</h4>

              <v-text-field
                v-model="addressLine"
                outlined
                label="Address"
                name="address"
                color="light"
                type="text"
                required
                :rules="rules.addressLine"
                dark
              >
              </v-text-field>
              <v-text-field
                v-model="addressCity"
                outlined
                label="City"
                name="city"
                color="light"
                type="text"
                required
                :rules="rules.addressCity"
                dark
              >
              </v-text-field>

              <v-row no-gutters="">
                <v-col cols="6">
                  <v-text-field
                    class="radius-right-0"
                    v-model="addressState"
                    outlined
                    label="State"
                    name="state"
                    color="light"
                    type="text"
                    required
                    :rules="rules.addressState"
                    dark
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    class="radius-left-0 ml-n05"
                    v-model="addressZip"
                    outlined
                    label="Zip"
                    name="zip"
                    color="light"
                    type="text"
                    required
                    :rules="rules.addressZip"
                    dark
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <h4 class="mb-2 title font-weight-bold">Card Info</h4>

              <booking-payment-by-stripe
                @success="onPaymentSuccess"
                @error="onPaymentError"
                ref="paymentByStripe"
                :billingDetails="{
                  name: fullName,
                  address_line1: addressLine,
                  address_city: addressCity,
                  address_state: addressState,
                  address_zip: addressZip
                }"
              ></booking-payment-by-stripe>
            </div>
          </v-expand-transition>

          <h4 class="mb-2 title font-weight-bold">Cancelation Policy</h4>
          <v-row no-gutters class="mb-6">
            <v-col cols="12">
              No cancellation fee if cancelling at least 24 hours in advance of check-in date. 50% charge of total stay
              if cancelling within 24 hours. Applicable to individual (non-group) customers.
            </v-col>
          </v-row>

          <v-row no-gutters="">
            <v-col>
              <p v-if="paymentError" class="error--text">{{ paymentError }}</p>
            </v-col>
          </v-row>

          <v-btn
            @click="submit"
            x-large
            color="primary"
            dark
            class="text-transform-none font-weight-bold dark--text"
            :disabled="!isFormValid"
            :loading="isPaymentLoading"
            type="submit"
          >
            <v-spacer></v-spacer>
            <span class="mr-3">Confirm Payment</span>
            <v-spacer></v-spacer>
            <v-icon class="dark--text">keyboard_arrow_right</v-icon>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isNumeric } from 'validator'
import store from '../store'
import BookingPaymentByStripe from '@/components/BookingPaymentByStripe.vue'

export default Vue.extend({
  name: 'booking-payment',
  components: { BookingPaymentByStripe },
  data() {
    return {
      isFormValid: false,
      errorMessage: '',
      rules: {
        fullName: [v => !!v || 'Full name is required'],
        addressLine: [v => !!v || 'Address is required'],
        addressCity: [v => !!v || 'City is required'],
        addressState: [v => !!v || 'State is required'],
        addressZip: [v => !!v || 'Zip number is required', v => isNumeric(v) || 'Zip code is not valid']
      }
    }
  },
  computed: {
    payWith: {
      get() {
        return store.getters['booking/bookingInfo'].payWith
      },
      set(value: string) {
        store.dispatch('booking/updatePayWith', value)
      }
    },
    fullName: {
      get() {
        return store.getters['booking/bookingInfo'].fullName
      },
      set(value: string) {
        store.dispatch('booking/updateFullName', value)
      }
    },
    addressCity: {
      get() {
        return store.getters['booking/bookingInfo'].addressCity
      },
      set(value: string) {
        store.dispatch('booking/updateAddressCity', value)
      }
    },
    addressState: {
      get() {
        return store.getters['booking/bookingInfo'].addressState
      },
      set(value: string) {
        store.dispatch('booking/updateAddressState', value)
      }
    },
    addressLine: {
      get() {
        return store.getters['booking/bookingInfo'].addressLine
      },
      set(value: string) {
        store.dispatch('booking/updateAddressLine', value)
      }
    },
    addressZip: {
      get() {
        return store.getters['booking/bookingInfo'].addressZip
      },
      set(value: string) {
        store.dispatch('booking/updateAddressZip', value)
      }
    },
    paymentError() {
      return store.getters['payment/paymentError']
    },
    isPaymentLoading() {
      return store.getters['payment/isPaymentLoading']
    }
  },
  methods: {
    focusPhone() {
      // @ts-ignore
      this.$refs.phoneNumber.focus()
    },
    submit() {
      if (this.payWith === 'cash') {
        this.payWithCash()
      } else if (this.payWithCard) {
        this.payWithCard()
      }
    },
    payWithCash() {
      store.dispatch('payment/updateIsPaymentLoading', true)
      store.dispatch('booking/sendEmailNotification').finally(() => {
        store.dispatch('payment/updateIsPaymentLoading', false)
      })
    },
    payWithCard() {
      // @ts-ignore
      this.$refs.paymentByStripe.submit()
    },
    onPaymentSuccess(result) {
      this.$router.push({ name: 'booking-thanks' })
    },
    onPaymentError(result) {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.theme--dark.v-card.v-card--outlined {
  border-color: map-get($grey, 'lighten-1') !important;
}
::v-deep {
  .theme--dark.v-icon {
    color: map-get($grey, 'lighten-1');
  }
  .confirm-payment--card-number {
    &:not(.error--text) {
      .v-text-field__details {
        display: none;
      }
    }
  }
  .confirm-payment--row2 {
    margin-top: rem(8px);
  }
  .payment--icon {
    width: rem(32px);
    height: rem(32px);
    right: rem(16px);
  }
}
</style>
