<template>
  <fragment>
    <page-splash-screen v-if="shouldShowSplashScreen" :visibility-timeout="6000"></page-splash-screen>
    <page-header></page-header>
    <div class="page">
      <div class="page-content">
        <page-home-parrallax-hero @loaded="shouldShowSplashScreen = false"></page-home-parrallax-hero>

        <div class="page-home--content brand-gradient">
          <v-container class="is-limited">
            <h2 class="mb-6 mt-6 listTitle">Accommodation</h2>
            <v-row class="cardRow" dense>
              <v-col cols="12" sm="6" md="4" v-bind:key="accommodation.id" v-for="accommodation in accommodations">
                <v-card
                  :ripple="false"
                  dark
                  height="270px"
                  color="#191C21"
                  class="mb-6 card"
                  :to="'/listing/' + accommodation.slug"
                  flat
                >
                  <router-link :to="'/listing/' + accommodation.slug">
                    <v-carousel
                      height="150px"
                      :cycle="false"
                      :show-arrows="false"
                      dark
                      width="100%"
                      class="d-md-none"
                      v-if="accommodation.images && accommodation.images.length > 0"
                      style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                    >
                      <v-carousel-item :src="accommodation.featuredImage" style="background-size:contain;">
                      </v-carousel-item>
                      <v-carousel-item
                        v-for="image in accommodation.images.slice(0, 4)"
                        v-bind:key="image.url"
                        :src="image.url"
                        style="background-size:contain;"
                      >
                      </v-carousel-item>
                    </v-carousel>
                  </router-link>
                  <v-img
                    :src="accommodation.featuredImage"
                    height="150px"
                    class="hidden-sm-and-down d-md-block"
                    style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                  ></v-img>
                  <v-row no-gutters align-start>
                    <v-card-text style="margin:10px; padding: 0;">
                      <span class="cardTitle"
                        ><h3>{{ accommodation.title }}</h3></span
                      >
                      <span class="cardSubtitle" v-if="accommodation.ctaText > 0"
                        >Starting from {{ accommodation.ctaText }}$ per night</span
                      >
                    </v-card-text>
                  </v-row>
                </v-card>
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
              color="#191C21"
              style="border-radius: 3px;"
              to="/listing/Large-Company-Retreats-in-Nature-and-Team-Building"
            >
              <v-img
                height="300px"
                position="center"
                class="mt-6 pa-1 mb-6"
                src="https://res.cloudinary.com/die9ji2vn/image/upload/dpr_auto/f_auto/q_auto:best,w_888,f_auto/v1562223032/group/group-retreat_s3ksth.jpg"
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
              <v-col cols="12" sm="6" md="4" v-for="experience in experiences.slice(0, 4)" v-bind:key="experience.id">
                <v-card
                  :ripple="false"
                  width="100%"
                  height="270px"
                  color="#191C21"
                  class="mb-6 card"
                  dark
                  :to="'/listing/' + experience.slug"
                  flat
                  style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;"
                >
                  <router-link :to="'/listing/' + experience.slug">
                    <v-carousel
                      height="150px"
                      :cycle="false"
                      :show-arrows="false"
                      dark
                      width="100%"
                      class="d-md-none"
                      v-if="experience.images && experience.images.length > 0"
                      style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                    >
                      <v-carousel-item :src="experience.featuredImage" style="background-size:contain;">
                      </v-carousel-item>
                      <v-carousel-item
                        v-for="image in experience.images.slice(0, 4)"
                        v-bind:key="image.url"
                        :src="image.url"
                        style="background-size:contain;"
                      >
                      </v-carousel-item>
                    </v-carousel>
                  </router-link>
                  <v-img
                    :src="experience.featuredImage"
                    height="150px"
                    class="hidden-sm-and-down d-md-block"
                    style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                  ></v-img>
                  <v-row no-gutters align-start>
                    <v-card-text style="margin:10px; padding: 0;">
                      <span class="cardTitle"
                        ><h3>{{ experience.title }}</h3></span
                      >
                      <span class="cardSubtitle" v-if="experience.ctaText > 0"
                        >Starting from {{ experience.ctaText }}$ per night</span
                      >
                    </v-card-text>
                  </v-row>
                </v-card>
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
              color="#191C21"
              width="100%"
              class="mt-6 mb-6"
              dark
              style="border-radius: 3px;"
              hover
            >
              <v-img
                height="300px"
                class="pt-4 pl-2"
                src="https://res.cloudinary.com/die9ji2vn/image/upload/dpr_auto/w_auto/q_auto:low/f_auto/v1562224268/food/Indian_bi8dn7-Original_ueby7h.jpg"
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
              <v-col cols="12" sm="6" md="4" v-for="event in events.slice(0, 4)" v-bind:key="event.id">
                <v-card
                  :ripple="false"
                  width="100%"
                  height="270px"
                  color="#191C21"
                  class="mb-6 card"
                  dark
                  :to="'/listing/' + event.slug"
                  flat
                  style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;"
                >
                  <router-link :to="'/listing/' + event.slug">
                    <v-carousel
                      height="150px"
                      :cycle="false"
                      :show-arrows="false"
                      dark
                      width="100%"
                      class="d-md-none"
                      v-if="event.images && event.images.length > 0"
                      style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                    >
                      <v-carousel-item :src="event.featuredImage" style="background-size:contain;"> </v-carousel-item>
                      <v-carousel-item
                        v-for="image in event.images.slice(0, 4)"
                        v-bind:key="image.url"
                        :src="image.url"
                        style="background-size:contain;"
                      >
                      </v-carousel-item>
                    </v-carousel>
                  </router-link>
                  <v-img
                    :src="event.featuredImage"
                    height="150px"
                    class="hidden-sm-and-down d-md-block"
                    style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                  ></v-img>
                  <v-row no-gutters align-start>
                    <v-card-text style="margin:10px; padding: 0;">
                      <span class="cardTitle"
                        ><h3>{{ event.title }}</h3></span
                      >
                      <span class="cardSubtitle" v-if="event.ctaText > 0"
                        >Starting from {{ event.ctaText }}$ per night</span
                      >
                    </v-card-text>
                  </v-row>
                </v-card>
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
                style="object-fit:cover;"
                onclick="this.controls=true; this.play()"
                width="100%"
                class="mt-6"
                poster="https://res.cloudinary.com/die9ji2vn/image/upload/dpr_auto/w_auto/q_auto:low/f_auto/v1561607608/Thumbnail/JPEG/thumbnail_zjzji4.jpg"
              >
                <source
                  src="https://res.cloudinary.com/die9ji2vn/video/upload/v1560320692/10000000_143443766812356_671027213277999975_n_1_hm0gxb.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </v-flex>
            <h2 class="mt-2 mb-6 listTitle">Lease</h2>
            <v-row class="cardRow" dense>
              <v-col cols="12" sm="6" md="4" v-for="lease in leases.slice(0, 4)" v-bind:key="lease.id">
                <v-card
                  :ripple="false"
                  width="100%"
                  height="270px"
                  color="#191C21"
                  class="mb-6 card"
                  dark
                  :to="'/listing/' + lease.slug"
                  flat
                  style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;"
                >
                  <router-link :to="'/listing/' + lease.slug">
                    <v-carousel
                      height="150px"
                      :cycle="false"
                      :show-arrows="false"
                      dark
                      width="100%"
                      class="d-md-none"
                      v-if="lease.images && lease.images.length > 0"
                      style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                    >
                      <v-carousel-item :src="lease.featuredImage" style="background-size:contain;"> </v-carousel-item>
                      <v-carousel-item
                        v-for="image in lease.images.slice(0, 4)"
                        v-bind:key="image.url"
                        :src="image.url"
                        style="background-size:contain;"
                      >
                      </v-carousel-item>
                    </v-carousel>
                  </router-link>
                  <v-img
                    :src="lease.featuredImage"
                    height="150px"
                    class="hidden-sm-and-down d-md-block"
                    style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                  ></v-img>
                  <v-row no-gutters align-start>
                    <v-card-text style="margin:10px; padding: 0;">
                      <span class="cardTitle"
                        ><h3>{{ lease.title }}</h3></span
                      >
                      <span class="cardSubtitle" v-if="lease.ctaText > 0"
                        >Starting from {{ lease.ctaText }}$ per night</span
                      >
                    </v-card-text>
                  </v-row>
                </v-card>
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
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg4
                v-for="ecotourism in ecotourisms.slice(0, 4)"
                v-bind:key="ecotourism.id"
              >
                <v-card
                  :ripple="false"
                  width="100%"
                  height="270px"
                  class="mb-6 card"
                  dark
                  color="#191C21"
                  :to="'/listing/' + ecotourism.slug"
                  flat
                  style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;"
                >
                  <router-link :to="'/listing/' + ecotourism.slug">
                    <v-carousel
                      :show-arrows="false"
                      :cycle="false"
                      dark
                      width="100%"
                      height="150px"
                      class="d-md-none"
                      v-if="ecotourism.images && ecotourism.images.length > 0"
                      style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                    >
                      <v-carousel-item :src="ecotourism.featuredImage" style="background-size:contain;">
                      </v-carousel-item>
                      <v-carousel-item
                        v-for="image in ecotourism.images.slice(0, 4)"
                        v-bind:key="image.url"
                        :src="image.url"
                        style="background-size:contain;"
                      >
                      </v-carousel-item>
                    </v-carousel>
                  </router-link>
                  <v-img
                    :src="ecotourism.featuredImage"
                    height="150px"
                    class="hidden-sm-and-down d-md-block"
                    style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                  ></v-img>
                  <v-row no-gutters align-start>
                    <v-card-text style="margin:10px; padding: 0;">
                      <span class="cardTitle"
                        ><h3>{{ ecotourism.title }}</h3></span
                      >
                      <span class="cardSubtitle" v-if="ecotourism.ctaText > 0"
                        >Starting from {{ ecotourism.ctaText }}$ per night</span
                      >
                    </v-card-text>
                  </v-row>
                </v-card>
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
  </fragment>
