import { CompanyService, ReservationService } from '@/connection/resources.js'
import { cloneDeep } from 'lodash-es'
import store from '@/store'

const defaultState = {
  stripeKey: '',
  reservationId: 0,
  clientSecret: '',
  reservationDetails: {},
  isPaymentLoading: false,
  paymentError: ''
}

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  mutations: {
    updateStripeKey(state, payload) {
      state.stripeKey = payload
    },
    updateClientSecret(state, payload) {
      state.clientSecret = payload
    },
    updateIsPaymentLoading(state, payload) {
      state.isPaymentLoading = payload
    },
    updatePaymentError(state, payload) {
      state.paymentError = payload
    }
  },
  actions: {
    updateIsPaymentLoading(context, payload) {
      context.commit('updateIsPaymentLoading', payload)
    },
    updatePaymentError(context, payload) {
      context.commit('updatePaymentError', payload)
    },
    getStripeKey(context) {
      return CompanyService.stripePublishableKey({
        companyId: 1
      }).then(res => {
        return context.commit('updateStripeKey', res.key)
      })
    },
    getClientSecret(context, { totalPrice }) {
      const reservationId = context.getters.reservationId
      return ReservationService.payReservation({
        reservationId,
        model: {
          amount: totalPrice
        }
      }).then(payReservation => {
        return context.commit('updateClientSecret', payReservation.clientSecret)
      })
    },
    purchase(context, { stripe, clientSecret, billingDetails, card }) {
      stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: billingDetails
          }
        })
        .then(function(result) {
          if (result.error) {
            console.log(result.error.message)
            store.dispatch('payment/updatePaymentError', result.error.message)
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              console.log('succeeded')
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
            }
          }
        })
        .finally(res => {
          console.log('finally')
          store.dispatch('payment/updateIsPaymentLoading', false)
        })
    }
  },
  getters: {
    stripeKey(state) {
      return state.stripeKey
    },
    clientSecret(state) {
      return state.clientSecret
    },
    paymentError(state) {
      return state.paymentError
    },
    isPaymentLoading(state) {
      return state.isPaymentLoading
    }
  }
}
