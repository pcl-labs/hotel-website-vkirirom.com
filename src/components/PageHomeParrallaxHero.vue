<template>
  <div class="wrapper">
    <div class="parallax-container" ref="parallaxContainer">
      <div
        class="layer layer-1"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578237751/website-static/page-home/1_rsfcu3.png);"
      ></div>
      <!-- <div
        id="meredith"
        style="background-image: url(https://res.cloudinary.com/whynotearth/image/upload/c_scale,q_auto:low,f_auto/v1562682607/meredith_fkpe6f.png); background-repeat: no-repeat; top:90px;"
      >
        <v-layout justify-center>
          <v-flex xs12 sm6 md6 text-xs-center class="headerText">
            <h1>Meet Meredith...</h1>
            <h2>I love cuddles lick the plastic bag, paw your face to wake you up in the morning.</h2>
          </v-flex>
        </v-layout>
      </div> -->

      <div
        class="layer layer-2"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578237752/website-static/page-home/2_h2p1ef.png);"
      ></div>
      <div
        class="layer layer-3"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578237729/website-static/page-home/3_hsdxat.png);"
      ></div>
      <div
        class="layer layer-4"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578237689/website-static/page-home/4_hjrg9j.png);"
      ></div>
      <div
        class="layer layer-5"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578237745/website-static/page-home/5_znwlz3.png);"
      ></div>
      <div
        class="layer layer-6"
        style="background-image: url(https://res.cloudinary.com/die9ji2vn/image/upload/v1578237682/website-static/page-home/6_oxiucy.png);"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getPassiveEventConfig } from '@/helpers'

export default Vue.extend({
  name: 'page-home-parrallax-hero',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // Parallax
      window.addEventListener(
        'scroll',
        () => {
          let parent = this.$refs.parallaxContainer as HTMLElement
          let children = parent.getElementsByClassName('layer') as HTMLCollectionOf<HTMLElement>
          // let meredith = document.getElementById('meredith') as HTMLElement
          // console.log('meredith', meredith);

          // meredith.style.transform = 'translateY(-' + window.pageYOffset * 0.3 + 'px)'
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
.wrapper {
  margin-top: rem($header-width);
}
.parallax-container {
  height: rem(1600px);
  display: block;
}
.parallax-container > .layer {
  position: fixed;
  transform: translateY(0px);
  height: rem(1600px);
  width: 100%;
  background-repeat: no-repeat;
  background-position-x: center;
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
  background-position-y: top;
  top: rem($header-width + 960px);
}
.headerText {
  top: 137px;
  padding: 30px;
  width: 100%;
  height: 100%;
}

.headerText h1 {
  font-size: 48px;
  color: #ffffff;
}
.headerText h2 {
  color: #ffffff;
  font-size: 32px;
}
</style>
