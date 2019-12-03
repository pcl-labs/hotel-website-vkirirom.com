<template>
  <div class="light--text">
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
          }
        "
        @date-two-selected="
          val => {
            dateTwo = val
          }
        "
        @apply="getPrices(dateOne, dateTwo)"
      ></airbnb-style-datepicker>
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
