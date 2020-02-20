<template>
  <!-- v-if="hotel.id" -->
  <div class="resort-rules light--text markdown-content">
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
      <markdown-block v-for="(space, index) in resortHotel.spaces" :key="index" :content="space"></markdown-block>
    </div>
    <!-- amenities -->
    <div v-if="get(resortHotel, 'amenities', []).length > 0">
      <h2>
        Amenities
      </h2>
      <markdown-block
        v-for="(amenity, index) in resortHotel.amenities"
        :key="index"
        :content="amenity"
      ></markdown-block>
    </div>
    <!-- rules -->
    <div v-if="get(resortHotel, 'rules', []).length > 0">
      <h2>
        Rules
      </h2>
      <markdown-block v-for="(rule, index) in resortHotel.rules" :key="index" :content="rule"></markdown-block>
    </div>

    <!-- getting around -->
    <div v-if="get(resortHotel, 'gettingAround', '')">
      <markdown-block :content="resortHotel.gettingAround"></markdown-block>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { Resort } from '@/types';
import { get } from 'lodash-es';
const MarkdownBlock = () => import('@/components/MarkdownBlock.vue');

export default Vue.extend({
  name: 'resort-rules',
  components: { MarkdownBlock },
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
      return get(this.resort, 'modules.hotel', {});
    }
  },
  methods: {
    get
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
@import '@/styles/markdown-content.scss';
</style>
