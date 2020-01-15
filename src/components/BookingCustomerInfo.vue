<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-form v-model="isFormValid" @submit.prevent>
          <h1
            class="mb-4 font-weight-bold"
            :class="{ 'display-1': $vuetify.breakpoint.smAndDown, 'display-2': $vuetify.breakpoint.mdAndUp }"
          >
            Contact Info
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

          <h4 class="mb-2 title font-weight-bold">Special Requests?</h4>
          <v-textarea
            placeholder="Write Here..."
            v-model="message"
            class="mb-6"
            dark
            outlined
            name="message"
            :rows="5"
            auto-grow
          ></v-textarea>

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
  border-color: map-get($grey, 'lighten-1') !important;
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
    color: map-get($grey, 'lighten-1');
  }
}
</style>
