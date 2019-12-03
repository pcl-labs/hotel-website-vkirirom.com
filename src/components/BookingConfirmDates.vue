<template>
  <div class="light--text mx-auto">
    <v-card color="dark px-2 pb-4" tile :ripple="false">
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
            dateOne = val
            dateTwo = val
            getPrices(dateOne, dateTwo)
          }
        "
        @date-two-selected="
          val => {
            dateTwo = val
            getPrices(dateOne, dateTwo)
          }
        "
      ></airbnb-style-datepicker>

      <div class="confirm-dates--prices-list px-4">
        <v-row no-gutters v-for="price in prices" v-bind:key="price.id">
          <v-flex xs6 class="normalText">{{ formatDates(price.date) }}</v-flex>
          <v-flex xs6 class="text-right normalText">${{ price.amount }}</v-flex>
        </v-row>
        <v-row no-gutters>
          <v-flex XS6 class="normalText">VAT (10%)</v-flex>
          <v-flex XS6 class="text-right normalText">${{ vat }}</v-flex>
        </v-row>
        <v-divider
          style="background-color:#3D424E; margin-top:20px; margin-bottom:10px;"
        ></v-divider>
        <v-row no-gutters>
          <v-flex xs6>
            <h3 style="font-size: 20px; color: #D8DADE;">Total</h3>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h3 style="font-size: 20px; color: #D8DADE;">${{ finalPrice }}</h3>
          </v-flex>
        </v-row>
        <input
          name="Amount (in $)"
          hidden
          :value="finalPrice"
          type="text"
          readonly
        />
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
      dateRules: [v => !!v || 'Dates are required']
    }
  },
  computed: {
    resort() {
      return this.$store.getters['resort/getResort']
    },
    dateOne: {
      get() {
        return store.getters['booking/bookingInfo'].dateOne
      },
      set(value) {
        store.dispatch('booking/updateDateOne', value)
      }
    },
    dateTwo: {
      get() {
        return store.getters['booking/bookingInfo'].dateTwo
      },
      set(value) {
        store.dispatch('booking/updateDateTwo', value)
      }
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
    getPrices() {
      const dateOne = this.dateOne
      const dateTwo = this.dateTwo
      const roomTypeId = this.resort.modules.hotel.roomTypes[0].id
      this.$store.dispatch('reservation/getPrices', {
        roomTypeId,
        dateOne,
        dateTwo
      })
    }
  }
})
</script>

<style lang="scss" scoped>
//
</style>
