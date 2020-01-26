<template>
  <div v-if="resort" class="resort-description light--text">
    <div class="mb-12">
      <markdown-block :content="resort.description"></markdown-block>
    </div>
    <resort-rules :resort="resort"></resort-rules>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResortRules from '@/components/ResortRules.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import { Resort } from '../types'

export default Vue.extend({
  name: 'resort-description',
  props: {
    resort: {
      type: Object as () => Resort,
      required: true
    }
  },
  components: { ResortRules, MarkdownBlock }
})
</script>
