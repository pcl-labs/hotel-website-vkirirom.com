<template>
  <div>
    <div class="card-number" ref="cardNumber"></div>
    <div class="cvv-number" ref="cvvNumber"></div>
    <div class="zip-number" ref="zipNumber"></div>
    <div class="expire-number" ref="expireNumber"></div>
  </div>
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
  props: {
    billingDetails: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.cleanup()
    this.init()
  },
  methods: {
    cleanup() {
      store.dispatch('payment/updateIsPaymentLoading', false)
      store.dispatch('payment/updatePaymentError', '')
    },
    async init() {
      await this.getStripeKey()
      await this.createStripeComponent(this.stripeKey)
    },
    async submit() {
      store.dispatch('payment/updatePaymentError', '')
      store.dispatch('payment/updateIsPaymentLoading', true)
      try {
        await this.reserveRoom()
        await this.getClientSecret()
        await this.getReservationDetails()
        await this.purchase()
      } catch (error) {
        store.dispatch('payment/updatePaymentError', error.message)
        store.dispatch('payment/updateIsPaymentLoading', false)
      }
    },
    reserveRoom() {
      return store.dispatch('booking/reserveRoom', this.customBookingInfo)
    },
    async createStripeComponent(stripeKey) {
      // @ts-ignore
      this.stripe = window.Stripe(await stripeKey)
      // @ts-ignore
      const themes = this.$vuetify.theme.themes

      var elementStyles = {
        base: {
          color: themes.light.light,
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          fontFamily: 'Montserrat, Segoe UI, sans-serif',
          ':focus': {
            color: themes.light.light
          },
          '::placeholder': {
            color: themes.light.light
          }
        },
        invalid: {
          color: themes.light.error,
          iconColor: themes.light.error
        }
      }
      const elements = this.stripe.elements({
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css?family=Montserrat'
          }
        ],
        locale: 'auto'
      })
      // this.card = elements.create('card', { style: elementStyles })
      // this.card.mount(this.$refs.card)

      const elementClasses = {
        focus: 'focus',
        empty: 'empty',
        invalid: 'invalid'
      }

      var cardNumber = elements.create('cardNumber', {
        style: elementStyles,
        classes: elementClasses
      })
      cardNumber.mount(this.$refs.cardNumber)

      var cardExpiry = elements.create('cardExpiry', {
        style: elementStyles,
        classes: elementClasses
      })
      cardExpiry.mount(this.$refs.expireNumber)

      var cardCvc = elements.create('cardCvc', {
        style: elementStyles,
        classes: elementClasses
      })
      cardCvc.mount(this.$refs.cvvNumber)
    },
    purchase() {
      const that = this
      store.dispatch('payment/purchase', {
        stripe: this.stripe,
        clientSecret: this.clientSecret,
        card: this.card,
        billingDetails: this.billingDetails
      })
    },
    getStripeKey() {
      return store.dispatch('payment/getStripeKey')
    },
    getClientSecret() {
      return store.dispatch('payment/getClientSecret', { totalPrice: this.computedTotalPrice })
    },
    getReservationDetails() {
      return store.dispatch('booking/getReservationDetails', this.reservationId)
    }
  },
  computed: {
    stripeKey() {
      return store.getters['payment/stripeKey']
    },
    customBookingInfo() {
      return store.getters['booking/customBookingInfo']
    },
    clientSecret() {
      return store.getters['payment/clientSecret']
    },
    reservationId() {
      return store.getters['booking/reservationId']
    },
    computedTotalPrice() {
      return store.getters['booking/computedTotalPrice']({ all: true })
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
  border: 2px solid map-get($grey, 'lighten-1');
  border-radius: 3px;
  background-color: transparent;
  color: map-get($grey, 'lighten-1');
}
</style>
