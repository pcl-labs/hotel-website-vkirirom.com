<template>
  <fragment>
    <v-col cols="5">
      <v-divider class="light-border"></v-divider>
    </v-col>
    <v-col cols="2" class="text-center" style="padding:0; margin-top:-12px;">
      <span class="light--text user-select-none">or</span>
    </v-col>
    <v-col cols="5">
      <v-divider class="light-border"></v-divider>
    </v-col>
    <div class="mt-8"></div>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'separator-line'
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
.light-border {
  border-color: $light;
}
</style>
