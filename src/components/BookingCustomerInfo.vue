<template>
  <div>
    <v-row no-gutters class="mb-8">
      <v-col>
        <v-form v-model="isFormValid" @submit.prevent="">
          <h1
            class="my-6 font-weight-bold"
            :class="{ 'display-1': $vuetify.breakpoint.smAndDown, 'display-2': $vuetify.breakpoint.mdAndUp }"
          >
            Customer Info
          </h1>
          <h4 class="mb-2 title font-weight-bold">Guest Info</h4>
          <v-text-field
            v-model="phone"
            v-mask="'+###-####-####'"
            type="text"
            dark=""
            outlined=""
            label="Phone Number"
            hint="e.g. +855..."
          ></v-text-field>

          <h4 class="mb-2 title font-weight-bold">Transportation</h4>

          <v-radio-group dark v-model="transportation" class="ma-0 d-block">
            <v-card outlined color="transparent" class="mb-2" @click="transportation = 1">
              <v-card-title>
                <v-radio color="green" label="No transportation" :value="1" class="ma-0"></v-radio>
              </v-card-title>
            </v-card>
            <v-card outlined color="transparent" class="mb-2" @click="transportation = 2">
              <v-card-title class="justify-space-between">
                <v-radio color="green" label="Shuttle Bus ($10/Pax)" :value="2" class="ma-0"></v-radio>
                <a @click.stop="" target="_blank" href="https://example.com" class="body-1 text-decoration-none"
                  >More Info</a
                >
              </v-card-title>
            </v-card>
          </v-radio-group>

          <h4 class="mb-2 title font-weight-bold">Message</h4>

          <v-textarea class="mb-6" dark outlined name="message" :rows="5" auto-grow></v-textarea>

          <v-btn
            @click="submit"
            x-large
            color="primary"
            dark
            class="text-transform-none font-weight-bold dark--text"
            :disabled="!isFormValid"
            type="submit"
          >
            <v-spacer></v-spacer>
            <span class="mr-3">Agree and Continue</span>
            <v-spacer></v-spacer>
            <v-icon class="dark--text">keyboard_arrow_right</v-icon>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mask } from 'vue-the-mask'

export default Vue.extend({
  name: 'booking-customer-info',
  directives: {
    mask
  },
  data() {
    return {
      isFormValid: false,
      phone: '',
      transportation: 1
    }
  },
  methods: {
    submit() {
      console.log('submit...')
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.theme--dark.v-card.v-card--outlined {
  border-color: $light !important;
}
::v-deep .theme--dark.v-icon {
  color: $light;
}
</style>
