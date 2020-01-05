<template>
  <div class="wrapper h-100">
    <!-- 1140x1192 -->
    <!-- <v-responsive :aspect-ratio="1440 / 1192"> -->
    <!-- :class="`position-absolute`" -->
    <div
      :key="index"
      v-for="(image, index) in images"
      :style="{ top: image.position.top, bottom: image.position.bottom }"
    >
      <!-- <div :style="{'background-image': `url(${})`}"></div> -->
      <img
        :aspect-ratio="image.ratio"
        @load="setItemParallax($event)"
        :data-rellax-speed="image.speed"
        :src="image.url"
        alt=""
      />
    </div>
    <!-- </v-responsive> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Rellax from 'rellax'
const images = [
  {
    url: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578237751/website-static/page-home/1_rsfcu3.png',
    ratio: 1920 / 805,
    speed: 0,
    position: { top: 0 }
  },
  {
    url: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578237752/website-static/page-home/2_h2p1ef.png',
    ratio: 1920 / 805,
    speed: -0.2,
    position: { top: 0 }
  },
  {
    url: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578237729/website-static/page-home/3_hsdxat.png',
    ratio: 1920 / 669,
    speed: -0.6,
    position: { top: '100px' }
  },
  {
    url: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578237689/website-static/page-home/4_hjrg9j.png',
    ratio: 1920 / 496,
    speed: -1.5,
    position: { top: '400px' }
  },
  {
    url: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578237745/website-static/page-home/5_znwlz3.png',
    ratio: 1920 / 964,
    speed: -2.5,
    position: { top: 'auto', bottom: 0 }
  },
  {
    url: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578237682/website-static/page-home/6_oxiucy.png',
    ratio: 1920 / 582,
    speed: -4,
    position: { top: 'auto', bottom: 0 }
  }
]

export default Vue.extend({
  name: 'page-home-parrallax-hero',
  data() {
    return {
      images
    }
  },
  methods: {
    setItemParallax(event) {
      // documentation: https://github.com/dixonandmoe/rellax
      // new Rellax(event.target.parentElement, {
      //   vertical: true,
      //   horizontal: false
      // })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';

.image-1 {
  top: rem(0px);
}
.image-2 {
  top: rem(0px);
}
.image-3 {
  top: rem(128px);
}
.image-4 {
  top: rem(600px);
}
.image-5 {
  top: rem(700px);
}
.image-6 {
  bottom: 0;
}
</style>
