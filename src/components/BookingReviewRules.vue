<template>
  <fragment>
    <v-row no-gutters class="mb-8">
      <v-col>
        <h1
          class="my-6 font-weight-bold"
          :class="{ 'display-1': $vuetify.breakpoint.smAndDown, 'display-2': $vuetify.breakpoint.mdAndUp }"
        >
          Review Rules
        </h1>
        <h3 class="mb-0 title font-weight-bold">{{ prices.length }} night(s) in a {{ resort.title }}</h3>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-8">
      <v-col cols="12" md="6" class="mb-3 mb-md-0">
        <div class="d-flex align-center">
          <div class="font-weight-light box-bordered d-inline-flex justify-center align-center mr-3 text-center">
            {{ formatDate(dateOne, 'MMM') }}<br />{{ formatDate(dateOne, 'D') }}
          </div>
          <p class="font-weight-light mb-0 body-2">{{ formatDate(dateOne, 'dddd') }} check in<br />before 2PM</p>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex align-center">
          <div class="font-weight-light box-bordered d-inline-flex justify-center align-center mr-3 text-center">
            {{ formatDate(checkOut, 'MMM') }}<br />{{ formatDate(checkOut, 'D') }}
          </div>
          <p class="font-weight-light mb-0 body-2">{{ formatDate(checkOut, 'dddd') }} check out<br />before 12PM</p>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <resort-rules :resort="resort" :hide-location="true"></resort-rules>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-btn
          @click="submit"
          x-large
          color="primary"
          dark
          class="text-transform-none font-weight-bold dark--text mt-8"
        >
          <v-spacer></v-spacer>
          <span class="mr-3">Agree and Continue</span>
          <v-spacer></v-spacer>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </fragment>
</template>

<script lang="ts">
import { formatDate } from '@/helpers'
import ResortRules from '@/components/ResortRules.vue'
import Vue from 'vue'
import store from '@/store'
export default Vue.extend({
  name: 'review-policies',
  components: { ResortRules },
  computed: {
    resort() {
      return store.getters['resort/getResort']
    },
    dateOne() {
      return store.getters['booking/bookingInfo'].dateOne
    },
    checkOut() {
      return store.getters['booking/bookingInfo'].checkOut
    },
    prices() {
      return this.$store.getters['booking/prices']({ rounded: false })
    },
    steps() {
      return store.getters['booking/steps']
    }
  },
  methods: {
    formatDate,
    submit() {
      this.$router.push({ name: 'booking-customer-info' })
      store.dispatch('booking/updateCurrentStep', this.steps.customerInfo)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.box-bordered {
  border: 1px solid $light;
  border-radius: 4px;
  width: rem(64px);
  height: rem(64px);
  @include media-breakpoint-up(md, $my-breakpoints) {
    width: rem(72px);
    height: rem(72px);
  }
}
</style>
