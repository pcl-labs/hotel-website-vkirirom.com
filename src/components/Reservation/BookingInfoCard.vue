<template>
  <v-card
    class="card"
    dark
    width="100%"
    max-width="330px"
  >
    <v-layout row wrap>
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
        <v-layout row wrap v-for="price in prices" v-bind:key="price.id">
          <v-flex xs6 class="normalText">{{formatDates(price.date)}}</v-flex>
          <v-flex xs6 class="text-xs-right normalText">${{price.amount}}</v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex XS6 class="normalText">VAT (10%)</v-flex>
          <v-flex XS6 class="text-xs-right normalText">${{vat}}</v-flex>
        </v-layout>
        <v-divider class="divider"></v-divider>
        <v-layout row wrap>
          <v-flex xs6>
            <h3>Total</h3>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <h3>${{finalPrice}}</h3>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { formatDates } from "@/helpers.js";
import { cardDate } from "@/helpers.js";

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
</style>
