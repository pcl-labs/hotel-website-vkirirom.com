<template>
  <div v-resize="updateBreakpoint" class="parallax-hero position-relative">
    <div class="parallax-hero--container" ref="parallaxContainer">
      <div class="layer layer-1 layer--parallax" :style="`background-image: url(${image1});`"></div>
      <div class="parallax-hero--logo d-flex justify-center align-center">
        <div>
          <!-- logo -->
          <v-img
            @load="onEndLoadingItem"
            width="396"
            height="151"
            max-width="30vw"
            contain
            class="mx-auto"
            :src="
              transformCloudinaryUrl(
                'https://res.cloudinary.com/die9ji2vn/image/upload/v1578304830/Home%20Page/logo2_qoiy2d.png',
                'f_auto'
              )
            "
          ></v-img>
        </div>
      </div>
      <div class="layer layer-2 layer--parallax" :style="`background-image: url(${image2});`"></div>
      <div class="layer layer-3 layer--parallax" :style="`background-image: url(${image3});`"></div>
      <div class="layer layer-4 layer--parallax" :style="`background-image: url(${image4});`"></div>
      <div class="layer layer-5 layer--parallax" :style="`background-image: url(${image5});`"></div>
    </div>
    <div class="layer layer-6 layer--static position-absolute" :style="`background-image: url(${image6});`"></div>

    <img @load="onEndLoadingItem" class="d-none" hidden :src="image2" alt="" />
    <img @load="onEndLoadingItem" class="d-none" hidden :src="image3" alt="" />
    <img @load="onEndLoadingItem" class="d-none" hidden :src="image4" alt="" />
    <img @load="onEndLoadingItem" class="d-none" hidden :src="image5" alt="" />
    <!-- <img loading="lazy" class="d-none" hidden :src="image6" alt="" /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getPassiveEventConfig, transformCloudinaryUrl } from '@/helpers';

const images = {
  image1: {
    xxs: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578537679/Home%20Page/1_-_376_Crop_f3kohe.png',
    xs: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578453084/Home%20Page/1_-_600_Crop_exoo15.png',
    sm: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578452929/Home%20Page/1_-_960_Crop_oa7sit.png',
    md: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578452735/Home%20Page/1_-_1264_Crop_etah3p.png',
    lg: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578391761/Home%20Page/1_xblbcz.png'
  },
  image2: {
    xxs:
      'https://res.cloudinary.com/die9ji2vn/image/upload/w_376,c_scale,q_auto:low/v1578537679/Home%20Page/2_-_376_Crop_jurubz.png',
    xs:
      'https://res.cloudinary.com/die9ji2vn/image/upload/w_600,c_scale,q_auto:low/v1578453086/Home%20Page/2_-_600_Crop_ljuk1q.png',
    sm:
      'https://res.cloudinary.com/die9ji2vn/image/upload/w_960,c_scale,q_auto:low/v1578452931/Home%20Page/2_-_960_Crop_nmuzwk.png',
    md:
      'https://res.cloudinary.com/die9ji2vn/image/upload/w_1264,c_scale,q_auto:low/v1578452735/Home%20Page/2_-_1264_Crop_oemckj.png',
    lg:
      'https://res.cloudinary.com/die9ji2vn/image/upload/w_1264,c_scale,q_auto:low/v1578304830/Home%20Page/2_sswfon.png'
  },
  image3: {
    xxs: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578537679/Home%20Page/3_-_376_Crop_hzx8pn.png',
    xs: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578453084/Home%20Page/3_-_600_Crop_oi117l.png',
    sm: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578452928/Home%20Page/3_-_960_Crop_u8unwb.png',
    md: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578452735/Home%20Page/3_-_1264_Crop_rzmbf7.png',
    lg: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578391697/Home%20Page/3_s78ihj.png'
  },
  image4: {
    xxs: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578537679/Home%20Page/4_-_376_Crop_ojxrls.png',
    xs: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578453084/Home%20Page/4_-_600_Crop_lzo0qm.png',
    sm: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578452928/Home%20Page/4_-_960_Crop_yjllbe.png',
    md: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578452734/Home%20Page/4_-_1264_Crop_b2si7p.png',
    lg: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578304829/Home%20Page/4_y2kccp.png'
  },
  image5: {
    xxs: 'https://res.cloudinary.com/die9ji2vn/image/upload/w_376/v1578537679/Home%20Page/5_-_376_Crop_kwd38n.png',
    xs: 'https://res.cloudinary.com/die9ji2vn/image/upload/w_600/v1578453084/Home%20Page/5_-_600_Crop_hv4pgh.png',
    sm: 'https://res.cloudinary.com/die9ji2vn/image/upload/w_960/v1578452928/Home%20Page/5_-_960_Crop_kxqi9o.png',
    md: 'https://res.cloudinary.com/die9ji2vn/image/upload/w_1264/v1578452735/Home%20Page/5_-_1264_Crop_j243x6.png',
    lg: 'https://res.cloudinary.com/die9ji2vn/image/upload/w_1920/v1578304830/Home%20Page/5_hqueja.png'
  },
  image6: {
    xxs: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578537678/Home%20Page/6_-_376_Crop_idycl2.png',
    xs: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578453084/Home%20Page/6_-_600_Crop_dld0qh.png',
    sm: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578452928/Home%20Page/6_-_960_Crop_yweblf.png',
    md: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578452734/Home%20Page/6_-_1264_Crop_axf4bc.png',
    lg: 'https://res.cloudinary.com/die9ji2vn/image/upload/v1578304829/Home%20Page/6-_Black_nt3cjt.png'
  }
};

