<template>
  <div ref="card"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
import { formatDate } from '../helpers'
// stripe setup example: https://github.com/stripe-samples/accept-a-card-payment/blob/master/without-webhooks/client/web/script.js

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
      await this.createStripeComponent(this.stripeKey)
    },
    async submit() {
      await this.reserveRoom()
      await this.getClientSecret()
      await this.getReservationDetails()
      await this.purchase()
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
      this.card = elements.create('card', { style })
      this.card.mount(this.$refs.card)
    },
    purchase() {
      const that = this
      this.stripe
        .confirmCardPayment(this.clientSecret, {
          payment_method: { card: this.card }
        })
        .then(function(result) {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message)
            that.$emit('error', result)
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              console.log('succeeded')
              that.$emit('success', result)

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
    },
    getReservationDetails() {
      return store.dispatch('booking/getReservationDetails', this.reservationId)
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
    },
    reservationId() {
      return store.getters['booking/reservationId']
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
