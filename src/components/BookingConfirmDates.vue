<template>
  <v-card tile :elevation="0" class="dark px-4 pt-6 pb-9">
    <div class="d-flex mb-2 align-center mb-8 mx-auto" :style="{ 'max-width': `${currentStep.width}px` }">
      <v-btn class="ma-0" small icon dark depressed @click="$emit('booking-cancel')">
        <v-icon color="gray-82">close</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div class="light--text pl-0 ml-sm-n4 ml-md-0 text-center display-1">Choose Dates</div>
      <v-spacer></v-spacer>
    </div>
    <div class="mx-auto" :style="{ 'max-width': `${currentStep.width}px` }">
      <div class="d-flex flex-column">
        <div class="light--text mx-auto w-100">
          <v-card color="dark" tile :ripple="false" :elevation="0">
            <v-form v-model="isFormValid">
              <v-text-field class="d-none" :value="dateOne" type="text" readonly :rules="dateOneRules" />
              <v-text-field :value="dateTwo" class="d-none" type="text" readonly :rules="dateTwoRules" />
              <v-text-field id="datepicker-inline-trigger" class="d-none" type="text" readonly />
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

              <div class="light--text" v-if="isPricesReady">
                <!-- nights -->
                <v-row no-gutters class="mb-2 title">
                  <v-col xs6>{{ prices.length }} nights total</v-col>
                </v-row>

                <div class="confirm-dates--prices-list">
                  <!-- price list -->
                  <div class="mb-4 body-2 font-weight-light">
                    <v-row class="confirm-dates--price-row" no-gutters v-for="price in prices" v-bind:key="price.id">
                      <v-col xs6>{{ formatDate(price.date, 'ddd, D MMM') }}</v-col>
                      <v-col xs6 class="text-right ">${{ price.amount }}</v-col>
                    </v-row>
                  </div>

                  <!-- total -->
                  <v-row no-gutters class="mb-4">
                    <v-col xs6>
                      <h3 class="title">Total</h3>
                    </v-col>
                    <v-col xs6 class="text-right">
                      <h3 class="title">${{ totalPrice }}</h3>
                    </v-col>
                  </v-row>

                  <input name="Amount (in $)" hidden :value="totalPrice" type="text" readonly />
                </div>
              </div>
              <!-- loading -->
              <div class="text-center mb-4" v-else-if="isFormValid && isLoading">
                <v-progress-circular indeterminate color="green"></v-progress-circular>
              </div>
              <!-- not available -->
              <div class="light--text" v-else-if="isFormValid">
                <p>Sorry, selected dates are not available</p>
              </div>

              <div class="">
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
      </div>
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
    nextStep: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dateOneRules: [v => !!v || 'Dates are required'],
      dateTwoRules: [v => !!v || 'Dates are required'],
      isFormValid: false,
      isLoading: false
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
    totalPrice() {
      return this.$store.getters['booking/computedTotalPrice']
    },
    vat() {
      return this.$store.getters['booking/computedVat'].toFixed(2)
    },
    roomTypeId(): number {
      return this.resort.modules.hotel.roomTypes[0].id
    },
    isPricesReady(): boolean {
      return this.prices.length > 0
    },
    isFormReady(): boolean {
      return !this.isLoading && this.isFormValid && this.isPricesReady
    },
    currentStep(): number {
      return store.getters['booking/currentStep']
    }
  },
  methods: {
    formatDate,
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
      this.isLoading = true
      const dateOne = this.dateOne
      const dateTwo = this.dateTwo
      const roomTypeId = this.roomTypeId
      this.$store
        .dispatch('booking/getPrices', {
          roomTypeId,
          dateOne,
          dateTwo
        })
        .then(() => {
          this.isLoading = false
        })
    },
    clearPrices() {
      this.$store.dispatch('booking/clearPrices')
    },
    submit() {
      this.goNextStep()
    },
    goNextStep() {
      store.dispatch('booking/updateCurrentStep', this.nextStep)
    }
  }
})
</script>