export default Vue.extend({
  name: 'page-home-parrallax-hero',
  data() {
    return {
      overridedBreakpoint: '',
      loadedItems: 0,
      totalLoadingItems: 5
    };
  },
  watch: {
    loadedItems(newValue) {
      if (newValue === this.totalLoadingItems) {
        this.onEndLoadingAll();
      }
    }
  },
  mounted() {
    this.addScrollListener();
  },
  methods: {
    onEndLoadingItem(event) {
      this.loadedItems++;
    },
    onEndLoadingAll() {
      this.$emit('loaded');
    },
    updateBreakpoint() {
      const xsWidth = 376;
      // add xxs breakpoint
      if (window.innerWidth < xsWidth) {
        this.overridedBreakpoint = 'xxs';
      } else {
        this.overridedBreakpoint = '';
      }
    },
    addScrollListener() {
      const listener = (event: any) => {
        this.applyParallaxStyle();
      };
      window.addEventListener('scroll', listener, getPassiveEventConfig());

      this.$once('hook:destroyed', () => {
        document.removeEventListener('scroll', listener);
      });
    },
    applyParallaxStyle() {
      let parent = this.$refs.parallaxContainer as HTMLElement;
      if (!parent) {
        return;
      }
      let children = parent.getElementsByClassName('layer--parallax') as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < children.length; i++) {
        const translateAmount = (window.pageYOffset * i) / children.length;
        children[i].style.transform = `translateY(-${translateAmount}px)`;
      }
    },
    getImage(number, breakpointName) {
      const image = images['image' + number];

      return transformCloudinaryUrl(image[this.overridedBreakpoint || breakpointName] || image['lg'], 'f_auto');
    }
  },
  computed: {
    image1(): string {
      const breakpointName = (this as any).$vuetify.breakpoint.name;
      return this.getImage(1, breakpointName);
    },
    image2(): string {
      const breakpointName = (this as any).$vuetify.breakpoint.name;
      return this.getImage(2, breakpointName);
    },
    image3(): string {
      const breakpointName = (this as any).$vuetify.breakpoint.name;
      return this.getImage(3, breakpointName);
    },
    image4(): string {
      const breakpointName = (this as any).$vuetify.breakpoint.name;
      return this.getImage(4, breakpointName);
    },
    image5(): string {
      const breakpointName = (this as any).$vuetify.breakpoint.name;
      return this.getImage(5, breakpointName);
    },
    image6(): string {
      const breakpointName = (this as any).$vuetify.breakpoint.name;
      return this.getImage(6, breakpointName);
    }
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
<style lang="scss" scoped>
$component-height: 1600px;
$top-distance: $header-height-xs; // this is fallback only
.parallax-hero {
  --component-top-margin: #{$header-height-xs};
  @include media-breakpoint-up(sm) {
    --component-top-margin: #{$header-height-sm};
  }
  --component-height-ratio: 1.7;
  @include media-breakpoint-up(xs, $my-breakpoints) {
    --component-height-ratio: 1.55;
  }
  @include media-breakpoint-up(sm, $my-breakpoints) {
    --component-height-ratio: 1.33;
  }
  @include media-breakpoint-up(md, $my-breakpoints) {
    --component-height-ratio: 1.2;
  }
  @include media-breakpoint-up(lg, $my-breakpoints) {
    --component-height-ratio: 1;
  }
}
.parallax-hero--container {
  height: calc(#{rem($component-height)} / var(--component-height-ratio));
  display: block;
}
.layer {
  background-repeat: no-repeat;
  background-position-y: top;
  background-position-x: center;
}
.layer--parallax {
  position: fixed;
  transform: translateY(0px);
  height: calc(#{rem($component-height)} / var(--component-height-ratio));
  top: rem($header-height-xs);
  top: var(--component-top-margin);
  width: 100%;
  background-size: contain;
}
.parallax-hero--logo {
  position: fixed;
  top: rem(120px + $header-height-xs);
  top: calc(var(--component-top-margin) + #{rem(120px)} / var(--component-height-ratio));
  width: 100%;
}
// sky
.layer-1 {
  top: rem($top-distance);
  top: var(--component-top-margin);
}
// clouds
.layer-2 {
  top: rem($top-distance);
  top: var(--component-top-margin);
}
// mountains
.layer-3 {
  top: rem($top-distance + 120px);
  top: calc(var(--component-top-margin) + #{rem(120px)} / var(--component-height-ratio));
}
// far trees
.layer-4 {
  top: rem($top-distance + 440px);
  top: calc(var(--component-top-margin) + #{rem(440px)} / var(--component-height-ratio));
}
// building + dark trees
.layer-5 {
  top: rem($top-distance + 580px);
  top: calc(var(--component-top-margin) + #{rem(580px)} / var(--component-height-ratio));
}
// near trees
.layer-6 {
  height: rem(582px);
  height: calc(#{rem(582px)} / var(--component-height-ratio));
  background-position-y: bottom;
  // -1 to fix subpixel
  bottom: -1px;
  right: 0;
  left: 0;
}
</style>
