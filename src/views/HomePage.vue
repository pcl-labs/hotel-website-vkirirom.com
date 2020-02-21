<template>
  <div>
    <page-header></page-header>
    <div class="page">
      <div class="page-content">
        <page-home-parrallax-hero @loaded="onParallaxImagesLoaded"></page-home-parrallax-hero>

        <div class="page-home--content brand-gradient">
          <v-container class="is-limited">
            <div class="resort-description light--text">
              <div class="mt-10 mb-6 py-10">
                <h1 class="primary--text text-center mb-8">{{ resort.title }}</h1>
                <markdown-block class="body-1" :content="resort.description"></markdown-block>
              </div>
            </div>

            <h2 class="mb-6 mt-6 listTitle">Accommodation</h2>
            <v-row class="cardRow" dense>
              <v-col cols="12" sm="6" md="4" v-for="item in accommodations" :key="item.id">
                <card-product
                  :title="item.title"
                  :description="item.ctaText > 0 ? `Starting from ${item.ctaText}$ per night` : item.ctaText"
                  :image="item.featuredImage"
                  :link="'/listing/' + item.slug"
                  :has-carousel="item.images && item.images.length > 0 && !$vuetify.breakpoint.mdAndUp"
                  :images="mergeImageArray([{ url: item.featuredImage }], item.images)"
                ></card-product>
              </v-col>
            </v-row>
            <v-row no-gutters class="justify-center">
              <v-col cols="12" sm="4">
                <v-btn block large outlined dark to="/search/accommodations" class="showAllbtn">
                  Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-divider light class="d-md-none mt-4"></v-divider>
            <v-card
              :ripple="false"
              hover
              dark
              color="dark"
              style="border-radius: 3px;"
              to="/listing/Large-Company-Retreats-in-Nature-and-Team-Building"
            >
              <v-img
                height="300px"
                position="center"
                class="mt-6 pa-1 mb-6"
                src="https://res.cloudinary.com/die9ji2vn/image/upload/w_888,q_85,f_auto,c_lfill,g_auto,h_300/v1562223032/group/group-retreat_s3ksth.jpg"
              >
                <v-row no-gutters class="align-md-center fill-height">
                  <v-flex xs12 class="ma-auto">
                    <h2 class="mt-4 mt-md-0" style="color: #FFFFFF;  font-size: 36px; text-align: center;">
                      Your next corporate retreat.
                    </h2>
                  </v-flex>
                  <v-btn
                    to="/listing/Large-Company-Retreats-in-Nature-and-Team-Building"
                    dark
                    large
                    depressed
                    class="menubtn mx-auto dark--text"
                    color="primary"
                  >
                    Book Now <v-icon>keyboard_arrow_right</v-icon>
                  </v-btn>
                </v-row>
              </v-img>
            </v-card>
            <v-divider light class="d-md-none mt-4"></v-divider>
            <h2 class="mt-2 mb-6 listTitle">Experience</h2>
            <v-row class="cardRow" dense>
              <v-col cols="12" sm="6" md="4" v-for="item in experiences" :key="item.id">
                <card-product
                  :title="item.title"
                  :description="item.ctaText > 0 ? `Starting from ${item.ctaText}$ per night` : item.ctaText"
                  :image="item.featuredImage"
                  :link="'/listing/' + item.slug"
                  :has-carousel="item.images && item.images.length > 0 && !$vuetify.breakpoint.mdAndUp"
                  :images="mergeImageArray([{ url: item.featuredImage }], item.images)"
                ></card-product>
              </v-col>
            </v-row>
            <v-row no-gutters class="justify-center">
              <v-col cols="12" sm="4">
                <v-btn to="/search/experiences/" block large outlined dark class="showAllbtn">
                  Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-card
              :ripple="false"
              to="/search/menu"
              xs12
              color="dark"
              width="100%"
              class="mt-6 mb-6"
              dark
              style="border-radius: 3px;"
              hover
            >
              <v-img
                height="300px"
                class="pt-4 pl-2"
                src="https://res.cloudinary.com/die9ji2vn/image/upload/w_888,q_85,f_auto,c_lfill,g_center,h_300/v1562224268/food/Indian_bi8dn7-Original_ueby7h.jpg"
              >
                <v-row no-gutters justify-start class="mt-6 mb-2 ml-6">
                  <v-col cols="12" sm="4">
                    <h2 style="color: #FFFFFF;  font-size: 34px;">
                      “Best lunch stop in Kirirom.”
                    </h2>
                  </v-col>
                </v-row>
                <v-row class="flex-column">
                  <v-col cols="12" sm="4">
                    <v-btn dark large to="/search/menu" depressed class="menubtn ml-6 dark--text" color="primary">
                      Menu <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
            <h2 class="mb-6 listTitle">Events</h2>
            <v-row class="cardRow" dense>
              <v-col cols="12" sm="6" md="4" v-for="item in events" :key="item.id">
                <card-product
                  :title="item.title"
                  :description="item.ctaText > 0 ? `Starting from ${item.ctaText}$ per night` : item.ctaText"
                  :image="item.featuredImage"
                  :link="'/listing/' + item.slug"
                  :has-carousel="item.images && item.images.length > 0 && !$vuetify.breakpoint.mdAndUp"
                  :images="mergeImageArray([{ url: item.featuredImage }], item.images)"
                ></card-product>
              </v-col>
            </v-row>
            <v-row no-gutters class="justify-center">
              <v-flex xs12 sm4 md4 lg4>
                <v-btn to="/search/events" block large outlined dark class="showAllbtn">
                  Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
            </v-row>
            <v-flex xs12>
              <video
                preload="none"
                style="object-fit:cover;"
                onclick="this.controls=true; this.play()"
                width="100%"
                class="mt-6"
                poster="https://res.cloudinary.com/die9ji2vn/image/upload/w_888,q_85,f_auto,c_lfill,g_auto/v1561607608/Thumbnail/JPEG/thumbnail_zjzji4.jpg"
              >
                <source
                  src="https://res.cloudinary.com/die9ji2vn/video/upload/v1560320692/10000000_143443766812356_671027213277999975_n_1_hm0gxb.mp4"
                  type="video/mp4"
                />
              </video>
            </v-flex>
            <h2 class="mt-2 mb-6 listTitle">Lease</h2>
            <v-row class="cardRow" dense>
              <v-col cols="12" sm="6" md="4" v-for="item in leases" :key="item.id">
                <card-product
                  :title="item.title"
                  :description="item.ctaText > 0 ? `Starting from ${item.ctaText}$ per night` : item.ctaText"
                  :image="item.featuredImage"
                  :link="'/listing/' + item.slug"
                  :has-carousel="item.images && item.images.length > 0 && !$vuetify.breakpoint.mdAndUp"
                  :images="mergeImageArray([{ url: item.featuredImage }], item.images)"
                ></card-product>
              </v-col>
            </v-row>
            <v-row no-gutters class="justify-center">
              <v-flex xs12 sm4 md4 lg4>
                <v-btn to="/search/lease/" block large outlined dark class="showAllbtn">
                  Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
            </v-row>
            <h2 class="mb-6 mt-4 listTitle">Ecotourism</h2>
            <v-row class="cardRow" dense>
              <v-col cols="12" sm="6" md="4" lg4 v-for="item in ecotourisms" :key="item.id">
                <card-product
                  :title="item.title"
                  :description="item.ctaText > 0 ? `Starting from ${item.ctaText}$ per night` : item.ctaText"
                  :image="item.featuredImage"
                  :link="'/listing/' + item.slug"
                  :has-carousel="item.images && item.images.length > 0 && !$vuetify.breakpoint.mdAndUp"
                  :images="mergeImageArray([{ url: item.featuredImage }], item.images)"
                ></card-product>
              </v-col>
            </v-row>
            <v-row no-gutters class="justify-center">
              <v-flex xs12 sm4 md4 lg4>
                <v-btn to="/search/ecotourism/" block large outlined dark class="showAllbtn mb-6">
                  Learn More <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </v-flex>
            </v-row>
          </v-container>
        </div>
      </div>
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script lang="ts">
import { PageService } from '@/connection/resources.js';
import store from '../store';
import { getFormattedMetaTitle, getFormattedMetaDescription, removeOtherLanguagesExcept } from '../helpers';
import { appTitleTemplate } from '../constants/app';
import { Resort, ResortImage, Category } from '../types';
const PageFooter = () => import(/* webpackMode: "eager" */ '@/components/PageFooter.vue');
const MarkdownBlock = () => import(/* webpackMode: "eager" */ '@/components/MarkdownBlock.vue');
const PageHeader = () => import(/* webpackMode: "eager" */ '@/components/PageHeader.vue');
const PageHomeParrallaxHero = () => import(/* webpackMode: "eager" */ '@/components/PageHomeParrallaxHero.vue');
const CardProduct = () => import(/* webpackMode: "eager" */ '@/components/CardProduct.vue');

