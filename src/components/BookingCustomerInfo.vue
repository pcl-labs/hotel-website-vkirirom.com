<template>
  <div>
    <v-row no-gutters class="mb-8">
      <v-col>
        <v-form v-model="isFormValid" @submit.prevent>
          <h1
            class="my-6 font-weight-bold"
            :class="{ 'display-1': $vuetify.breakpoint.smAndDown, 'display-2': $vuetify.breakpoint.mdAndUp }"
          >
            Customer Info
          </h1>
          <h4 class="mb-2 title font-weight-bold">Guest Info</h4>
          <v-row no-gutters class="phone-input align-center">
            <v-col cols="5">
              <v-combobox
                class="phone-input--code"
                dark
                color="light"
                outlined
                label="Country code"
                v-model="phoneCountry"
                item-color="dark"
                :items="CountriesList"
                item-text="name"
                :suffix="(phoneCountry && `+${phoneCountry.callingCodes[0]}`) || ''"
                auto-select-first
                :rules="rules.phoneCountry"
                @change="focusPhone"
              >
                <template v-if="phoneCountry" slot="prepend-inner"
                  ><span class="d-flex"
                    ><img
                      class="phone-input--flag"
                      v-if="phoneCountry && phoneCountry.flag"
                      :src="phoneCountry.flag"
                      alt=""/></span
                ></template>
              </v-combobox>
            </v-col>
            <v-col cols="7">
              <v-text-field
                ref="phoneNumber"
                class="phone-input--number"
                type="text"
                dark
                outlined
                label="Phone Number"
                v-model="phoneNumber"
                :rules="rules.phoneNumber"
              ></v-text-field>
            </v-col>
          </v-row>

          <h4 class="mb-2 title font-weight-bold">Transportation</h4>

          <v-radio-group dark v-model="transportation" class="ma-0 d-block">
            <v-card outlined color="transparent" class="mb-2" @click="transportation = true">
              <v-card-title class="justify-space-between">
                <v-radio color="green" label="Shuttle Bus ($10/Pax)" :value="true" class="ma-0"></v-radio>
                <a @click.prevent.stop="$emit('open-shuttle-bus-info')" class="body-1 text-decoration-none"
                  >More Info</a
                >
              </v-card-title>
            </v-card>
            <v-card outlined color="transparent" class="mb-2" @click="transportation = false">
              <v-card-title>
                <v-radio color="green" label="No transportation" :value="false" class="ma-0"></v-radio>
              </v-card-title>
            </v-card>
          </v-radio-group>

          <h4 class="mb-2 title font-weight-bold">Message</h4>

          <v-textarea v-model="message" class="mb-6" dark outlined name="message" :rows="5" auto-grow></v-textarea>

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
            <span class="mr-3">Continue</span>
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
import CountriesList from '@/constants/countries-list'
import { isNumber } from 'lodash-es'
import store from '../store'

export default Vue.extend({
  name: 'booking-customer-info',
  data() {
    return {
      isFormValid: false,
      CountriesList,
      rules: {
        phoneCountry: [v => !!v || 'This field is required'],
        phoneNumber: [
          v => !!v || 'This field is required',
          v => String(v).length <= 16 || 'Phone should be valid',
          v => !/\D/.test(v) || 'Phone should be number'
        ]
      }
    }
  },
  computed: {
    phoneNumber: {
      get() {
        return store.getters['booking/bookingInfo'].phoneNumber
      },
      set(value: string) {
        store.dispatch('booking/updatePhoneNumber', value)
      }
    },
    phoneCountry: {
      get() {
        return store.getters['booking/bookingInfo'].phoneCountry
      },
      set(value: string) {
        store.dispatch('booking/updatePhoneCountry', value)
      }
    },
    message: {
      get() {
        return store.getters['booking/bookingInfo'].message
      },
      set(value: string) {
        store.dispatch('booking/updateMessage', value)
      }
    },
    transportation: {
      get() {
        return store.getters['booking/bookingInfo'].transportation
      },
      set(value: number) {
        store.dispatch('booking/updateTransportation', value)
      }
    }
  },
  methods: {
    focusPhone() {
      // @ts-ignore
      this.$refs.phoneNumber.focus()
    },
    submit() {
      this.$router.push({ name: 'booking-payment' })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.theme--dark.v-card.v-card--outlined {
  border-color: $light !important;
}
::v-deep {
  .phone-input--code {
    .v-label--active + input[type='text'] {
      margin-left: rem(24px);
    }
    .v-input__slot {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .phone-input--number .v-input__slot {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
  }
  .phone-input--flag {
    width: rem(16px);
    height: rem(16px);
  }
  .phone-input {
    .v-input__prepend-inner {
      align-self: center;
      // margin: 0 8px 0 0;
      margin: 0;
      padding: 0;
      width: 0;
    }
  }
  .theme--dark.v-icon {
    color: $light;
  }
}
</style>
