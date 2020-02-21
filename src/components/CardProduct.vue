<template>
  <v-card :ripple="false" color="dark" dark flat class="mb-6 card" :to="link">
    <router-link :to="link" v-if="hasCarousel">
      <v-carousel
        :height="height"
        :cycle="false"
        :show-arrows="false"
        dark
        width="100%"
        style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
      >
        <v-carousel-item
          v-for="image in images.slice(0, 5)"
          :key="image.url"
          :src="transformCloudinaryUrl(image.url, `q_85,h_${height},f_auto,c_lfill,g_auto`)"
          class="carousel-item"
        >
        </v-carousel-item>
      </v-carousel>
    </router-link>

    <v-img
      v-else
      class="d-block"
      :src="transformCloudinaryUrl(image, `q_85,h_${height},f_auto,c_lfill,g_auto`)"
      :height="height"
    ></v-img>

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
import Vue from 'vue';
export default Vue.extend({
  name: 'card-product',
  data() {
    return {
      height: 150
    };
  },
  props: {
    image: {
      type: String
    },
    images: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    link: {
      type: String
    },
    hasCarousel: {
      default: false,
      type: Boolean
    }
  }
});
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
.carousel-item {
  background-size: contain;
}
</style>
