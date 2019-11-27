<template>
  <v-container grid-list-md>
    <v-row no-gutters justify-space-between>
      <v-flex xs12 md7 class="text">
        <v-row no-gutters>
          <v-flex xs12>
            <h1>Review accommodation rules</h1>
          </v-flex>
          <v-flex xs12>
            <h3>{{prices.length}} night(s) in a {{resort.title}}</h3>
          </v-flex>
          <v-flex xs12 md6>
            <v-row>
              <v-flex xs4>
                <v-card class="smallCard">
                  <v-card-text>{{reviewDateMonth(dateOne)}}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8>
                <p>
                  {{reviewDay(dateOne)}} Check in before 2PM
                </p>
              </v-flex>
            </v-row>
          </v-flex>
          <v-flex xs12 md6>
            <v-row no-gutters>
              <v-flex xs4>
                <v-card class="smallCard">
                  <v-card-text>{{reviewDateMonth(checkOut)}}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8>
                <p>
                  {{reviewDay(checkOut)}} Check out before 12PM
                </p>
              </v-flex>
            </v-row>
          </v-flex>
          <v-flex xs12>
            <v-divider class="divider"></v-divider>
          </v-flex>
          <v-flex xs12>
            <h3>Things to keep in mind</h3>
          </v-flex>
          <v-flex xs12>
            <v-row no-gutters>
              <v-flex xs4 md3>
                <v-card class="smallCard">
                  <v-card-text><v-icon size="30" color="#B9BCC1">child_care</v-icon></v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8 md9>
                <p class="text-left">Suitable for children and infants</p>
              </v-flex>
            </v-row>
          </v-flex>
          <v-flex xs12>
            <v-row no-gutters>
              <v-flex xs4 md3>
                <v-card class="smallCard">
                  <v-card-text><v-icon size="30" color="#B9BCC1">pets</v-icon></v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8 md9>
                <p class="text-left">Pet allowed</p>
              </v-flex>
            </v-row>
          </v-flex>
          <v-flex xs12>
            <v-row no-gutters>
              <v-flex xs4 md3>
                <v-card class="smallCard">
                  <v-card-text><v-icon size="30" color="#B9BCC1">smoke_free</v-icon></v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8 md9>
                <p class="text-left">No smoking</p>
              </v-flex>
            </v-row>
          </v-flex>
          <v-flex xs12>
            <v-row no-gutters>
              <v-flex xs4 md3>
                <v-card class="smallCard">
                  <v-card-text><v-icon size="30" color="#B9BCC1">credit_card</v-icon></v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8 md9>
                <p class="text-left">Payment is made upon check out at the resort</p>
              </v-flex>
            </v-row>
          </v-flex>
        </v-row>
      </v-flex>
      <v-flex xs12 md5 class="bookingCard">
        <BookingInfoCard></BookingInfoCard>
      </v-flex>
    </v-row>
    <!-- <v-btn
      class="button"
      color="#F7B947"
      id="checkout-button-sku_FXdydWSsa1hGV6"
      role="link"
      @click="pay()"
    >
      Agree and pay
    </v-btn>
    <div id="error-message"></div> -->
    <v-btn
      class="button"
      color="#F7B947"
      to="/reservation/confirmandpay"
    >
      Agree and continue
    </v-btn>
  </v-container>
</template>

<script>
import { reviewDateMonth, reviewDay } from "@/helpers"
import format from "date-fns/format";
const BookingInfoCard = () => import ('@/components/Reservation/BookingInfoCard.vue')

export default {
  components:{
    BookingInfoCard
  },
  computed: {
    resort() {
      return this.$store.getters["resort/getResort"];
    },
    dateOne() {
      return this.$store.getters["reservation/dateOne"];
    },
    checkOut() {
      return this.$store.getters["reservation/checkOut"];
    },
    prices() {
      return this.$store.getters["reservation/prices"]
    },
  },
  methods:{
    reviewDateMonth,
    reviewDay,
    pay(){
      let stripe = Stripe('pk_live_RZ3e8NjPRiG6H7mchiRmn5xK00sQ4vN73t');
      stripe.redirectToCheckout({
        items: [{sku: 'sku_FXdydWSsa1hGV6', quantity: 1}],

        // Do not rely on the redirect to the successUrl for fulfilling
        // purchases, customers may not always reach the success_url after
        // a successful payment.
        // Instead use one of the strategies described in
        // https://stripe.com/docs/payments/checkout/fulfillment
        successUrl: window.location.protocol + '//deploy-preview-161--cranky-nightingale-3731fc.netlify.com/thanks',
        cancelUrl: window.location.protocol + '//deploy-preview-161--cranky-nightingale-3731fc.netlify.com',
      })
      .then(function (result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .text{
    margin-top:30px;
    margin-bottom:30px;
    p{
      font-size: 16px;
      line-height: 22px;
      color: #B9BCC1;
      margin-top: 15px;
    }
    h1{
      color: #D7D9DD;
      font-size: 36px;
      margin-bottom: 30px;
    }
    h3{
      color: #B9BCC1;
      font-size: 20px;
      margin-bottom: 30px;
    }
  }
  .button{
    width: 100%;
    max-width: 370px;
    height: 55px;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 4px;
    margin: 4px;
  }
  .bookingCard{
    margin-top:30px;
    margin-bottom:30px;
  }
  .smallCard{
    width: 72px;
    height: 72px;
    border: 3px solid #B9BCC1;
    box-sizing: border-box;
    border-radius: 3px;
    background: transparent;
    color: #B9BCC1;
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    float: left;
  }
  .divider{
    margin-bottom: 30px;
    background-color: #B9BCC1;
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
