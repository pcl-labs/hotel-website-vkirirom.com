<template>
  <div class="wrapper">
    <v-btn light @click="sendEmail()">send</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import PageHomeParrallaxHero from '@/components/PageHomeParrallaxHero.vue'

export default Vue.extend({
  name: 'kitchen-sink',
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    sendEmail() {
      console.log('send email...')
      store.dispatch('email/send')
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  // width: 1440px;
  width: 100%;
  margin: auto;
}
</style>
