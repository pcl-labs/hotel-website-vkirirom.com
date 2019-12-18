<template>
  <div v-if="resort" class="resort-description light--text">
    <div v-html="marked(resort.description)"></div>
    <resort-rules :resort="resort"></resort-rules>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResortRules from '@/components/ResortRules.vue'
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
  name: 'resort-description',
  props: {
    resort: {
      type: Object as () => Resort,
      required: true
    }
  },
  components: { ResortRules },
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
//
</style>
