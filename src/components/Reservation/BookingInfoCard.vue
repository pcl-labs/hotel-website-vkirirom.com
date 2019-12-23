<template>
  <v-card
    class="card booking-info"
    dark
    width="100%"
    max-width="330px"
  >
    <v-row no-gutters>
      <v-flex xs12 md6>
        <h2>
          {{resort.title}}
        </h2>
        <p>Entire {{resort.title}}</p>
      </v-flex>
      <v-flex xs12 md6>
        <v-img :src="resort.featuredImage"></v-img>
      </v-flex>
      <v-flex xs12>
        <v-divider class="divider"></v-divider>
      </v-flex>
      <v-flex class="normalText">
        <v-icon class="icon">person</v-icon> {{roomType.capacity}} guests
      </v-flex>
      <v-flex class="normalText">
        <v-icon class="icon">event</v-icon> {{cardDate(dateOne)}} <v-icon class="icon">arrow_right_alt</v-icon> {{cardDate(checkOut)}}
      </v-flex>
      <v-flex xs12>
        <v-divider class="divider"></v-divider>
      </v-flex>
      <v-flex xs12 style="margin-bottom:30px;">
        <v-row no-gutters v-for="price in prices" v-bind:key="price.id">
          <v-flex xs6 class="normalText">{{formatDates(price.date)}}</v-flex>
          <v-flex xs6 class="text-right normalText">${{price.amount}}</v-flex>
        </v-row>
        <v-row no-gutters>
          <!-- TODO: fix uppercase XS -->
          <v-flex XS6 class="normalText">VAT (10%)</v-flex>
          <v-flex XS6 class="text-right normalText">${{vat}}</v-flex>
        </v-row>
        <v-divider class="divider"></v-divider>
        <v-row no-gutters>
          <v-flex xs6>
            <h3>Total</h3>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h3>${{finalPrice}}</h3>
          </v-flex>
        </v-row>
      </v-flex>
    </v-row>
  </v-card>
</template>

<script>
import { formatDates, cardDate } from "@/helpers";

export default {
  computed:{
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
    finalPrice() {
      return this.$store.getters["reservation/finalPrice"];
    },
    vat() {
      return this.$store.getters["reservation/vat"].toFixed(2);
    },
    roomType() {
      return this.$store.getters["reservation/roomType"]
    }
  },
  methods:{
    formatDates,
    cardDate
  }
}
</script>

<style lang="scss" scoped>
  .card{
    border: 1px solid #E1E7ED;
    border-radius: 3px;
    margin-right: 0;
    margin-left:auto;
    padding:30px;
    background-color: #191C21;
    h2{
      color: #B9BCC1;
      font-size: 20px;
      line-height: 24px;
    }
    p{
      font-size: 14px;
      line-height: 19px;
      color: #B9BCC1;
    }
    h3{
      font-size: 20px;
      color: #D8DADE;
    }
  }
  .icon{
    color: #B9BCC1;
    margin-bottom:-2px;
  }
  .divider{
    background-color:#3D424E;
    margin-top:10px;
    margin-bottom:10px;
  }
  .normalText{
    font-size: 16px;
    color: #B9BCC1;
  }
  .booking-info {
    .flex {
      padding-top: 4px;
      padding-bottom: 4px;
    }
  }
</style>