function visibleCount({ xs, sm, md }) {
  if (xs) {
    return 1;
  }
  if (sm) {
    return 2;
  }
  return 3;
}

export default {
  name: 'home-page',
  components: {
    PageHomeParrallaxHero,
    PageFooter,
    PageHeader,
    CardProduct,
    MarkdownBlock
  },
  async beforeRouteEnter(to, from, next) {
    store.commit('loading/updateIsSplashScreenVisible', true);

    const slug = 'home';
    await store.dispatch('resort/getItemBySlug', slug);

    next();
  },
  metaInfo() {
    return {
      title: getFormattedMetaTitle((this as any).resort.title, { titleCase: false }),
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: (this as any).resort.custom.description
        }
      ],
      script: [
        {
          vmid: 'jsonld',
          type: 'application/ld+json',
          json: (this as any).resort.custom
        }
      ]
    };
  },
  beforeCreate() {
    store.dispatch('category/getItemsByName', 'accommodations');
    store.dispatch('category/getItemsByName', 'experiences');
    store.dispatch('category/getItemsByName', 'events');
    store.dispatch('category/getItemsByName', 'ecotourism');
    store.dispatch('category/getItemsByName', 'lease');
  },
  methods: {
    mergeImageArray(listOne, listTwo) {
      return listOne.slice(0).concat(listTwo.slice(0));
    },
    onParallaxImagesLoaded() {
      this.hideSplashScreen();
    },
    hideSplashScreen() {
      (this as any).$store.commit('loading/updateIsSplashScreenVisible', false);
    }
  },
  computed: {
    resort(): Resort {
      return (this as any).$store.getters['resort/itemBySlug']('home');
    },
    accommodations(): Category[] {
      return (this as any).$store.getters['category/getItemsByName']('accommodations').slice(
        0,
        visibleCount((this as any).$vuetify.breakpoint)
      );
    },
    experiences(): Category[] {
      return (this as any).$store.getters['category/getItemsByName']('experiences').slice(
        0,
        visibleCount((this as any).$vuetify.breakpoint)
      );
    },
    events(): Category[] {
      return (this as any).$store.getters['category/getItemsByName']('events').slice(
        0,
        visibleCount((this as any).$vuetify.breakpoint)
      );
    },
    ecotourisms(): Category[] {
      return (this as any).$store.getters['category/getItemsByName']('ecotourism').slice(
        0,
        visibleCount((this as any).$vuetify.breakpoint)
      );
    },
    leases(): Category[] {
      return (this as any).$store.getters['category/getItemsByName']('lease').slice(
        0,
        visibleCount((this as any).$vuetify.breakpoint)
      );
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
<style lang="scss" scoped>
.page-header--wrapper {
  height: $header-height-xs;
  @include media-breakpoint-up(sm) {
    height: $header-height-sm;
  }
  top: 0;
  z-index: $zindex-page-header;
}

.page-home--content {
  z-index: 1;
  position: relative;
}
.cardRow {
  // height: 300px;
  overflow: hidden;
}

.menubtn {
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  text-transform: capitalize;
  margin: 0;
}
.showAllbtn {
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  max-width: 340px;
  text-transform: capitalize;
}
.headerh1 {
  color: #ffffff;

  font-size: 45px;
}
.headerh1mob {
  color: #ffffff;

  font-size: 35px;
}
.card {
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.cardTitle {
  color: #ffffff;
  font-size: 17px;
  line-height: 27px;
}
.cardSubtitle {
  font-size: 16px;
  line-height: 22px;
  color: #b9bcc1;
}
.listTitle {
  color: #d8dade;
  font-size: 28px;
}

// page-header-fade
.pageheaderfade-enter-active,
.pageheaderfade-leave-active {
  transition-duration: 700ms;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}
.pageheaderfade-enter,
.pageheaderfade-leave-active {
  opacity: 0;
  transform: translateY(rem(-$header-height-xs));
  @include media-breakpoint-up(sm) {
    transform: translateY(rem(-$header-height-sm));
  }
}
</style>
