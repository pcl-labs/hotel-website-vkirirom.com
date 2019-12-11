<template>
  <v-card tile :elevation="0" class="dark">
    <v-toolbar class="px-2" dense flat dark color="dark">
      <v-btn
        class="ma-0"
        small
        icon
        dark
        depressed
        @click="$emit('booking-close')"
      >
        <v-icon color="gray-82">close</v-icon>
      </v-btn>
    </v-toolbar>

    <div class="d-flex flex-column">
      <v-card color="dark px-2 pb-4 light--text" tile :ripple="false">
        <div class="mx-4">

          This is Booking confirm [WIP]
        </div>
      </v-card>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'

export default Vue.extend({
  name: 'booking-confirm-dates',
  methods: {
    submit() {
      console.log('TODO: go to review policies')
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
</style>
