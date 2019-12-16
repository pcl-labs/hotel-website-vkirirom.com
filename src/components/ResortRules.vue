<template>
  <!-- v-if="hotel.id" -->
  <div class="resort-rules light--text">
    <!-- <div v-if="resortHotel.location">
      <h2 class="mb-2">
        Location
      </h2>
      <p>
        <a :href="resortHotel.location">Get Directions</a>
      </p>
    </div> -->
    <div v-if="resortHotel.spaces.length > 0">
      <h2 class="mb-2">
        Spaces
      </h2>
      <p v-for="(space, index) in resortHotel.spaces" :key="index">{{ space }}</p>
    </div>

    <div v-if="resortHotel.amenities.length > 0">
      <h2 class="mb-2">
        Amenities
      </h2>
      <p v-for="(amenity, index) in resortHotel.amenities" :key="index">{{ amenity }}</p>
    </div>

    <div v-if="resortHotel.rules.length > 0">
      <h2 class="mb-2">
        Rules
      </h2>
      <p v-for="(rule, index) in resortHotel.rules" :key="index">{{ rule }}</p>
    </div>

    <div v-if="resortHotel.gettingAround">
      <div v-html="gettingAround"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Resort } from '@/types'
import marked from 'marked'
marked.setOptions({
  renderer: new marked.Renderer(),
  // highlight: function(code) {
  //   return require('highlight.js').highlightAuto(code).value
  // },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export default Vue.extend({
  name: 'resort-rules',
  computed: {
    resort(): Resort {
      return store.getters['resort/getResort']
    },
    resortHotel(): Resort['modules']['hotel'] {
      return this.resort && this.resort.modules && this.resort.modules.hotel
    },
    gettingAround(): string {
      if (!this.resortHotel) {
        return ''
      }
      return marked(this.resortHotel.gettingAround)
    }
  }
})
</script>
