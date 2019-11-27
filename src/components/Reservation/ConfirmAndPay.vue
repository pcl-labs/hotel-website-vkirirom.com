<template>
  <v-container grid-list-md>
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
              No cancellation fee if cancelling at least 24 hours in advance of check-in date.  50% charge of total stay if cancelling within 24 hours.  Applicable to individual (non-group) customers.
            </p>
          </v-flex>
          <v-flex xs12>
            <v-btn
              class="button"
              color="#F7B947"
              v-on:click="purchase"
            >
              Pay ${{finalPrice}} & book
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
import { debounce } from "lodash-es";
const TEXTFIELDS_DEBOUNCE_TIME = 200;
const BookingInfoCard = () => import ('@/components/Reservation/BookingInfoCard.vue')

let stripe = Stripe('pk_test_WJLv2re0yYhf6g1oD4fptybK00N7e4Bj7C'),
  elements = stripe.elements(),
  card = undefined;

var style = {
  base: {
    color: '#B9BCC1',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#B9BCC1'
    },

  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};
export default {
  components:{
    BookingInfoCard
  },
  data(){
    return {
      nameRules: [v => !!v || "Name is required"],
      phoneRules: [
        v => !!v || "Phone no. is required",
        v => (v || "").length <= 13 || "A maximum of 13 characters is allowed",
        v => (v || "").length >= 9 || "A minimum of 9 characters is needed",
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ],
    }
  },
  mounted() {
    card = elements.create('card', {style: style});
    card.mount(this.$refs.card);
  },
  methods:{
    purchase() {
      stripe.createToken(card).then(function(result) {
        console.log(result.token)
      });
    }
  },
  computed:{
    finalPrice() {
      return this.$store.getters["reservation/finalPrice"]
    },
    phone: {
      get() {
        return this.$store.getters["reservation/phone"];
      },
      set: debounce(function(value) {
        this.$store.commit("reservation/updatePhone", value);
      }, TEXTFIELDS_DEBOUNCE_TIME)
    },
    name: {
      get() {
        return this.$store.getters["reservation/name"];
      },
      set: debounce(function(value) {
        this.$store.commit("reservation/updateName", value);
      }, TEXTFIELDS_DEBOUNCE_TIME)
    },
  }
};
</script>
<style scoped lang="scss">
  .v-input__slot{
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
    border: 2px solid #B9BCC1;
    border-radius: 3px;
    background-color: transparent;
    color: #B9BCC1;
  }
  .button{
    max-width: 370px;
    width: 100%;
    height: 55px;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 4px;
    margin:0;
  }
  .text{
    margin-top:30px;
    margin-bottom:30px;
    p{
      font-size: 16px;
      line-height: 22px;
      color: #B9BCC1;
      float: left;
    }
    h1{
      color: #D7D9DD;
      font-size: 36px;
      margin-bottom: 30px;
    }
    h3{
      color: #B9BCC1;
      font-size: 20px;
    }
  }
  .bookingCard{
    margin-top:30px;
    margin-bottom:30px;
  }

  @-webkit-keyframes autofill {
    to {
        color: white;
        background: transparent;
    }
  }
  input:-webkit-autofill {
      -webkit-animation-name: autofill;
      -webkit-animation-fill-mode: both;
  }
  .container{
    padding-top: 30px;
    padding-left: 0px;
    padding-right: 0px;
    // doing padding:0px or  0; or padding-bottom:0px or 0; creates an extra overflow scroll which is bad and should be avoided
  }

  @media only screen and (max-width: 600px) {
    .container{
      max-width: 292px;
    }
  }
  @media only screen and (min-width: 768px) {
    .container{
      max-width: 600px;
    }
  }
  @media only screen and (min-width: 1024px) {
    .container{
      max-width: 900px;
    }
  }
</style>
