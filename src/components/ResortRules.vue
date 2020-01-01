<template>
  <!-- v-if="hotel.id" -->
  <div class="resort-rules light--text">
    <!-- shuttle -->
    <div class="mb-12">
      <h3 :class="h3TitleClass" class="mb-4 font-weight-normal">Shuttle Bus</h3>
      <p class="mb-2">
        Shuttle bus available from PP office 15USD/pax from fixed location (extra charge 3USD/pax from other place)
      </p>
    </div>
    <!-- cancellation -->
    <div class="mb-12">
      <h3 :class="h3TitleClass" class="mb-4 font-weight-normal">Cancelation Policy</h3>
      <p class="mb-0">
        No cancellation fee if cancelling at least 24 hours in advance of check-in date. 50% charge of total stay if
        cancelling within 24 hours. Applicable to individual (non-group) customers.
      </p>
    </div>
    <!-- location -->
    <div class="mb-12" v-if="!hideLocation && resortHotel.location">
      <h3 :class="h3TitleClass" class="mb-4 font-weight-normal">
        Location
      </h3>
      <p class="mb-0">
        <a :href="resortHotel.location">Get Directions</a>
      </p>
    </div>
    <!-- spaces -->
    <div class="mb-12" v-if="get(resortHotel, 'spaces', []).length > 0">
      <h3 :class="h3TitleClass" class="mb-4 font-weight-normal">
        Spaces
      </h3>
      <p v-for="(space, index) in resortHotel.spaces" :key="index">{{ space }}</p>
    </div>
    <!-- amenities -->
    <div class="mb-12" v-if="get(resortHotel, 'amenities', []).length > 0">
      <h3 :class="h3TitleClass" class="mb-4 font-weight-normal">
        Amenities
      </h3>
      <p v-for="(amenity, index) in resortHotel.amenities" :key="index">{{ amenity }}</p>
    </div>
    <!-- rules -->
    <div class="mb-12" v-if="get(resortHotel, 'rules', []).length > 0">
      <h3 :class="h3TitleClass" class="mb-4 font-weight-normal">
        Rules
      </h3>
      <p v-for="(rule, index) in resortHotel.rules" :key="index">{{ rule }}</p>
    </div>
    <!-- getting around -->
    <!-- <div class="mb-12" v-if="get(resortHotel, 'gettingAround', '')">
      <div v-html="marked(resortHotel.gettingAround)"></div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Resort } from '@/types'
import marked from 'marked'
import { get } from 'lodash-es'

// // https://marked.js.org/
// marked.setOptions({
//   renderer: new marked.Renderer(),
//   pedantic: false,
//   gfm: true,
//   breaks: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false,
//   xhtml: false
// })

export default Vue.extend({
  name: 'resort-rules',
  props: {
    resort: {
      type: Object as () => Resort,
      required: true
    },
    hideLocation: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    h3TitleClass() {
      // @ts-ignore
      return this.$vuetify.breakpoint.mdAndUp ? 'display-1' : 'title'
    },
    resortHotel(): Resort['modules']['hotel'] {
      return get(this.resort, 'modules.hotel', {})
    }
  },
  methods: {
    get
    // marked(content) {
    //   if (!content) {
    //     return ''
    //   }
    //   return marked(content)
    // }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
</style>
