<template>
  <v-card tile :elevation="0" class="dark">
    <div class="d-flex flex-column">
      <div class="position-relative confirm-booking--hero">
        <v-img :aspect-ratio="376 / 192" :max-height="192" :max-width="'100%'" :src="resort.featuredImage"></v-img>
        <div class="position-absolute mx-4 mt-4 confirm-booking--toolbar">
          <v-btn class="ma-0" x-small fab color="rgba(0,0,0,0.4)" depressed @click="$emit('booking-close')">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </div>
        <div class="position-absolute confirm-booking--resort-title text-center brand-2--text w-100">
          <h2 class="display-1 mb-0 font-weight-bold">
            {{ resort.title }}
          </h2>
        </div>
      </div>

      <v-card color="dark px-2 pb-4 light--text" tile :ripple="false">
        <div class="mx-4">
          <div class="mb-4 body-2 font-weight-light">
            <v-row no-gutters class="mt-6">
              <v-col>
                <div class="d-flex align-center">
                  <v-icon color="light" class="icon mr-4">person</v-icon>
                  <span class="mr-2">{{ guests }}</span
                  ><span>Guests</span>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-3 mb-6">
              <v-col>
                <div class="d-flex">
                  <v-icon color="light" class="icon mr-4">event</v-icon>
                  <div class="d-flex align-center flex-grow-1">
                    <div>{{ formatDate(dateOne, 'ddd, D MMM') }}</div>
                    <v-icon color="light" class="icon mx-3">arrow_right_alt</v-icon>
                    <div>{{ formatDate(checkOut, 'ddd, D MMM') }}</div>
                  </div>
                </div>
              </v-col>
            </v-row>

            <v-divider class="light-border"></v-divider>

            <v-row class="mt-3">
              <v-col
                ><p class="mb-0">{{ prices.length }} nights total</p></v-col
              >
            </v-row>

            <!-- price list -->
            <div class="mb-3">
              <v-row class="confirm-dates--price-row" no-gutters v-for="price in prices" v-bind:key="price.id">
                <v-col xs6>{{ formatDate(price.date, 'ddd, D MMM') }}</v-col>
                <v-col xs6 class="text-right ">${{ price.amount }}</v-col>
              </v-row>
            </div>
            <v-row class="confirm-dates--price-row" no-gutters>
              <v-col xs6>VAT (10%)</v-col>
              <v-col xs6 class="text-right ">${{ vat }}</v-col>
            </v-row>
          </div>

          <v-divider class="light-border"></v-divider>

          <!-- total -->
          <v-row no-gutters class="mt-4">
            <v-col xs6>
              <h3 class="title mb-0">Total</h3>
            </v-col>
            <v-col xs6 class="text-right">
              <h3 class="title mb-0">${{ finalPrice }}</h3>
            </v-col>
          </v-row>

          <v-btn
            v-if="hasConfirmButton"
            :to="{ name: 'booking-review-policies' }"
            x-large
            block
            color="primary"
            dark
            class="text-transform-none font-weight-bold dark--text mt-8"
          >
            <v-spacer></v-spacer>
            <span>Confirm Booking</span>
            <v-spacer></v-spacer>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { formatDate } from '@/helpers'

export default Vue.extend({
  name: 'booking-confirm-dates',
  props: {
    hasConfirmButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    resort() {
      return store.getters['resort/getResort']
    },
    dateOne() {
      return store.getters['booking/bookingInfo'].dateOne
    },
    dateTwo() {
      return store.getters['booking/bookingInfo'].dateTwo
    },
    checkOut() {
      return store.getters['booking/bookingInfo'].checkOut
    },
    prices() {
      return store.getters['booking/bookingInfo'].prices
    },
    totalPrice() {
      return store.getters['booking/computedTotalPrice']
    },
    vat() {
      return store.getters['booking/computedVat'].toFixed(2)
    },
    finalPrice() {
      return store.getters['booking/computedFinalPrice'].toFixed(2)
    },
    guests() {
      return store.getters['booking/bookingInfo'].guests.total
    }
  },
  methods: {
    formatDate
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.confirm-booking--toolbar {
  top: 0;
}
.confirm-booking--hero .v-image::after {
  background: linear-gradient(360deg, rgba(25, 28, 33, 0.8) 0%, rgba(25, 28, 33, 0) 30%);
  position: absolute;
  @include stick-around;
  content: '';
}
.confirm-booking--resort-title {
  bottom: rem(16px);
}
</style>
