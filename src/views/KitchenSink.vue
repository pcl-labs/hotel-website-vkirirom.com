<template>
  <div class="wrapper">
    <page-home-parrallax-hero></page-home-parrallax-hero>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import PageHomeParrallaxHero from '@/components/PageHomeParrallaxHero.vue'

export default Vue.extend({
  name: 'booking-dialog',
  components: { PageHomeParrallaxHero },
  data() {
    return {}
  },
  computed: {},
  methods: {}
})
</script>

<style lang="scss" scoped>
.wrapper {
  // width: 1440px;
  width: 100%;
  margin: auto;
}
</style>
