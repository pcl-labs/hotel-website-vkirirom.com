<template>
  <div>
    <v-row no-gutters class="mb-8">
      <v-col>
        <v-form v-model="isFormValid" @submit.prevent>
          <h1
            class="my-6 font-weight-bold"
            :class="{ 'display-1': $vuetify.breakpoint.smAndDown, 'display-2': $vuetify.breakpoint.mdAndUp }"
          >
            Payment
          </h1>

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
            <div class="transition-fast-in-fast-out" v-if="payWith === 'card'">
              <h4 class="mb-2 title font-weight-bold">Card info</h4>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    class="confirm-payment--card-number"
                    v-model="cardNumber"
                    outlined
                    label="Card number"
                    name="cardNumber"
                    color="light"
                    type="text"
                    required
                    v-mask="'#### #### #### #######'"
                    masked
                    :rules="rules.cardNumber"
                    dark
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense class="confirm-payment--row2">
                <v-col cols="6" class="pt-0">
                  <v-text-field
                    v-model="expiration"
                    outlined
                    label="Expiration"
                    name="expiration"
                    color="light"
                    type="text"
                    required
                    hint="e.g. 2020 / 20"
                    v-mask="'#### / ##'"
                    :rules="rules.expiration"
                    dark
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pt-0">
                  <v-text-field
                    v-model="CVV"
                    outlined
                    label="CVV"
                    name="CVV"
                    color="light"
                    type="text"
                    required
                    v-mask="'####'"
                    :rules="rules.CVV"
                    dark
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>

          <h4 class="mb-2 title font-weight-bold">Cancelation Policy</h4>
          <v-row no-gutters class="mb-6">
            <v-col cols="12">
              No cancellation fee if cancelling at least 24 hours in advance of check-in date. 50% charge of total stay
              if cancelling within 24 hours. Applicable to individual (non-group) customers.
            </v-col>
          </v-row>

          <v-btn
            @click="submit"
            x-large
            color="primary"
            dark
            class="text-transform-none font-weight-bold dark--text"
            :disabled="!isFormValid"
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
import { mask } from 'vue-the-mask'
import { isNumber } from 'lodash-es'
import store from '../store'
import { isCreditCard } from 'validator'

export default Vue.extend({
  name: 'booking-payment',
  directives: { mask },
  data() {
    return {
      isFormValid: false,
      rules: {
        fullName: [v => !!v || 'Full name is required'],
        // validatin of credit card https://www.creditcardrush.com/credit-card-validator/
        cardNumber: [v => !!v || 'Card number is required', v => isCreditCard(v) || 'Card number should be valid'],
        expiration: [
          v => !!v || 'Expiration date is required',
          v => /^\d{4} \/ \d{1,2}$/.test(v) || 'Date should be like 2020 / 12'
        ],
        CVV: [v => !!v || 'CVV is required', v => /^[0-9]{3,4}$/.test(v) || 'CVV should be valid']
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
    cardNumber: {
      get() {
        return store.getters['booking/bookingInfo'].cardNumber
      },
      set(value: string) {
        store.dispatch('booking/updateCardNumber', value)
      }
    },
    expiration: {
      get() {
        return store.getters['booking/bookingInfo'].expiration
      },
      set(value: string) {
        store.dispatch('booking/updateExpiration', value)
      }
    },
    CVV: {
      get() {
        return store.getters['booking/bookingInfo'].CVV
      },
      set(value: string) {
        store.dispatch('booking/updateCVV', value)
      }
    }
  },
  methods: {
    focusPhone() {
      // @ts-ignore
      this.$refs.phoneNumber.focus()
    },
    submit() {
      this.$router.push({ name: 'booking-thanks' })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.theme--dark.v-card.v-card--outlined {
  border-color: $light !important;
}
::v-deep {
  .theme--dark.v-icon {
    color: $light;
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
