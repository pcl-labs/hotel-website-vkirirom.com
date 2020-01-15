<template>
  <fragment>
    <div
      v-for="(paragraph, index) in markdownInside(content)"
      :key="index"
      :class="paragraph.className"
      v-html="markdown(paragraph.text)"
    ></div>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import { markdown, markdownInside } from '@/helpers'
export default Vue.extend({
  name: 'markdown-block',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    markdown,
    markdownInside
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/markdown-content.scss';
</style>
