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
          <v-row dense no-gutters class="phone-input align-center">
            <v-col cols="5">
              <v-combobox
                v-model="phoneCountry"
                class="phone-input--code"
                item-color="dark"
                color="light"
                dark
                :items="CountriesList"
                item-text="name"
                auto-select-first
                label="Country code"
                :suffix="(phoneCountry && `+${phoneCountry.callingCodes[0]}`) || ''"
                outlined
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
                class="phone-input--number"
                v-model="phone"
                v-mask="'+###-####-####'"
                type="text"
                dark
                outlined
                label="Phone Number"
              ></v-text-field>
            </v-col>
          </v-row>

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
                <!-- TODO: modal -->
                <a @click.stop="" target="_blank" href="https://vkirirom.com/listing/Shuttle-Bus/" class="body-1 text-decoration-none"
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
import CountriesList from '@/constants/countries-list'

export default Vue.extend({
  name: 'booking-customer-info',
  directives: {
    mask
  },
  data() {
    return {
      phoneCountry: undefined,
      isFormValid: false,
      phone: '',
      transportation: 1,
      CountriesList
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
