<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-form v-model="isFormValid" @submit.prevent>
          <h4 class="mb-2 title font-weight-bold">Guest Info</h4>
          <div v-if="countriesList.length > 0">
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
                  :items="countriesList"
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
          </div>
          <div v-else class="pt-3 mb-10 error--text">
            A network error occurred, refresh the page please.
          </div>

          <v-text-field
            class="mb-1 mt-2"
            v-model="email"
            outlined
            label="E-mail address"
            name="E-mail"
            type="email"
            color="light"
            dark
            required
            :rules="rules.email"
          >
          </v-text-field>

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

          <p v-if="contactInfoError" class="error--text" v-html="contactInfoError"></p>

          <v-btn
            @click="submit"
            x-large
            color="primary"
            dark
            class="text-transform-none font-weight-bold dark--text"
            :disabled="!isFormValid"
            :loading="isNextStepLoading"
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
import Vue from 'vue';
import { isNumber, get } from 'lodash-es';
import store from '../store';
import isEmail from 'validator/lib/isEmail';
import { countryDefault } from '../constants/app';

export default Vue.extend({
  name: 'booking-customer-info',
  data() {
    return {
      isFormValid: false,
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
          v => isEmail(v) || 'E-mail must be valid'
        ],
        phoneCountry: [v => !!v || 'This field is required'],
        phoneNumber: [
          v => !!v || 'This field is required',
          v => String(v).length <= 16 || 'Phone should be valid',
          v => !/\D/.test(v) || 'Phone should be number'
        ]
      }
    };
  },
  async mounted() {
    this.resetLoadingAndError();
    this.phoneCountry = this.countriesList.find(item => item.name === countryDefault);
  },
  computed: {
    isNextStepLoading() {
      return (this as any).$store.getters['booking/isNextStepLoading'];
    },
    contactInfoError() {
      return (this as any).$store.getters['booking/contactInfoError'];
    },
    isAuthenticated() {
      return (this as any).$store.getters['auth/isAuthenticated'];
    },
    countriesList() {
      return (this as any).$store.getters['booking/countriesList'];
    },
    phoneNumber: {
      get() {
        return (this as any).$store.getters['booking/bookingInfo'].phoneNumber;
      },
      set(value: string) {
        (this as any).$store.dispatch('booking/updatePhoneNumber', value);
      }
    },
    email: {
      get() {
        return (this as any).$store.getters['booking/bookingInfo'].email;
      },
      set(value: string) {
        (this as any).$store.dispatch('booking/updateEmail', value);
      }
    },
    phoneCountry: {
      get() {
        return (this as any).$store.getters['booking/bookingInfo'].phoneCountry;
      },
      set(value: string) {
        (this as any).$store.dispatch('booking/updatePhoneCountry', value);
      }
    },
    message: {
      get() {
        return (this as any).$store.getters['booking/bookingInfo'].message;
      },
      set(value: string) {
        (this as any).$store.dispatch('booking/updateMessage', value);
      }
    }
  },
  methods: {
    focusPhone() {
      // @ts-ignore
      this.$refs.phoneNumber.focus();
    },
    async submit() {
      this.$store.dispatch('booking/updateIsNextStepLoading', true);
      this.$store.dispatch('booking/updateContactInfoError', '');
      try {
        await this.handleAuthentication();
        this.$router.push({ name: 'booking-payment' });
      } catch (error) {}
      this.$store.dispatch('booking/updateIsNextStepLoading', false);
    },
    handleAuthentication() {
      if (!this.isAuthenticated) {
        return this.registerAuto();
      }
    },
    async registerAuto() {
      try {
        await this.$store.dispatch('auth/registerAuto', { email: this.email });
        await store.dispatch('auth/ping');
      } catch (error) {
        const message = get(error, 'response.data[0].description') || error.message;
        this.$store.dispatch('booking/updateContactInfoError', message);
        throw error;
      }
    },
    resetLoadingAndError() {
      this.$store.dispatch('booking/updateContactInfoError', '');
      this.$store.dispatch('booking/updateIsNextStepLoading', false);
    }
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
<style lang="scss" scoped>
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
