<template>
  <div ref="card"></div>
</template>

<script lang="ts">
import Vue from 'vue'
const Stripe = (window as any).Stripe

export default Vue.extend({
  name: 'booking-payment-by-stripe',
  data() {
    return {
      stripe: {},
      card: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getStripeKey()
      await this.createStripeComponent(this.stripeKey)
      this.getClientSecret()
    },
    async createStripeComponent(stripeKey) {
      this.stripe = Stripe(await stripeKey)
      const themes = (this as any).$vuetify.theme.themes

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
      const elements = (this.stripe as any).elements()
      this.card = elements.create('card', { style })
      ;(this.card as any).mount(this.$refs.card)
    },
    purchase() {
      ;(this.stripe as any)
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
      return this.$store.dispatch('booking/getStripeKey')
    },
    getClientSecret() {
      return this.$store.dispatch('booking/getClientSecret')
    }
  },
  computed: {
    stripeKey() {
      return this.$store.getters['booking/stripeKey']
    },
    clientSecret() {
      return this.$store.getters['booking/clientSecret']
    },
    computedTotalPrice() {
      return this.$store.getters['booking/computedTotalPrice']()
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
