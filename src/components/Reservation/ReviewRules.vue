<template>
  <v-container grid-list-md>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 md7 class="text">
        <v-layout row wrap>
          <v-flex xs12>
            <h1>Review accommodation rules</h1>
          </v-flex>
          <v-flex xs12>
            <h3>{{prices.length}} night(s) in a {{resort.title}}</h3>
          </v-flex>
          <v-flex xs12 md6>
            <v-layout>
              <v-flex xs4>
                <v-card class="smallCard">
                  <v-card-text>{{reviewDateMonth(dateOne)}}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8>
                <p>
                  {{reviewDay(dateOne)}} Check out before 12PM
                </p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 md6>
            <v-layout row wrap>
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
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-divider class="divider"></v-divider>
          </v-flex>
          <v-flex xs12>
            <h3>Things to keep in mind</h3>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs4 md3>
                <v-card class="smallCard">
                  <v-card-text><v-icon size="30" class="icon">child_care</v-icon></v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8 md9>
                <p class="text-xs-left">Suitable for children and infants</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs4 md3>
                <v-card class="smallCard">
                  <v-card-text><v-icon size="30" class="icon">pets</v-icon></v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8 md9>
                <p class="text-xs-left">Pet allowed</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs4 md3>
                <v-card class="smallCard">
                  <v-card-text><v-icon size="30" class="icon">smoke_free</v-icon></v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8 md9>
                <p class="text-xs-left">No smoking</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs4 md3>
                <v-card class="smallCard">
                  <v-card-text><v-icon size="30" class="icon">credit_card</v-icon></v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs8 md9>
                <p class="text-xs-left">Payment is made upon check out at the resort</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md5 class="bookingCard">
        <BookingInfoCard></BookingInfoCard>      
      </v-flex>
    </v-layout>
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
import { reviewDateMonth } from "@/helpers.js"
import { reviewDay } from "@/helpers.js"
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
    reviewDay    
  }
}
</script>

<style scoped lang="scss">
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
    width: 270px;
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
  .icon{
    color: #B9BCC1;
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
