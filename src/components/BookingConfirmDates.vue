<template>
  <v-card class="d-flex flex-column dark" tile :elevation="0">
    <div class="position-relative hero-dialog--hero">
      <v-img
        :aspect-ratio="376 / 192"
        :max-height="192"
        :max-width="'100%'"
        :src="
          transformCloudinaryUrl(
            'https://res.cloudinary.com/die9ji2vn/image/upload/v1577609316/Booking%20Flow/ChooseDate_bomyw8.png',
            'f_auto'
          )
        "
      ></v-img>
      <div class="position-absolute mx-4 mt-6 hero-dialog--toolbar">
        <v-btn class="ma-0" x-small fab color="rgba(0,0,0,0.4)" depressed @click="$emit('booking-cancel')">
          <v-icon color="white">close</v-icon>
        </v-btn>
      </div>
      <div class="position-absolute hero-dialog--title text-center brand-2--text w-100">
        <h2 class="display-1 mb-0 font-weight-bold">
          Choose Dates
        </h2>
      </div>
    </div>

    <v-card tile :elevation="0" color="dark" class="px-4 pt-6 flex-grow-1 d-flex flex-column">
      <div class="mx-auto flex-grow-1 d-flex w-100">
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex flex-column flex-grow-1 light--text mx-auto w-100">
            <v-form class="d-flex flex-column flex-grow-1" v-model="isFormValid">
              <v-card
                class="d-flex flex-column flex-grow-1 justify-content-between"
                color="dark"
                tile
                :ripple="false"
                :elevation="0"
              >
                <div class="section-1">
                  <v-text-field class="d-none" :value="dateOne" type="text" readonly :rules="dateOneRules" />
                  <v-text-field :value="dateTwo" class="d-none" type="text" readonly :rules="dateTwoRules" />
                  <v-text-field id="datepicker-inline-trigger" class="d-none" type="text" readonly />
                  <airbnb-style-datepicker
                    class="datepicker--dark mb-4"
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

                  <v-divider v-if="shouldShowTotal" class="light-border mb-6"></v-divider>

                  <div class="white--text mb-6" v-if="isPricesReady">
                    <!-- nights -->
                    <v-row no-gutters class="mb-2 title">
                      <v-col xs6>{{ prices.length }} nights total</v-col>
                    </v-row>

                    <div class="confirm-dates--prices-list">
                      <!-- price list -->
                      <div class="mb-4 body-2 font-weight-light">
                        <v-row
                          class="confirm-dates--price-row"
                          no-gutters
                          v-for="price in prices"
                          v-bind:key="price.id"
                        >
                          <v-col xs6>{{ formatDate(price.date, 'ddd, D MMM') }}</v-col>
                          <v-col xs6 class="text-right ">${{ price.amount }}</v-col>
                        </v-row>
                      </div>
                    </div>
                  </div>
                </div>

                <input name="Amount (in $)" hidden :value="computedTotalPrice" type="text" readonly />

                <!-- non-sticky bar -->
                <div class="section-2 submit-bar--non-sticky pb-9">
                  <v-divider v-if="shouldShowTotal" class="light-border"></v-divider>

                  <div class="confirm-dates--results-row my-6">
                    <!-- total -->
                    <v-expand-transition>
                      <v-row v-if="shouldShowTotal" no-gutters class="transition-fast-in-fast-out">
                        <v-col xs6>
                          <h3 class="title mb-0">Total</h3>
                        </v-col>
                        <v-col xs6 class="text-right">
                          <h3 class="title mb-0">${{ computedTotalPrice }}</h3>
                        </v-col>
                      </v-row>
                    </v-expand-transition>

                    <!-- loading -->
                    <v-expand-transition>
                      <div v-if="shouldShowLoading" class="transition-fast-in-fast-out text-center mb-0">
                        <v-progress-circular :size="24" indeterminate color="green"></v-progress-circular>
                      </div>
                    </v-expand-transition>

                    <!-- error -->
                    <p v-if="shouldShowError" class="transition-fast-in-fast-out error--text body-2 mb-0">
                      Sorry, selected dates are not available
                    </p>
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
                </div>
              </v-card>
            </v-form>
          </div>
        </div>
      </div>
    </v-card>

    <!-- sticky bar -->
    <div class="submit-bar--sticky d-none">
      <div class="px-4">
        <v-divider v-if="shouldShowTotal" class="light-border mb-6 mt-1"></v-divider>
        <div class="confirm-dates--results-row my-6">
          <!-- total -->
          <v-expand-transition>
            <v-row v-if="shouldShowTotal" no-gutters class="transition-fast-in-fast-out">
              <v-col xs6>
                <h3 class="title mb-0">Total</h3>
              </v-col>
              <v-col xs6 class="text-right">
                <h3 class="title mb-0">${{ computedTotalPrice }}</h3>
              </v-col>
            </v-row>
          </v-expand-transition>

          <!-- loading -->
          <v-expand-transition>
            <div v-if="shouldShowLoading" class="transition-fast-in-fast-out text-center mb-0">
              <v-progress-circular :size="24" indeterminate color="green"></v-progress-circular>
            </div>
          </v-expand-transition>

          <!-- error -->
          <p v-if="shouldShowError" class="transition-fast-in-fast-out error--text body-2 mb-0">
            Sorry, selected dates are not available
          </p>
        </div>
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
      return store.getters['booking/bookingInfo'].resort
    },
    dateOne() {
      return store.getters['booking/bookingInfo'].dateOne
    },
    dateTwo() {
      return store.getters['booking/bookingInfo'].dateTwo
    },
    prices() {
      return this.$store.getters['booking/prices']({ decimalDigits: 0 })
    },
    computedTotalPrice() {
      const options = {
        hasVAT: false
      }
      return this.$store.getters['booking/computedTotalPrice'](options).toFixed(0)
    },
    roomTypeId(): number {
      const firstRoomType = this.resort.modules.hotel.roomTypes[0]
      return firstRoomType && firstRoomType.id
    },
    isPricesReady(): boolean {
      return this.prices.length > 0
    },
    isFormReady(): boolean {
      return !this.isLoading && this.isFormValid && this.isPricesReady
    },
    currentStep(): number {
      return store.getters['booking/currentStep']
    },
    shouldShowTotal(): boolean {
      return this.isPricesReady
    },
    shouldShowLoading(): boolean {
      return !this.shouldShowTotal && this.isFormValid && this.isLoading
    },
    shouldShowError(): boolean {
      return !(this.shouldShowTotal || this.shouldShowLoading) && this.isFormValid
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

<style lang="scss" scoped>
@import '@/styles/utility.scss';
@import '@/styles/dialog-with-hero.scss';
@import '@/styles/sticky-submit-bar.scss';
@import '@/styles/datepicker-dark-theme.scss';
</style>
