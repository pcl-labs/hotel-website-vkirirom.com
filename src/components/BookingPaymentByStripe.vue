<template>
  <div ref="card"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
import { formatDate } from '../helpers'
// stripe setup example: https://github.com/stripe-samples/accept-a-card-payment/blob/master/without-webhooks/client/web/script.js

// console.log(formatDate("2019-12-28T20:30:00.000Z", 'YYYY-MM-DD'))

export default Vue.extend({
  name: 'booking-payment-by-stripe',
  data() {
    return {
      stripe: {} as any,
      card: {} as any
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.getStripeKey()
      await this.reserveRoom()
      await this.createStripeComponent(this.stripeKey)
      this.getClientSecret()
    },
    reserveRoom() {
      return store.dispatch('booking/reserveRoom', this.customBookingInfo)
    },
    async createStripeComponent(stripeKey) {
      // @ts-ignore
      this.stripe = window.Stripe(await stripeKey)
      // @ts-ignore
      const themes = this.$vuetify.theme.themes

      var style = {
        base: {
          color: themes.light.light,
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: themes.light.light
          }
        },
        invalid: {
          color: themes.light.error,
          iconColor: themes.light.error
        }
      }
      const elements = this.stripe.elements()
      this.card = elements.create('card', { style }).mount(this.$refs.card)
    },
    purchase() {
      this.stripe
        .confirmCardPayment(this.clientSecret, {
          payment_method: { card: this.card }
        })
        .then(function(result) {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message)
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
            }
          }
        })
    },
    getStripeKey() {
      return store.dispatch('booking/getStripeKey')
    },
    getClientSecret() {
      return store.dispatch('booking/getClientSecret')
    }
  },
  computed: {
    stripeKey() {
      return store.getters['booking/stripeKey']
    },
    customBookingInfo() {
      return store.getters['booking/customBookingInfo']
    },
    clientSecret() {
      return store.getters['booking/clientSecret']
    },
    computedTotalPrice() {
      return store.getters['booking/computedTotalPrice']()
    }
  }
})
</script>

<style lang="scss" scoped>
.StripeElement {
  height: 55px;
  padding-top: 18px;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 589px;
  width: 100%;
  border: 2px solid $light;
  border-radius: 3px;
  background-color: transparent;
  color: $light;
}
</style>
