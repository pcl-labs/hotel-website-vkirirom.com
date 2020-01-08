<template>
  <v-card class="d-flex flex-column dark" tile :elevation="0">
    <div class="d-flex flex-column flex-grow-1">
      <div class="position-relative hero-dialog--hero">
        <v-img
          :aspect-ratio="376 / 192"
          :max-height="192"
          :max-width="'100%'"
          :src="transformCloudinaryUrl(resort.featuredImage, 'f_auto')"
        ></v-img>
        <div v-if="hasCancelButton" class="position-absolute mx-4 mt-4 hero-dialog--toolbar">
          <v-btn class="ma-0" x-small fab color="rgba(0,0,0,0.4)" depressed @click="$emit('booking-cancel')">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </div>
        <div class="position-absolute hero-dialog--title text-center brand-2--text w-100">
          <h2 class="display-1 mb-0 font-weight-bold">
            {{ resort.title }}
          </h2>
        </div>
      </div>

      <v-card dark color="dark" tile :elevation="0" class="px-4 pt-6 pb-9 flex-grow-1 d-flex">
        <div class="d-flex flex-column flex-grow-1 justify-space-between body-2 font-weight-light">
          <div>
            <v-row no-gutters class="mb-6">
              <v-col cols="12">
                <div class="d-flex align-center">
                  <v-icon color="light" class="icon mr-4">person</v-icon>
                  <span class="mr-2">{{ guests }}</span
                  ><span>Guests</span>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-8">
              <v-col>
                <div class="d-flex">
                  <v-icon color="light" class="icon mr-4">event</v-icon>
                  <div class="d-flex align-center flex-grow-1">
                    <div class="confirm-booking--date">{{ formatDate(dateOne, 'ddd, D MMM') }}</div>
                    <v-icon color="light" class="icon mx-3">arrow_right_alt</v-icon>
                    <div class="confirm-booking--date">{{ formatDate(checkOut, 'ddd, D MMM') }}</div>
                  </div>
                </div>
              </v-col>
            </v-row>

            <v-divider class="light-border mb-6"></v-divider>

            <v-row no-gutters class="mb-4">
              <v-col
                ><p class="mb-0">{{ prices.length }} nights total</p></v-col
              >
            </v-row>

            <!-- price list -->
            <div class="mb-6">
              <div class="mb-8">
                <v-row class="confirm-dates--price-row" no-gutters v-for="price in prices" v-bind:key="price.id">
                  <v-col xs6>{{ formatDate(price.date, 'ddd, D MMM') }}</v-col>
                  <v-col xs6 class="text-right ">${{ price.amount }}</v-col>
                </v-row>
              </div>
              <!-- VAT -->
              <v-row class="confirm-dates--price-row" no-gutters>
                <v-col xs6>VAT (10%)</v-col>
                <v-col xs6 class="text-right ">${{ computedVAT }}</v-col>
              </v-row>
            </div>

            <v-divider class="light-border"></v-divider>
          </div>

          <div>
            <!-- total -->
            <v-row no-gutters class="mt-6">
              <v-col xs6>
                <h3 class="title mb-0">Total</h3>
              </v-col>
              <v-col xs6 class="text-right">
                <h3 class="title mb-0">
                  <span>${{ computedTotalPrice }}</span>
                </h3>
              </v-col>
            </v-row>

            <v-btn
              v-if="hasConfirmButton"
              @click="submit"
              x-large
              block
              color="primary"
              dark
              class="text-transform-none font-weight-bold dark--text mt-6"
            >
              <v-spacer></v-spacer>
              <span>Confirm Booking</span>
              <v-spacer></v-spacer>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </div>
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
    },
    hasCancelButton: {
      type: Boolean,
      default: true
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
      return this.$store.getters['booking/prices']({ rounded: true })
    },
    computedVAT() {
      return store.getters['booking/computedVAT']().toFixed(0)
    },
    computedTotalPrice() {
      const options = {
        hasVAT: true
      }
      return store.getters['booking/computedTotalPrice'](options).toFixed(0)
    },
    guests() {
      return store.getters['booking/bookingInfo'].guests.total
    }
  },
  methods: {
    formatDate,
    submit() {
      this.$emit('booking-close')
      this.$router.push({ name: 'booking-review-rules' })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
@import '@/styles/dialog-with-hero.scss';
</style>
