import { CompanyService, ReservationService } from '@/connection/resources.js';
import { cloneDeep } from 'lodash-es';
import { InternalMessagePassing } from '@/types';
import { companyId } from '@/constants/app';

const defaultState = {
  stripeKey: '',
  accountId: '',
  clientSecret: '',
  reservationDetails: {},
  isPaymentLoading: false,
  paymentError: ''
};

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
  mutations: {
    updateStripeKey(state, payload) {
      state.stripeKey = payload;
    },
    updateStripeAccountId(state, payload) {
      state.accountId = payload;
    },
    updateClientSecret(state, payload) {
      state.clientSecret = payload;
    },
    updateIsPaymentLoading(state, payload) {
      state.isPaymentLoading = payload;
    },
    updatePaymentError(state, payload) {
      state.paymentError = payload;
    }
  },
  actions: {
    updateIsPaymentLoading(context, payload) {
      context.commit('updateIsPaymentLoading', payload);
    },
    updatePaymentError(context, payload) {
      context.commit('updatePaymentError', payload);
    },
    async getStripeKey(context) {
      try {
        const result = await CompanyService.stripePublishableKey({
          companyId
        });
        context.commit('updateStripeKey', result.key);
        context.commit('updateStripeAccountId', result.accountId);
      } catch (error) {
        throw new Error('A problem occured on getting ready for payment, please contact us.');
      }
    },
    async getClientSecret(context, { amount, reservationId, metadata = {} }) {
      try {
        const { clientSecret } = await ReservationService.payReservation({
          reservationId,
          model: {
            amount,
            metadata
          }
        });
        context.commit('updateClientSecret', clientSecret);
      } catch (error) {
        throw new Error('A problem occured on getting ready for payment! please contact us.');
      }
    },
    async payByStripe(context, { stripe, clientSecret, card }) {
      let result;
      try {
        result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card
          }
        });
        if (result.error) {
          throw new Error(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            const result: InternalMessagePassing = { error: false, message: 'Payment was successful' };
            return result;
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          } else {
            throw new Error('Unknown error in Stripe payment response');
          }
        }
      } catch (error) {
        throw new Error(error.message || 'Error on connecting to Stripe payment');
      }
    }
  },
  getters: {
    stripeKey(state) {
      return state.stripeKey;
    },
    accountId(state) {
      return state.accountId;
    },
    clientSecret(state) {
      return state.clientSecret;
    },
    paymentError(state) {
      return state.paymentError;
    },
    isPaymentLoading(state) {
      return state.isPaymentLoading;
    }
  }
};
