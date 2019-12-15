<template>
<!-- TODO: move to views/ -->
  <v-container class="is-limited">
    <v-row no-gutters style="min-height:100vh;">
      <v-flex xs12 md7 class="text">
        <v-row no-gutters>
          <v-flex xs12>
            <h1>Confirm and pay</h1>
          </v-flex>
          <v-flex xs12 style="margin-bottom:10px;">
            <h3>Pay with credit or debit card</h3>
          </v-flex>
          <!-- <v-flex xs12>
            <v-text-field
              v-model="name"
              outlined
              label="Full Name"
              name="name"
              color="#B9BCC1"
              required
              dark
              :rules="nameRules"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              outlined
              v-model="phone"
              label="Phone number"
              name="Phone"
              type="tel"
              color="#B9BCC1"
              required
              dark
              :rules="phoneRules"
            >
            </v-text-field>
          </v-flex> -->
          <v-flex xs12>
            <div ref="card"></div>
          </v-flex>
          <v-flex xs12>
            <h3>Cancellation policy</h3>
            <p>
              No cancellation fee if cancelling at least 24 hours in advance of
              check-in date. 50% charge of total stay if cancelling within 24
              hours. Applicable to individual (non-group) customers.
            </p>
          </v-flex>
          <v-flex xs12>
            <v-btn
              x-large
              class="button text-capitalize"
              color="#F7B947"
              v-on:click="purchase"
            >
              Pay ${{ finalPrice }} & book
            </v-btn>
          </v-flex>
        </v-row>
      </v-flex>
      <v-flex xs12 md5 class="bookingCard">
        <BookingInfoCard></BookingInfoCard>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import { debounce } from 'lodash-es'
const TEXTFIELDS_DEBOUNCE_TIME = 200
const BookingInfoCard = () =>
  import('@/components/Reservation/BookingInfoCard.vue')

export default {
  components: {
    BookingInfoCard
  },
  data() {
    return {
      nameRules: [v => !!v || 'Name is required'],
      phoneRules: [
        v => !!v || 'Phone no. is required',
        v => (v || '').length <= 13 || 'A maximum of 13 characters is allowed',
        v => (v || '').length >= 9 || 'A minimum of 9 characters is needed',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ]
    }
  },
  created() {
    this.getStripeKey(), this.getClientSecret()
  },
  mounted() {
    this.createStripeComponent(this.stripeKey)
  },
  methods: {
    async createStripeComponent(stripeKey) {
      let stripe = Stripe(await stripeKey),
        elements = stripe.elements(),
        card = undefined

      var style = {
        base: {
          color: '#B9BCC1',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#B9BCC1'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }

      card = elements.create('card', { style: style })
      card.mount(this.$refs.card)
    },
    purchase() {
      stripe
        .confirmCardPayment(this.clientSecret, {
          payment_method: { card: card }
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
    finalPrice() {
      return this.$store.getters['booking/finalPrice']
    },
    phone: {
      get() {
        return this.$store.getters['reservation/phone']
      },
      set: debounce(function(value) {
        this.$store.commit('reservation/updatePhone', value)
      }, TEXTFIELDS_DEBOUNCE_TIME)
    },
    name: {
      get() {
        return this.$store.getters['reservation/name']
      },
      set: debounce(function(value) {
        this.$store.commit('reservation/updateName', value)
      }, TEXTFIELDS_DEBOUNCE_TIME)
    }
  }
}
</script>
<style scoped lang="scss">
.v-input__slot {
  margin: 0px;
  height: 55px;
  margin-bottom: 20px;
}
.StripeElement {
  height: 55px;
  padding-top: 18px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 28px;
  max-width: 589px;
  width: 100%;
  border: 2px solid #b9bcc1;
  border-radius: 3px;
  background-color: transparent;
  color: #b9bcc1;
}
.button {
  max-width: 370px;
  width: 100%;
  height: 55px;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  border-radius: 4px;
  margin: 0;
}
.text {
  margin-top: 30px;
  margin-bottom: 30px;
  p {
    font-size: 16px;
    line-height: 22px;
    color: #b9bcc1;
    float: left;
  }
  h1 {
    color: #d7d9dd;
    font-size: 36px;
    margin-bottom: 30px;
  }
  h3 {
    color: #b9bcc1;
    font-size: 20px;
  }
}
.bookingCard {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
