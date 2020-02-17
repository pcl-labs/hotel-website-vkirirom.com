<template>
  <v-form :name="formName" method="post" netlify ref="form" action="/thanks" v-model="isFormValid" data-netlify="true">
    <input type="hidden" name="form-name" :value="formName" />
    <input :value="resort.slug" hidden name="Property" readonly />

    <v-row no-gutters>
      <v-col cols="12" class="">
        <!-- Full Name -->
        <h4 class="mb-2 body-2 font-weight-medium">Full Name</h4>
        <v-text-field
          v-model="name"
          outlined
          label="E.g. Bill Shan"
          name="Name"
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
        <v-text-field
          class="phone-input--number"
          type="text"
          dark
          outlined
          label="Phone Number"
          name="Phone"
          v-model="phoneNumber"
          :rules="rules.phoneNumber"
        ></v-text-field>
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
          name="Message"
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
import { get } from 'lodash-es'

export default Vue.extend({
  name: 'listing-contact-form',
  props: ['resort'],
  computed: {
    formName() {
      return get(this.resort, 'categories[0].name', 'uncategoriesed')
    }
  },
  data() {
    return {
      isFormValid: false,
      name: '',
      email: '',
      message: '',
      phoneNumber: '',
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
        phoneNumber: [
          v => !!v || 'This field is required',
          v => String(v).length <= 16 || 'Phone should be valid',
          v => !/\D/.test(v) || 'Phone should be number'
        ]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep {
  .theme--dark.v-icon {
    color: map-get($grey, 'lighten-1');
  }
}
</style>
