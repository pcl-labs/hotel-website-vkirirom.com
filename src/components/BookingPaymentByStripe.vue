<template>
  <div>
    <v-row no-gutters="">
      <v-col cols="12">
        <div class="card-number" ref="cardNumber"></div>
      </v-col>
    </v-row>
    <v-row class="mt-n05" no-gutters="">
      <v-col cols="6">
        <div class="expire-number" ref="expireNumber"></div>
      </v-col>
      <v-col cols="6">
        <div class="cvv-number ml-n05" ref="cvvNumber"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
import { formatDate } from '../helpers'
// stripe setup example: https://github.com/stripe-samples/accept-a-card-payment/blob/master/without-webhooks/client/web/script.js
// theme examples https://stripe.dev/elements-examples/

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
          color: themes.dark.light,
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          fontFamily: 'Montserrat, Segoe UI, sans-serif',
          ':focus': {
            color: themes.dark.light
          },
          '::placeholder': {
            color: themes.dark.light
          }
        },
        invalid: {
          color: themes.dark.error,
          iconColor: themes.dark.error
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
        classes: elementClasses,
        placeholder: 'Card number'
      })
      cardNumber.mount(this.$refs.cardNumber)

      var cardExpiry = elements.create('cardExpiry', {
        style: elementStyles,
        classes: elementClasses,
        placeholder: 'Expiration'
      })
      cardExpiry.mount(this.$refs.expireNumber)

      var cardCvc = elements.create('cardCvc', {
        style: elementStyles,
        classes: elementClasses,
        placeholder: 'CVV'
      })
      cardCvc.mount(this.$refs.cvvNumber)
    },
    purchase() {
      const that = this
      console.log('billingDetails', this.billingDetails)

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

<style lang="scss">
@import '@/styles/utility.scss';
</style>

<style lang="scss" scoped>
.StripeElement {
  height: rem(56px);
  padding-top: rem(18px);
  padding-left: rem(10px);
  padding-right: rem(10px);
  width: 100%;
  border: 1px solid map-get($grey, 'lighten-1');
  background-color: transparent;
  color: map-get($grey, 'lighten-1');
  &.card-number {
    border-radius: $border-radius-root $border-radius-root 0 0;
  }
  &.expire-number {
    border-radius: 0 0 0 $border-radius-root;
  }
  &.cvv-number {
    border-radius: 0 0 $border-radius-root 0;
  }
}
</style>
