<template>
  <v-progress-linear
    class="ma-0 page-progress-bar w-100"
    :active="loading"
    color="primary"
    :indeterminate="true"
    height="4"
  >
  </v-progress-linear>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
export default Vue.extend({
  computed: {
    loading() {
      return (this as any).$store.getters['loading/isLoading'];
    }
  }
});
</script>

<style lang="scss" scoped>
.page-progress-bar {
  top: -2px;
  position: fixed;
  z-index: 250;
}
</style>

<style lang="scss">
.dialog--is-open .page-progress-bar {
  display: none !important;
}
</style>
