<template>
  <div class="light--text mx-auto">
    <v-card color="dark px-2 pb-4" tile :ripple="false">
      <input
        type="hidden"
        name="form-name"
        :value="resort.categories[0].name"
      />

      <input
        id="datepicker-inline-trigger"
        :rules="dateRules"
        :value="formatDates(dateOne, dateTwo)"
        type="hidden"
        placeholder="Select date"
      />
      <airbnb-style-datepicker
        class="datepicker--dark"
        :mode="'range'"
        :trigger-element-id="'datepicker-inline-trigger'"
        :inline="true"
        :fullscreen-mobile="false"
        :months-to-show="1"
        :disabled-dates="[]"
        :min-date="new Date()"
        :date-one="dateOne"
        :show-shortcuts-menu-trigger="false"
        :date-two="dateTwo"
        @date-one-selected="
          val => {
            updateDateOne(val)
            updateDateTwo(val)
            getPrices(dateOne, dateTwo)
          }
        "
        @date-two-selected="
          val => {
            updateDateTwo(val)
            getPrices(dateOne, dateTwo)
          }
        "
      ></airbnb-style-datepicker>

      <div class="px-4 light--text">
        <v-row no-gutters class="mb-6 title">
          <v-col xs6>{{ prices.length }} nights total</v-col>
        </v-row>
        <div class="confirm-dates--prices-list">
          <div class="mb-4 body-2 font-weight-light">
            <v-row no-gutters v-for="price in prices" v-bind:key="price.id">
              <v-col xs6>{{ formatDates(price.date) }}</v-col>
              <v-col xs6 class="text-right ">${{ price.amount }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col xs6>VAT (10%)</v-col>
              <v-col xs6 class="text-right ">${{ vat }}</v-col>
            </v-row>
          </div>
          <v-divider
            class="mb-4 gray-4f"
          ></v-divider>
          <v-row no-gutters class="mb-6">
            <v-col xs6>
              <h3 class="title">Total</h3>
            </v-col>
            <v-col xs6 class="text-right">
              <h3 class="title">${{ finalPrice }}</h3>
            </v-col>
          </v-row>
          <input
            name="Amount (in $)"
            hidden
            :value="finalPrice"
            type="text"
            readonly
          />
        </div>
      </div>

      <div class="px-4">
        <v-btn
          @click="submit"
          x-large
          block
          color="primary"
          dark
          class="text-capitalize font-weight-bold dark--text"
          :disabled="!valid"
          type="submit"
        >
          <v-spacer></v-spacer>
          <span>Confirm Dates</span>
          <v-spacer></v-spacer>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { formatDates } from '@/helpers'

export default Vue.extend({
  name: 'booking-confirm-dates',
  data() {
    return {
      dateRules: [v => !!v || 'Dates are required'],
      valid: false
    }
  },
  computed: {
    resort() {
      return this.$store.getters['resort/getResort']
    },
    dateOne() {
      return store.getters['booking/bookingInfo'].dateOne
    },
    dateTwo() {
      return store.getters['booking/bookingInfo'].dateTwo
    },
    prices() {
      return this.$store.getters['reservation/prices']
    },
    finalPrice() {
      return this.$store.getters['reservation/finalPrice']
    },
    vat() {
      return this.$store.getters['reservation/vat'].toFixed(2)
    }
  },
  methods: {
    formatDates,
    updateDateOne(val) {
      store.dispatch('booking/updateDateOne', val)
    },
    updateDateTwo(val) {
      store.dispatch('booking/updateDateTwo', val)
    },
    getPrices() {
      const dateOne = this.dateOne
      const dateTwo = this.dateTwo
      const roomTypeId = this.resort.modules.hotel.roomTypes[0].id
      this.$store.dispatch('reservation/getPrices', {
        roomTypeId,
        dateOne,
        dateTwo
      })
    },
    submit() {
      store.dispatch('booking/updateCurrentStep', 2)
    }
  }
})
</script>

<style lang="scss" scoped>
//
</style>
