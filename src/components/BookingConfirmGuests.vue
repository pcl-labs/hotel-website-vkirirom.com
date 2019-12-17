<template>
  <v-card tile :elevation="0" class="dark">
    <v-toolbar class="px-2" dense flat dark color="dark">
      <v-btn class="ma-0" small icon dark depressed @click="$emit('booking-cancel')">
        <v-icon color="gray-82">close</v-icon>
      </v-btn>
      <v-toolbar-title class="light--text pl-0 ml-n4 text-center display-1">Guests</v-toolbar-title>
    </v-toolbar>

    <div class="d-flex flex-column">
      <v-card color="dark px-2 pb-4 light--text" tile :ripple="false">
        <v-form v-model="isFormValid" @submit.prevent="">
          <v-text-field class="d-none" :value="selectedRoomType" type="text" readonly :rules="rules.bedType" />
          <v-text-field class="d-none" :value="computedTotal" type="text" readonly :rules="rules.computedTotal" />
          <v-text-field
            ref="capacityValidator"
            class="d-none"
            :value="selectedRoomType.capacity - computedTotal"
            type="text"
            readonly
            :rules="rules.remainedCapacity"
          />

          <v-row class="py-0 mx-0 mb-8">
            <v-col cols="12" class="pb-0">
              <h3 class="body-1 mb-0 font-weight-bold">Bed Type</h3>
            </v-col>
            <v-col v-for="roomType in roomTypes" :key="roomType.id" :cols="12 / roomTypes.length">
              <v-btn
                x-large
                @click="selectedRoomType = roomType"
                :class="{ 'is-selected': selectedRoomType.id === roomType.id }"
                class="confirm-guests--bed-type py-2 text-transform-none"
                block
                outlined
                icon
                tile
              >
                <div class="d-flex flex-column">
                  <v-icon class="mb-1">hotel</v-icon>
                  <div>{{ roomType.beds[0].count }} {{ roomType.beds[0].type }}</div>
                </div>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="light-border mx-4 my-4"></v-divider>

          <v-list dark>
            <v-list-item>
              <v-list-item-content class="light--text">
                <v-list-item-title class="font-weight-bold body-1 light--text">Adult</v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon class="user-select-none">
                <div class="d-flex light--text align-center">
                  <v-btn :disabled="guestsAdults <= 0" @click="guestsAdults--" color="light" x-small fab icon
                    ><v-icon>remove_circle_outline</v-icon></v-btn
                  >
                  <span class="mx-4 text--light guests-count user-select-none text-center">{{ guestsAdults }}</span>
                  <v-btn @click="guestsAdults++" color="light" x-small fab icon
                    ><v-icon>add_circle_outline</v-icon></v-btn
                  >
                </div>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="light--text">
                <v-list-item-title class="font-weight-bold body-1">Children</v-list-item-title>
                <v-list-item-subtitle>Age 2 - 12</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon class="user-select-none">
                <div class="d-flex light--text align-center">
                  <v-btn :disabled="guestsChildren <= 0" @click="guestsChildren--" color="light" x-small fab icon
                    ><v-icon>remove_circle_outline</v-icon></v-btn
                  >
                  <span class="mx-4 text--light guests-count user-select-none text-center">{{ guestsChildren }}</span>
                  <v-btn @click="guestsChildren++" color="light" x-small fab icon
                    ><v-icon>add_circle_outline</v-icon></v-btn
                  >
                </div>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="light--text">
                <v-list-item-title class="font-weight-bold body-1">Infant</v-list-item-title>
                <v-list-item-subtitle>Under 2</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon class="user-select-none">
                <div class="d-flex light--text align-center">
                  <v-btn :disabled="guestsInfants <= 0" @click="guestsInfants--" color="light" x-small fab icon
                    ><v-icon>remove_circle_outline</v-icon></v-btn
                  >
                  <span class="mx-4 text--light guests-count user-select-none text-center">{{ guestsInfants }}</span>
                  <v-btn @click="guestsInfants++" color="light" x-small fab icon
                    ><v-icon>add_circle_outline</v-icon></v-btn
                  >
                </div>
              </v-list-item-icon>
            </v-list-item>
          </v-list>

          <div class="mx-4">

            <!-- error -->
            <p
              class="error--text body-2"
              v-if="selectedRoomType.id && !($refs.capacityValidator && $refs.capacityValidator.valid)"
            >
              Capacity is not enough
            </p>

            <v-divider class="light-border mt-4 mb-8"></v-divider>

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
import { Resort, RoomType } from '@/types'
import { isNumber } from 'lodash-es'

export default Vue.extend({
  name: 'booking-confirm-guests',
  props: {
    nextStep: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFormValid: false,
      rules: {
        remainedCapacity: [v => v >= 0 || 'Capacity is not enough'],
        computedTotal: [v => v > 0 || 'Specify the number of guests'],
        bedType: [v => (!!v && isNumber(v.id)) || 'Bed type is required']
      }
    }
  },
  computed: {
    selectedRoomType: {
      get() {
        return store.getters['booking/bookingInfo'].roomType
      },
      set(value: RoomType) {
        store.dispatch('booking/updateRoomType', value)
      }
    },
    guests() {
      return store.getters['booking/bookingInfo'].guests
    },
    guestsAdults: {
      get(): number {
        return store.getters['booking/bookingInfo'].guests.adults
      },
      set(value: number) {
        const guests = {
          ...this.guests,
          adults: value
        }
        store.dispatch('booking/updateGuests', guests)
      }
    },
    guestsChildren: {
      get(): number {
        return store.getters['booking/bookingInfo'].guests.children
      },
      set(value: number) {
        const guests = {
          ...this.guests,
          children: value
        }
        store.dispatch('booking/updateGuests', guests)
      }
    },
    guestsInfants: {
      get(): number {
        return store.getters['booking/bookingInfo'].guests.infants
      },
      set(value: number) {
        const guests = {
          ...this.guests,
          infants: value
        }
        store.dispatch('booking/updateGuests', guests)
      }
    },
    guestsTotal() {
      return store.getters['booking/bookingInfo'].guests.total
    },
    computedTotal(): number {
      return this.guestsAdults + this.guestsChildren + this.guestsInfants
    },
    resort(): Resort {
      return store.getters['booking/bookingInfo'].resort
    },
    roomTypes(): RoomType[] {
      const modules = store.getters['booking/bookingInfo'].resort.modules
      if (!modules) {
        return []
      }
      return modules.hotel.roomTypes
    }
  },
  watch: {
    computedTotal(newVal) {
      const guests = {
        ...this.guests,
        total: newVal
      }
      store.dispatch('booking/updateGuests', guests)
    }
  },
  methods: {
    submit() {
      store
        .dispatch('booking/updateGuests', {
          adults: this.guestsAdults,
          children: this.guestsChildren,
          infants: this.guestsInfants,
          total: this.guestsTotal
        })
        .then(this.goNextStep)
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
.confirm-guests--bed-type {
  border-radius: rem(3px);
  height: auto;
  &.v-btn.v-btn {
    border-width: rem(2px);
    border-color: $light;
    color: $light;
    &.is-selected {
      border-color: $brand-4;
      color: $brand-4;
    }
  }
}
</style>
