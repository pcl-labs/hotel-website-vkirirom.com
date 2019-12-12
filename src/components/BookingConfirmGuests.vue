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
      <v-toolbar-title class="light--text pl-0 ml-n4 text-center"
        >Confirm Guests [WIP]</v-toolbar-title
      >
    </v-toolbar>

    <div class="d-flex flex-column">
      <div class="light--text mx-auto">
        <v-card color="dark px-2 pb-4" tile :ripple="false">
          this is confirm guests
        </v-card>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'

export default Vue.extend({
  name: 'booking-confirm-dates',
  props: {
    nextStep: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    goNextStep() {
      store.dispatch('booking/updateCurrentStep', this.nextStep)
    }
  }
})
</script>

<style lang="scss" scoped></style>
