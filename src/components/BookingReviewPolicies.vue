<template>
  <fragment>
    <v-row no-gutters class="mb-8">
      <v-col>
        <h1 class="display-2 my-6 font-weight-bold">Review Rules</h1>
        <h3 class="mb-4 title font-weight-bold">{{ prices.length }} night(s) in a {{ resort.title }}</h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="6">
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
  </fragment>
</template>

<script lang="ts">
import { formatDate } from '@/helpers'
import Vue from 'vue'
import store from '@/store'
export default Vue.extend({
  name: 'review-policies',
  methods: {
    formatDate
  },
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
      return store.getters['booking/bookingInfo'].prices
    }
  }
})
</script>

<style lang="scss" scoped>
.box-bordered {
  border: 1px solid $light;
  width: rem(72px);
  height: rem(72px);
  border-radius: 4px;
}
</style>
