<template>
  <div>
    <v-row no-gutters class="mb-8">
      <v-col>
        <h1
          class="my-6 font-weight-bold"
          :class="{ 'display-1': $vuetify.breakpoint.smAndDown, 'display-2': $vuetify.breakpoint.mdAndUp }"
        >
          Thank You!
        </h1>
        <p>
          Thank you for selecting vKirirom Resort as your preferred resort. Your payment has been processed
          successfully.
        </p>
        <h2
          class="mb-2 font-weight-normal primary--text"
          :class="{ title: $vuetify.breakpoint.smAndDown, 'display-1': $vuetify.breakpoint.mdAndUp }"
        >
          vKirirom Pine Resort
        </h2>
        <v-row no-gutters class="mb-4">
          <v-col cols="12">
            Preah Soramarith-Kosamak National Park (Kirirom), Phnom Srouch District, Kompong Speu Province, Cambodia
          </v-col>
          <v-col cols="12">
            <a href="https://goo.gl/maps/wgVcvPnrqgYoB9bz7" class="light--text text-underline">Get Directions</a>
          </v-col>
        </v-row>
        <v-row no-gutters="" class="mb-6">
          <v-col
            ><v-icon class="text--light mr-2">phone</v-icon
            ><a class="light--text" href="tel:+(855) 78 777 284">+(855) 78 777 284</a></v-col
          >
          <v-col
            ><v-icon class="text--light mr-2">email</v-icon
            ><a class="light--text" href="mailto:info@vkirirom.com">info@vkirirom.com</a></v-col
          >
        </v-row>

        <h3 class="mb-2 title font-weight-bold">Room Description</h3>
        <resort-description :resort="resort"></resort-description>

        <v-btn class="mt-6" outlined="" dark large to="/"
          ><span class="mx-4">Return to Home</span><v-spacer></v-spacer><v-icon>keyboard_arrow_right</v-icon></v-btn
        >

        <!-- <div v-html="marked(resort.description)"></div> -->

        <!-- <h3 class="mb-2 title font-weight-bold">Cancelation Policy</h3>
        <v-row no-gutters class="mb-6">
          <v-col cols="12">
            No cancellation fee if cancelling at least 24 hours in advance of check-in date. 50% charge of total stay if
            cancelling within 24 hours. Applicable to individual (non-group) customers.
          </v-col>
        </v-row> -->

        <!-- <resort-rules :resort="resort"></resort-rules> -->
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
// import ResortRules from '@/components/ResortRules.vue'
import ResortDescription from '@/components/ResortDescription.vue'
import { Resort } from '../types'
import marked from 'marked'

// https://marked.js.org/
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
export default Vue.extend({
  name: 'booking-thanks',
  components: { ResortDescription },
  computed: {
    resort() {
      return store.getters['booking/bookingInfo'].resort
    }
  },
  methods: {
    marked(content) {
      if (!content) {
        return ''
      }
      return marked(content)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.v-application .theme--light.v-icon {
  color: $light;
}
</style>
