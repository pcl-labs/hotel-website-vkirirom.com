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
      <v-toolbar-title class="light--text pl-0 ml-n4 text-center display-1"
        >Guests</v-toolbar-title
      >
    </v-toolbar>

    <div class="d-flex flex-column">
      <v-card color="dark px-2 pb-4 light--text" tile :ripple="false">
        <v-form v-model="isFormValid" @submit.prevent="">
          <v-text-field
            class="d-none"
            :value="guestsTotal"
            type="text"
            readonly
            :rules="rules.guestsTotal"
          />
          <v-list dark>
            <v-list-item>
              <v-list-item-content class="light--text">
                <v-list-item-title class="font-weight-bold body-1 light--text"
                  >Adult</v-list-item-title
                >
              </v-list-item-content>

              <v-list-item-icon>
                <div class="d-flex light--text align-center">
                  <v-btn
                    :disabled="guestsAdults <= 0"
                    @click="guestsAdults--"
                    color="light"
                    x-small
                    fab
                    icon
                    ><v-icon>remove_circle_outline</v-icon></v-btn
                  >
                  <span
                    class="mx-4 text--light guests-count user-select-none text-center"
                    >{{ guestsAdults }}</span
                  >
                  <v-btn @click="guestsAdults++" color="light" x-small fab icon
                    ><v-icon>add_circle_outline</v-icon></v-btn
                  >
                </div>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="light--text">
                <v-list-item-title class="font-weight-bold body-1"
                  >Children</v-list-item-title
                >
                <v-list-item-subtitle>Age 2 - 12</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <div class="d-flex light--text align-center">
                  <v-btn
                    :disabled="guestsChildren <= 0"
                    @click="guestsChildren--"
                    color="light"
                    x-small
                    fab
                    icon
                    ><v-icon>remove_circle_outline</v-icon></v-btn
                  >
                  <span
                    class="mx-4 text--light guests-count user-select-none text-center"
                    >{{ guestsChildren }}</span
                  >
                  <v-btn
                    @click="guestsChildren++"
                    color="light"
                    x-small
                    fab
                    icon
                    ><v-icon>add_circle_outline</v-icon></v-btn
                  >
                </div>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="light--text">
                <v-list-item-title class="font-weight-bold body-1"
                  >Infant</v-list-item-title
                >
                <v-list-item-subtitle>Under 2</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <div class="d-flex light--text align-center">
                  <v-btn
                    :disabled="guestsInfants <= 0"
                    @click="guestsInfants--"
                    color="light"
                    x-small
                    fab
                    icon
                    ><v-icon>remove_circle_outline</v-icon></v-btn
                  >
                  <span
                    class="mx-4 text--light guests-count user-select-none text-center"
                    >{{ guestsInfants }}</span
                  >
                  <v-btn @click="guestsInfants++" color="light" x-small fab icon
                    ><v-icon>add_circle_outline</v-icon></v-btn
                  >
                </div>
              </v-list-item-icon>
            </v-list-item>
          </v-list>

          <div class="mx-4">
            <v-divider class="light-border my-8"></v-divider>

            <!-- total -->
            <v-row no-gutters class="mb-4">
              <v-col xs6>
                <h3 class="title">Total</h3>
              </v-col>
              <v-col xs6 class="text-right">
                <h3 class="title">{{ guestsTotal }} Guests</h3>
              </v-col>
            </v-row>

            <v-btn
              @click="submit"
              x-large
              block
              color="primary"
              dark
              class="text-transform-none font-weight-bold dark--text"
              :disabled="!isFormValid"
              type="submit"
            >
              <v-spacer></v-spacer>
              <span>Confirm Guests</span>
              <v-spacer></v-spacer>
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-card>
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
    return {
      isFormValid: false,
      guestsAdults: 0,
      guestsChildren: 0,
      guestsInfants: 0,
      rules: {
        guestsTotal: [v => v > 0 || 'Specify the number of guests']
      }
    }
  },
  computed: {
    guestsTotal(): number {
      return this.guestsAdults + this.guestsChildren + this.guestsInfants
    }
  },
  methods: {
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

.v-list.theme--dark {
  background: $dark;
}
.guests-count {
  min-width: rem(24px);
}
.v-btn--fab {
  .v-icon {
    width: rem(32px) !important;
    height: rem(32px) !important;
    font-size: rem(32px);
  }
}
</style>
