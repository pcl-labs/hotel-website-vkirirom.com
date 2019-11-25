<template>
  <div>
    This is kitchen sink. <br />

    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            outline
            dark
            type="text"
            name="Date"
            color="#B9BCC1"
            id="datepicker"
            label="Reserve Dates"
            readonly
            :rules="dateRules"
            :value="formatDates(dateOne, dateTwo)"
          >
            <v-icon slot="append" color="#B9BCC1">event</v-icon>
          </v-text-field>
          <AirbnbStyleDatepicker
            :trigger-element-id="'datepicker'"
            :mode="'range'"
            :fullscreen-mobile="false"
            :min-date="new Date()"
            :date-one="dateOne"
            :date-two="dateTwo"
            @date-one-selected="
              val => {
                ;(dateOne = val), (dateTwo = val)
              }
            "
            @date-two-selected="
              val => {
                dateTwo = val
              }
            "
            :show-shortcuts-menu-trigger="false"
            @apply="getPrices(dateOne, dateTwo)"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatDates } from '@/helpers'
export default Vue.extend({
  methods: {
    formatDates
  },
  data() {
    return {
      dateRules: [v => !!v || 'Dates are required']
    }
  },
  computed: {
    dateOne: {
      get() {
        return this.$store.getters['reservation/dateOne']
      },
      set(value) {
        this.$store.commit('reservation/updateDateOne', value)
      }
    },
    dateTwo: {
      get() {
        return this.$store.getters['reservation/dateTwo']
      },
      set(value) {
        this.$store.commit('reservation/updateDateTwo', value)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
//
</style>
