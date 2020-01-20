<template>
  <fragment>
    <page-header></page-header>
    <div class="page page-search">
      <div class="page-content brand-gradient">
        <div class="position-relative hero">
          <v-overlay :absolute="true" :value="true" :opacity="0">
            <h1
              :class="$vuetify.breakpoint.mdAndUp ? 'display-1' : 'title'"
              class="primary--text font-weight-bold text-capitalize"
            >
              {{ pageInfo.name }}
            </h1>
          </v-overlay>
          <v-img
            :aspect-ratio="2880 / 1008"
            src="https://res.cloudinary.com/die9ji2vn/image/upload/v1578657961/Home%20Page/Full_n5ibke.png"
          >
          </v-img>
        </div>
        <v-container class="is-limited light--text px-2 px-md-0 py-8" grid-list-md>
          <div class="mb-8 mt-md-10 mb-md-6 pt-md-2 pb-md-10 title font-weight-normal">
            <markdown-block :content="pageInfo.description"></markdown-block>
          </div>
          <v-flex xs12 class="headerText">
            <h1>Results for {{ id }}</h1>
            <v-flex xs12 v-if="id == 'food'">
              <p>
                “Best lunch spot in Kirirom” (Lonely Planet Guidebook).
                <br />vKirirom’s iconic open-air restaurant serves an array of international dishes to complement its
                core traditional Khmer food. The restaurant strives to create wonderful healthy food that is locally
                sourced from local farmers or grown in vKirirom’s own organic garden.
              </p>

              <p>Book your stay at vKirirom today and enjoy our array of international food!</p>
            </v-flex>
          </v-flex>
          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="resort in resorts" v-bind:key="resort.id">
              <v-card
                :ripple="false"
                color="#191C21"
                class="mb-6 card"
                width="100%"
                dark
                :to="'/listing/' + resort.slug"
                flat
              >
                <router-link :to="'/listing/' + resort.slug">
                  <v-carousel
                    height="150px"
                    :cycle="false"
                    :show-arrows="false"
                    dark
                    width="100%"
                    class="d-md-none"
                    style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                  >
                    <v-carousel-item :src="resort.featuredImage"> </v-carousel-item>
                    <v-carousel-item
                      v-for="image in resort.images.slice(0, 4)"
                      v-bind:key="image.url"
                      :src="image.url"
                      style="background-size:contain;"
                    >
                    </v-carousel-item>
                  </v-carousel>
                </router-link>
                <v-img
                  class="hidden-sm-and-down d-md-block"
                  :src="resort.featuredImage"
                  height="150px"
                  style="border-top-left-radius: 10px; border-top-right-radius: 10px;"
                ></v-img>
                <v-row no-gutters align-start>
                  <v-card-text style="margin:10px; padding: 0;">
                    <p>
                      <!-- <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{resort.title}}</span> -->
                      <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"
                        ><h3>{{ resort.title }}</h3></span
                      >
                      <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;" v-if="resort.ctaText > 0"
                        >Starting from {{ resort.ctaText }}$ per night</span
                      >
                    </p>
                  </v-card-text>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <page-footer></page-footer>
    </div>
  </fragment>
</template>

<script>
import { PageService } from '@/connection/resources.js'
const PageFooter = () => import('@/components/PageFooter.vue')
import PageHeader from '@/components/PageHeader.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import { get } from 'lodash-es'

export default {
  components: {
    PageFooter,
    PageHeader,
    MarkdownBlock
  },
  data() {
    return {
      resorts: [],
      id: this.$route.params.id
    }
  },
  created() {
    PageService.byCompanyByCategoryName({
      companySlug: 'vkirirom',
      categoryName: this.id
    }).then(data => {
      this.resorts = data
    })
  },
  computed: {
    pageInfo() {
      const resort = this.resorts[0]
      return {
        ...get(resort, 'categories[0]', {}),
        description: get(resort, 'description', '')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>

<style lang="scss" scoped>
.hero ::v-deep .v-overlay__content {
  top: -5vw;
}
.card {
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 270px;
}
.v-card--link:before {
  border-radius: inherit;
}
.headerText {
  margin-bottom: rem(32px);
  p {
    font-size: 16px;
    line-height: 22px;
    color: #b9bcc1;
  }
  h1 {
    color: #d7d9dd;
    font-size: 28px;
    margin-bottom: 20px;
  }
}
</style>
