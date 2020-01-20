<template>
  <v-card :ripple="false" color="dark" dark flat class="mb-6 card" :to="link">
    <v-img class="d-block" :src="image" height="150px"></v-img>
    <v-row no-gutters>
      <v-card-text class="pa-3">
        <div>
          <h3 class="mb-3">{{ title }}</h3>
          <p class="brand-3--text body-1" v-if="description">{{ description }}</p>
        </div>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'card-product',
  props: ['image', 'title', 'description', 'link']
})
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  min-height: 270px;
}
.v-card--link:before {
  border-radius: inherit;
}
</style>
