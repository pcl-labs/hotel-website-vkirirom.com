<template>
  <!-- v-if="hotel.id" -->
  <div class="resort-rules light--text">
    <!-- <div v-if="resortHotel.location">
      <h2 class="mb-2 display-1 font-weight-bold">
        Location
      </h2>
      <p>
        <a :href="resortHotel.location">Get Directions</a>
      </p>
    </div> -->
    <div v-if="get(resortHotel, 'spaces', []).length > 0">
      <h2 class="mb-2 display-1 font-weight-bold">
        Spaces
      </h2>
      <p v-for="(space, index) in resortHotel.spaces" :key="index">{{ space }}</p>
    </div>

    <div v-if="get(resortHotel, 'amenities', []).length > 0">
      <h2 class="mb-2 display-1 font-weight-bold">
        Amenities
      </h2>
      <p v-for="(amenity, index) in resortHotel.amenities" :key="index">{{ amenity }}</p>
    </div>

    <div v-if="get(resortHotel, 'rules', []).length > 0">
      <h2 class="mb-2 display-1 font-weight-bold">
        Rules
      </h2>
      <p v-for="(rule, index) in resortHotel.rules" :key="index">{{ rule }}</p>
    </div>
    <div v-if="get(resortHotel, 'gettingAround', '')">
      <div v-html="marked(resortHotel.gettingAround)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Resort } from '@/types'
import marked from 'marked'
import { get } from 'lodash-es'

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
  name: 'resort-rules',
  props: {
    resort: {
      type: Object as () => Resort,
      required: true
    }
  },
  computed: {
    resortHotel(): Resort['modules']['hotel'] {
      return get(this.resort, 'modules.hotel', {})
    }
  },
  methods: {
    get,
    marked(content) {
      if (!content) {
        return ''
      }
      return marked(content)
    }
  }
})
</script>
