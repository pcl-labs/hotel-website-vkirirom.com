<template>
  <fragment>
    <page-header></page-header>

    <div class="page">
      <div class="page-content brand-gradient">
        <v-content class="py-0">
          <v-container class="is-limited light--text px-2 px-md-0 py-8">
            <v-row>
              <v-col cols="12">
                <h1 class="font-weight-bold">Contact</h1>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-flex xs12 md6>
                <v-form
                  name="Contact"
                  method="post"
                  netlify
                  ref="form"
                  action="/thanks"
                  v-model="valid"
                  data-netlify="true"
                >
                  <input type="hidden" name="form-name" value="Contact" />
                  <v-flex xs12>
                    <v-text-field
                      v-model="name"
                      outlined
                      label="Full Name"
                      name="name"
                      color="#B9BCC1"
                      required
                      dark
                      :rules="nameRules"
                    >
                      <v-icon slot="append" color="#B9BCC1">person</v-icon>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="email"
                      outlined
                      color="#B9BCC1"
                      label="E-Mail"
                      name="email"
                      required
                      dark
                      :rules="emailRules"
                    >
                      <v-icon slot="append" color="#B9BCC1">email</v-icon>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="phone"
                      outlined
                      label="Phone Number"
                      name="phone"
                      color="#B9BCC1"
                      required
                      dark
                      :rules="phoneRules"
                    >
                      <v-icon slot="append" color="#B9BCC1">local_phone</v-icon>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 class="mb-6">
                    <v-textarea
                      outlined
                      hide-details
                      dark
                      v-model="message"
                      color="#B9BCC1"
                      name="message"
                      label="Write message here..."
                      height="128px"
                      no-resize
                    >
                    </v-textarea>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn
                      color="primary"
                      dark
                      block
                      large
                      depressed
                      style="padding:0; margin-top:30px; margin-bottom:25px; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize; font-size: 16px; height:74px;"
                      type="submit"
                      class="dark--text"
                      :disabled="!valid"
                    >
                      Send<v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                  </v-flex>
                </v-form>
              </v-flex>

              <!-- Don't change the card text's margins, it'll mess everything up. I know it looks weird on localhost, but it aligns properly on deployment. -->

              <v-flex xs12 md6>
                <v-card width="330px" dark class="hidden-sm-and-down d-md-block card" style="margin-left:110px;">
                  <v-card-text style="padding:30px;">
                    <v-flex xs12>
                      <h2>
                        Address
                      </h2>
                      <p>
                        Preah Soramarith-Kosamak National Park (Kirirom), Phnom Srouch District, Kompong Speu Province,
                        Cambodia
                      </p>
                      <p>
                        <a href="https://goo.gl/maps/NusquSFKVm2SHrDy7">Get Directions</a>
                      </p>
                    </v-flex>
                    <v-flex xs12>
                      <h2>
                        E-Mail
                      </h2>
                      <p>
                        <a href="mailto:info@vkirirom.com">info@vkirirom.com</a>
                      </p>
                    </v-flex>
                    <v-flex xs12>
                      <h2>
                        Phone Number
                      </h2>
                      <p>
                        <a href="tel:+(855)78777284">+(855) 78 777 284</a>
                      </p>
                    </v-flex>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card width="100%" dark class="d-md-none card mb-5">
                  <v-card-text style="padding:30px;">
                    <v-flex xs12>
                      <h2>
                        Address
                      </h2>
                      <p>
                        Preah Soramarith-Kosamak National Park (Kirirom), Phnom Srouch District, Kompong Speu Province,
                        Cambodia
                      </p>
                      <p>
                        <a href="https://goo.gl/maps/NusquSFKVm2SHrDy7">Get Directions</a>
                      </p>
                    </v-flex>
                    <v-flex xs12>
                      <h2>
                        E-Mail
                      </h2>
                      <p>
                        <a href="mailto:info@vkirirom.com">info@vkirirom.com</a>
                      </p>
                    </v-flex>
                    <v-flex xs12>
                      <h2>
                        Phone Number
                      </h2>
                      <p>
                        <a href="tel:+(855)78777284">+(855) 78 777 284</a>
                      </p>
                    </v-flex>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-row>
          </v-container>
        </v-content>
      </div>
      <page-footer></page-footer>
    </div>
  </fragment>
</template>

<script>
const PageFooter = () => import('@/components/PageFooter.vue')
import PageHeader from '@/components/PageHeader.vue'
import { getFormattedMetaTitle } from '../helpers'
import { appTitleTemplate } from '@/constants/app'

export default {
  components: {
    PageFooter,
    PageHeader
  },
  metaInfo() {
    return {
      title: getFormattedMetaTitle('Contact'),
      titleTemplate: appTitleTemplate
    }
  },
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      phone: '',
      message: '',
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ],
      phoneRules: [
        v => !!v || 'Phone no. is required',
        v => (v || '').length <= 10 || 'A maximum of 10 characters is allowed',
        v => (v || '').length >= 9 || 'A minimum of 9 characters is needed',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.v-input__slot {
  margin: 0;
  height: 55px;
  /*To make the total margin:30px */
  margin-bottom: 10px;
}
.card {
  border: 1px solid #e1e7ed;
  border-radius: 3px;
  margin: 0;
  padding: 0;
  background-color: #191c21;
  h2 {
    font-size: 20px;
    color: #d8dade;
    margin-bottom: 15px;
  }
  p {
    font-size: 14px;
    color: #b9bcc1;
  }
  a {
    color: #b9bcc1;
  }
}
</style>
