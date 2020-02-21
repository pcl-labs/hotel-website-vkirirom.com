<template>
  <v-snackbar
    :color="model.color"
    :class="model.class"
    :timeout="model.timeout"
    :bottom="model.bottom"
    :left="model.left"
    :right="model.right"
    v-model="isVisible"
  >
    {{ model.text }}

    <v-btn
      v-if="model.button.text"
      :class="model.button.class"
      :color="model.button.color"
      @click="model.button.action()"
      >{{ model.button.text }}</v-btn
    >
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../store';
export default Vue.extend({
  name: 'snackbars-global',
  computed: {
    model() {
      return (this as any).$store.getters['snackbar/item'];
    },
    isVisible: {
      get() {
        return (this as any).$store.getters['snackbar/item'].visible;
      },
      set(value) {
        (this as any).$store.dispatch('snackbar/updateVisibility', value);
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