</template>

<script lang="ts">
import { PageService } from '@/connection/resources.js'
import store from '../store'
import { getFormattedMetaTitle, getFormattedMetaDescription, removeOtherLanguagesExcept } from '../helpers'
import { appTitleTemplate } from '../constants/app'
import { Resort } from '../types'
import PageSplashScreen from '@/components/PageSplashScreen.vue'
const PageHeader = () => import('@/components/PageHeader.vue')
const PageFooter = () => import('@/components/PageFooter.vue')
const PageHomeParrallaxHero = () => import('@/components/PageHomeParrallaxHero.vue')

export default {
  name: 'home-page',
  components: {
    PageHomeParrallaxHero,
    PageFooter,
    PageHeader,
    PageSplashScreen
  },
  async beforeRouteEnter(to, from, next) {
    const slug = 'home'
    await store.dispatch('resort/getItemBySlug', slug)
    console.log(performance.now())

    next()
  },
  metaInfo() {
    return {
      title: getFormattedMetaTitle((this as any).resort.title, { titleCase: false }),
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: getFormattedMetaDescription(
            removeOtherLanguagesExcept('en', (this as any).resort.description).innerText
          )
        }
      ],
      script: [
        {
          vmid: 'jsonld',
          type: 'application/ld+json',
          json: (this as any).resort.custom
        }
      ]
    }
  },
  data() {
    return {
      accommodations: [],
      experiences: [],
      events: [],
      ecotourisms: [],
      leases: [],
      shouldShowSplashScreen: true
    }
  },
  computed: {
    resort(): Resort {
      return store.getters['resort/itemBySlug']('home')
    }
  },
  created() {
    // TODO: move to store actions
    PageService.byCompanyByCategoryName({
      companySlug: 'vkirirom',
      categoryName: 'accommodations'
    }).then(data => {
      // @ts-ignore
      this.accommodations = data.slice(0, 3)
    })
    PageService.byCompanyByCategoryName({
      companySlug: 'vkirirom',
      categoryName: 'experiences'
    }).then(data => {
      // @ts-ignore
      this.experiences = data.slice(0, 3)
    })
    PageService.byCompanyByCategoryName({
      companySlug: 'vkirirom',
      categoryName: 'events'
    }).then(data => {
      // @ts-ignore
      this.events = data.slice(0, 3)
    })
    PageService.byCompanyByCategoryName({
      companySlug: 'vkirirom',
      categoryName: 'ecotourism'
    }).then(data => {
      // @ts-ignore
      this.ecotourisms = data.slice(0, 3)
    })
    PageService.byCompanyByCategoryName({
      companySlug: 'vkirirom',
      categoryName: 'lease'
    }).then(data => {
      // @ts-ignore
      this.leases = data.slice(0, 3)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';

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
  height: 300px;
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
