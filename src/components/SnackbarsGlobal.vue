<template>
  <v-snackbar
    :color="model.color"
    :timeout="model.timeout"
    :bottom="model.bottom"
    :left="model.left"
    :right="model.right"
    v-model="isVisible"
  >
    {{ model.text }}
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '../store'
export default Vue.extend({
  name: 'snackbars-global',
  computed: {
    model() {
      return store.getters['snackbar/item']
    },
    isVisible: {
      get() {
        return store.getters['snackbar/item'].visible
      },
      set(value) {
        store.dispatch('snackbar/updateVisibility', value)
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
