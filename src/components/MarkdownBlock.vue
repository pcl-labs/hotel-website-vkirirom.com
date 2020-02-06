<template>
  <div class="markdown-content" v-if="content" v-html="markdown(content)"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import marked from '@/plugins/marked'
export default Vue.extend({
  name: 'markdown-block',
  props: {
    content: {
      type: String
    }
  },
  methods: {
    markdown: marked
  }
})
</script>

<style lang="scss">
@import '@/styles/markdown-content.scss';
</style>
