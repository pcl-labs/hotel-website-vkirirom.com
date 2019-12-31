<template>
  <v-card class="d-flex flex-column dark" tile :elevation="0">
    <div class="d-flex flex-column flex-grow-1">
      <div class="position-relative hero-dialog--hero">
        <v-img
          :aspect-ratio="376 / 192"
          :max-height="192"
          :max-width="'100%'"
          :src="
            transformCloudinaryUrl(
              'https://res.cloudinary.com/die9ji2vn/image/upload/v1577609316/Booking%20Flow/ChooseGuest_c9pgd1.png',
              'f_auto'
            )
          "
        ></v-img>
        <div class="position-absolute mx-4 mt-4 hero-dialog--toolbar">
          <v-btn class="ma-0" x-small fab color="rgba(0,0,0,0.4)" depressed @click="$emit('booking-cancel')">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </div>
        <div class="position-absolute hero-dialog--title text-center brand-2--text w-100">
          <h2 class="display-1 mb-0 font-weight-bold">
            Guests
          </h2>
        </div>
      </div>

      <v-card tile :elevation="0" color="dark" class="px-4 pt-6 pb-9 flex-grow-1 d-flex">
        <v-form class="d-flex flex-column flex-grow-1" v-model="isFormValid" @submit.prevent="">
          <v-card
            color="dark"
            class="light--text d-flex flex-column flex-grow-1 justify-space-between"
            tile
            :ripple="false"
            :elevation="0"
          >
            <div>
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

              <v-row class="py-0 mx-0" no-gutters="">
                <v-col cols="12" class="pa-0 mb-6">
                  <h3 class="body-1 mb-0 font-weight-bold">Bed Type</h3>
                </v-col>
              </v-row>
              <v-row no-gutters="" class="mb-8">
                <v-col
                  v-for="(roomType, index) in roomTypes"
                  :key="roomType.id"
                  :cols="12 / roomTypes.length"
                  :class="{
                    'pr-3': roomTypes.length > 1 && index === 0,
                    'pl-3': roomTypes.length > 1 && index === 1
                  }"
                >
                  <v-btn
                    x-large
                    @click="selectedRoomType = roomType"
                    :class="{
                      'is-selected': selectedRoomType.id === roomType.id
                    }"
                    class="confirm-guests--bed-type text-transform-none"
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

              <v-divider class="light-border mt-2 mb-4"></v-divider>

              <v-list dark class="py-0">
                <v-list-item class="px-0">
                  <v-list-item-content class="light--text py-0">
                    <v-list-item-title class="font-weight-bold body-1 light--text">Adult</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon class="user-select-none my-3">
                    <div class="d-flex light--text align-center">
                      <v-btn :disabled="guestsAdults <= 1" @click="guestsAdults--" color="light" x-small fab icon
                        ><v-icon>remove_circle_outline</v-icon></v-btn
                      >
                      <span class="mx-4 text--light guests-count user-select-none text-center">{{ guestsAdults }}</span>
                      <v-btn
                        :disabled="!selectedRoomType.id || computedTotal >= selectedRoomType.capacity"
                        @click="guestsAdults++"
                        color="light"
                        x-small
                        fab
                        icon
                        ><v-icon>add_circle_outline</v-icon></v-btn
                      >
                    </div>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item class="px-0">
                  <v-list-item-content class="light--text py-0">
                    <v-list-item-title class="font-weight-bold body-1 mb-0">Children</v-list-item-title>
                    <v-list-item-subtitle class="light--text">Under 5</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon class="user-select-none my-3">
                    <div class="d-flex light--text align-center">
                      <v-btn :disabled="guestsChildren <= 0" @click="guestsChildren--" color="light" x-small fab icon
                        ><v-icon>remove_circle_outline</v-icon></v-btn
                      >
                      <span class="mx-4 text--light guests-count user-select-none text-center">{{
                        guestsChildren
                      }}</span>
                      <v-btn
                        :disabled="!selectedRoomType.id || computedTotal >= selectedRoomType.capacity"
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
              </v-list>

              <v-expand-transition>
                <p v-if="selectedRoomType.capacity" class="transition-fast-in-fast-out light--text body-2 mt-6 mb-0">
                  {{ selectedRoomType.capacity }} guests maximum.
                </p>
              </v-expand-transition>

              <v-divider class="light-border my-6"></v-divider>
            </div>

            <div>
              <!-- total -->
              <v-row no-gutters class="mb-6">
                <v-col xs6>
                  <h3 class="title mb-0">Total</h3>
                </v-col>
                <v-col xs6 class="text-right">
                  <h3 class="title mb-0">{{ guestsTotal }} Guests</h3>
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
          </v-card>
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
    guestsTotal() {
      return store.getters['booking/bookingInfo'].guests.total
    },
    computedTotal(): number {
      return this.guestsAdults + this.guestsChildren
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
    },
    currentStep(): number {
      return store.getters['booking/currentStep']
    }
  },
  watch: {
    roomTypes: {
      handler(newVal) {
        if (newVal.length === 1) {
          this.selectedRoomType = newVal[0]
        }
      },
      immediate: true,
      deep: true
    },
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
@import '@/styles/dialog-with-hero.scss';

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
  height: rem(96px);
  &.v-btn.v-btn {
    border-width: rem(2px);
    border-color: $gray-82;
    color: $gray-82;
    &.is-selected {
      border-color: $white;
      color: $white;
    }
  }
}
</style>
