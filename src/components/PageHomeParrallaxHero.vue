<template>
  <div class="parallax-hero position-relative">
    <div class="parallax-hero--container" ref="parallaxContainer">
      <div
        class="layer layer-1 layer--parallax"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578391761/Home%20Page/1_xblbcz.png);"
      ></div>
      <div class="parallax-hero--logo d-flex justify-center align-center">
        <div>
          <v-img
            width="396"
            height="151"
            max-width="50vw"
            contain
            class="mx-auto"
            src="https://res.cloudinary.com/die9ji2vn/image/upload/v1578304830/Home%20Page/logo2_qoiy2d.png"
          ></v-img>
        </div>
      </div>

      <div
        class="layer layer-2 layer--parallax"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578304830/Home%20Page/2_sswfon.png);"
      ></div>
      <div
        class="layer layer-3 layer--parallax"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578391697/Home%20Page/3_s78ihj.png);"
      ></div>
      <div
        class="layer layer-4 layer--parallax"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578304829/Home%20Page/4_y2kccp.png);"
      ></div>
      <div
        class="layer layer-5 layer--parallax"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578304830/Home%20Page/5_hqueja.png);"
      ></div>
    </div>
    <div
      class="layer layer-6 layer--static position-absolute"
      style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578304829/Home%20Page/6-_Black_nt3cjt.png);"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getPassiveEventConfig } from '@/helpers'

export default Vue.extend({
  name: 'page-home-parrallax-hero',
  mounted() {
    this.parallax()
  },
  methods: {
    parallax() {
      // Parallax
      window.addEventListener(
        'scroll',
        () => {
          let parent = this.$refs.parallaxContainer as HTMLElement
          let children = parent.getElementsByClassName('layer--parallax') as HTMLCollectionOf<HTMLElement>
          for (let i = 0; i < children.length; i++) {
            const translateAmount = (window.pageYOffset * i) / children.length
            children[i].style.transform = `translateY(-${translateAmount}px)`
          }
        },
        getPassiveEventConfig()
      )
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
$header-width: 56px;
.parallax-hero {
  margin-top: rem($header-width);
}
.parallax-hero--container {
  height: rem(1600px);
  display: block;
}
.layer {
  background-repeat: no-repeat;
  background-position-x: center;
}
.layer--parallax {
  position: fixed;
  transform: translateY(0px);
  height: rem(1600px);
  width: 100%;
}
.parallax-hero--logo {
  position: fixed;
  top: rem(200px);
  width: 100%;
}
.layer-1 {
  background-position-y: top;
  top: rem($header-width);
}
.layer-2 {
  background-position-y: top;
  top: rem($header-width);
}
.layer-3 {
  background-position-y: top;
  top: rem($header-width + 80px);
}
.layer-4 {
  background-position-y: top;
  top: rem($header-width + 390px);
}
.layer-5 {
  background-position-y: top;
  top: rem($header-width + 550px);
}
.layer-6 {
  height: rem(582px);
  background-position-y: bottom;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
