<template>
  <v-form
    :name="resort.name"
    method="post"
    netlify
    ref="form"
    action="/thanks"
    v-model="isFormValid"
    data-netlify="true"
  >
    <input type="hidden" name="form-name" :value="resort.name" />
    <v-row no-gutters>
      <v-col cols="12" class="">
        <!-- Full Name -->
        <h4 class="mb-2 body-2 font-weight-medium">Full Name</h4>
        <v-text-field
          v-model="name"
          outlined
          label="E.g. Bill Shan"
          name="name"
          color="light"
          type="text"
          required
          :rules="rules.name"
          dark
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" class="">
        <!-- Phone -->
        <h4 class="mb-2 body-2 font-weight-medium">Phone</h4>
        <v-row no-gutters class="phone-input align-center">
          <v-col cols="5">
            <v-combobox
              class="phone-input--code"
              dark
              color="light"
              outlined
              label="Country"
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
      </v-col>

      <v-col cols="12" class="">
        <!-- Email -->
        <h4 class="mb-2 body-2 font-weight-medium">E-mail</h4>
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
          <v-icon slot="append">$vuetify.icons.message</v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="12" class="mb-3">
        <!-- Message -->
        <h4 class="mb-2 body-2 font-weight-medium">Message</h4>
        <v-textarea
          placeholder="Write Here..."
          v-model="message"
          dark
          outlined
          name="message"
          :rows="3"
          auto-grow
        ></v-textarea>
      </v-col>

      <v-col cols="12" class="">
        <v-btn
          type="submit"
          block
          x-large
          color="primary"
          dark
          class="text-transform-none font-weight-bold dark--text"
          :disabled="!isFormValid"
        >
          <v-spacer></v-spacer>
          <span class="mr-3">Send</span>
          <v-spacer></v-spacer>
          <v-icon class="dark--text">keyboard_arrow_right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { isNumeric, isAlpha } from 'validator'
import CountriesList from '@/constants/countries-list'

export default Vue.extend({
  name: 'listing-contact-form',
  props: ['resort'],
  data() {
    return {
      isFormValid: false,
      CountriesList,
      name: '',
      email: '',
      message: '',
      phoneNumber: '',
      phoneCountry: '',
      // TODO: move validations to a helper file
      rules: {
        name: [
          v => !!v || 'Full name is required',
          v =>
            isAlpha(
              String(v)
                .split(' ')
                .join('')
            ) || 'Should contain only English letters (a-z)',
          v => v.length > 50 && 'Should be less than 50 characters'
        ],
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
        ],
        phoneCountry: [v => !!v || 'This field is required'],
        phoneNumber: [
          v => !!v || 'This field is required',
          v => String(v).length <= 16 || 'Phone should be valid',
          v => !/\D/.test(v) || 'Phone should be number'
        ]
      }
    }
  },
  methods: {
    focusPhone() {
      // @ts-ignore
      this.$refs.phoneNumber.focus()
    }
  }
})
</script>

<style lang="scss" scoped>
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
