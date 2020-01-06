<template>
  <!-- v-if="hotel.id" -->
  <div class="resort-rules light--text markdown-content">
    <!-- shuttle -->
    <!-- <div >
      <h2>Shuttle Bus</h2>
      <p class="mb-2">
        Shuttle bus available from PP office 15USD/pax from fixed location (extra charge 3USD/pax from other place)
      </p>
    </div> -->
    <!-- location -->
    <div v-if="!hideLocation && resortHotel.location">
      <h2>
        Location
      </h2>
      <p>
        <a :href="resortHotel.location">Get Directions</a>
      </p>
    </div>
    <!-- spaces -->
    <div v-if="get(resortHotel, 'spaces', []).length > 0">
      <h2>
        Spaces
      </h2>
      <div v-for="(space, index) in resortHotel.spaces" :key="index" v-html="markdown(space)"></div>
    </div>
    <!-- amenities -->
    <div v-if="get(resortHotel, 'amenities', []).length > 0">
      <h2>
        Amenities
      </h2>
      <div v-for="(amenity, index) in resortHotel.amenities" :key="index" v-html="markdown(amenity)"></div>
    </div>
    <!-- rules -->
    <div v-if="get(resortHotel, 'rules', []).length > 0">
      <h2>
        Rules
      </h2>
      <div v-for="(rule, index) in resortHotel.rules" :key="index" v-html="markdown(rule)"></div>
    </div>
    <!-- getting around -->
    <div v-if="get(resortHotel, 'gettingAround', '')">
      <div v-html="markdown(resortHotel.gettingAround)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import { Resort } from '@/types'
import { markdown } from '@/helpers'
import { get } from 'lodash-es'

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
    resortHotel(): Resort['modules']['hotel'] {
      return get(this.resort, 'modules.hotel', {})
    }
  },
  methods: {
    get,
    markdown
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
@import '@/styles/markdown-content.scss';
</style>
