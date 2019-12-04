<template>
  <div class="light--text mx-auto">
    <v-card color="dark px-2 pb-4" tile :ripple="false">
      <v-form v-model="isFormValid">
        <v-text-field
          class="d-none"
          :value="dateOne"
          type="text"
          readonly
          :rules="dateOneRules"
        />
        <v-text-field
          :value="dateTwo"
          class="d-none"
          type="text"
          readonly
          :rules="dateTwoRules"
        />
        <v-text-field
          id="datepicker-inline-trigger"
          class="d-none"
          type="text"
          readonly
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
          @date-one-selected="onSelectDateOne"
          @date-two-selected="onSelectDateTwo"
        ></airbnb-style-datepicker>

        <div class="px-4 light--text" v-if="isPricesReady">
          <!-- nights -->
          <v-row no-gutters class="mb-2 title">
            <v-col xs6>{{ prices.length }} nights total</v-col>
          </v-row>

          <div class="confirm-dates--prices-list">
            <!-- price list -->
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

            <!-- total -->
            <v-row no-gutters class="mb-4">
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
        <!-- <div class="light--text" v-else>
          <p>Select start date</p>
          <p>Select end date</p>
        </div> -->

        <div class="px-4">
          <v-btn
            @click="submit"
            x-large
            block
            color="primary"
            dark
            class="text-capitalize font-weight-bold dark--text"
            :disabled="!isFormReady"
            type="submit"
          >
            <v-spacer></v-spacer>
            <span>Confirm Dates</span>
            <v-spacer></v-spacer>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </div>
      </v-form>
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
      dateOneRules: [v => !!v || 'Dates are required'],
      dateTwoRules: [v => !!v || 'Dates are required'],
      isFormValid: false
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
      return this.$store.getters['booking/bookingInfo'].prices
    },
    finalPrice() {
      return this.$store.getters['booking/bookingInfo'].finalPrice
    },
    vat() {
      return this.$store.getters['booking/bookingInfo'].vat.toFixed(2)
    },
    roomTypeId(): number {
      return this.resort.modules.hotel.roomTypes[0].id
    },
    isPricesReady(): boolean {
      return this.prices.length > 0
    },
    isFormReady(): boolean {
      return this.isFormValid && this.isPricesReady
    }
  },
  methods: {
    formatDates,
    onSelectDateOne(val) {
      this.updateDateOne(val)
      this.clearDateTwo()
      this.clearPrices()
    },
    onSelectDateTwo(val) {
      this.updateDateTwo(val)
      if (val) {
        this.getPrices()
      }
    },
    updateDateOne(val) {
      store.dispatch('booking/updateDateOne', val)
    },
    updateDateTwo(val) {
      store.dispatch('booking/updateDateTwo', val)
    },
    clearDateTwo() {
      store.dispatch('booking/clearDateTwo')
    },
    getPrices() {
      const dateOne = this.dateOne
      const dateTwo = this.dateTwo
      const roomTypeId = this.roomTypeId
      this.$store.dispatch('booking/getPrices', {
        roomTypeId,
        dateOne,
        dateTwo
      })
    },
    clearPrices() {
      this.$store.dispatch('booking/clearPrices')
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
