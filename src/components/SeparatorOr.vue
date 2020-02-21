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
import Vue from 'vue';
export default Vue.extend({
  name: 'separator-line'
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
<style lang="scss" scoped>
.light-border {
  border-color: map-get($grey, 'lighten-1');
}
</style>
