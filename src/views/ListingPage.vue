<template>
  <fragment>
    <page-header></page-header>

    <div class="page">
      <div class="page-content">
        <div class="pa-0 ma-0">
          <!-- featured images, TODO: move to separate component -->
          <v-row no-gutters class="pa-0 mx-0 my-0">
            <v-col class="pa-0 overflow-hidden hidden-sm-and-down d-md-block">
              <v-img class="image ma-0 pa-0" :src="get(resort, 'featuredImage', '')" style="height:470px;"></v-img>
            </v-col>
            <v-col
              class="pa-0 ma-0 overflow-hidden hidden-sm-and-down d-md-block"
              v-if="get(resort, 'images', []).length > 0"
              style="height:470px;"
            >
              <v-row no-gutters class="pa-0 ma-0 overflow-hidden">
                <v-col class="pa-0 overflow-hidden" v-if="get(resort, 'images', []).length > 0">
                  <v-img class="image ma-0 pa-0" :src="get(resort, 'images[0].url', '')" style="height:235px;"></v-img>
                </v-col>
                <v-col class="pa-0 overflow-hidden" v-if="get(resort, 'images', []).length > 2">
                  <v-img class="image" :src="get(resort, 'images[2].url', '')" style="height:235px;"></v-img>
                </v-col>
              </v-row>
              <v-row no-gutters class="pa-0 ma-0 overflow-hidden">
                <v-col class="pa-0 overflow-hidden" v-if="get(resort, 'images', []).length > 1">
                  <v-img class="image" :src="get(resort, 'images[1].url', '')" style="height:235px;"></v-img>
                </v-col>
                <v-col class="pa-0 overflow-hidden" v-if="get(resort, 'images', []).length > 3">
                  <v-img class="image" :src="get(resort, 'images[3].url', '')" style="height:235px;"></v-img>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- carousel -->
          <v-row no-gutters>
            <v-col cols="12" class="d-md-none">
              <v-carousel height="300px" :show-arrows="false" dark :cycle="false">
                <!-- v-if="belltent.images.length > 0" is required to avoid the error "cannot read property 'url' of undefined.
            It is needed only when we want to iterate through an array of images, or nested elements.-->
                <v-carousel-item :src="resort.featuredImage"></v-carousel-item>
                <v-carousel-item
                  v-for="image in get(resort, 'images', []).slice(0, 4)"
                  v-bind:key="image.url"
                  :src="image.url"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
        </div>

        <!-- resort text content -->
        <div class="brand-gradient">
          <v-container class="is-limited py-0 pt-6 pb-8">
            <!-- header -->
            <v-row no-gutters class="flex-column light--text mb-6">
              <v-col cols="12">
                <h1 class="mb-0 font-weight-bold light--text">{{ resort.title }}</h1>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" :md="shouldShowContactForm ? 7 : 12">
                <!-- x double / x twin beds -->
                <v-row
                  no-gutters
                  class="flex-column light--text mb-4"
                  v-if="get(resort, 'modules.hotel.roomTypes', []).length > 0"
                >
                  <v-col cols="12">
                    <div class="d-flex align-center">
                      <v-icon size="30" color="light" class="mr-2">hotel</v-icon>
                      <span
                        class="mr-1"
                        v-for="(roomType, index) in get(resort, 'modules.hotel.roomTypes', [])"
                        v-bind:key="index"
                      >
                        <span class="mr-1">
                          {{ roomType.beds[0].count }}
                          {{ roomType.beds[0].type }}
                        </span>
                        <span class="mr-1" v-if="index != get(resort, 'modules.hotel.roomTypes', []).length - 1">
                          /
                        </span>
                      </span>
                      <span>bed(s)</span>
                    </div>
                  </v-col>
                </v-row>

                <resort-description ref="roomDescriptionWrapperRef" :resort="resort"></resort-description>
              </v-col>

              <v-col cols="12" md="5" v-if="shouldShowContactForm">
                <div class="contact-form-wrapper pl-md-8">
                  <h4 class="mb-2 body-1 font-weight-medium">Contact Us</h4>
                  <v-divider light class="mb-6"></v-divider>
                  <listing-contact-form :resort="resort" />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>

      <booking-bar
        :item="resort"
        @on-start-booking="onStartBooking"
        v-if="shouldShowBookingBar"
        :title="resort.h2"
        :price="Number(resort.ctaText)"
      ></booking-bar>

      <page-footer></page-footer>
    </div>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import ResortDescription from '@/components/ResortDescription.vue'
import BookingBar from '@/components/BookingBar.vue'
import PageFooter from '@/components/PageFooter.vue'
import PageHeader from '@/components/PageHeader.vue'
import ListingContactForm from '@/components/ListingContactForm.vue'
import store from '@/store'
import { Resort } from '@/types'
import { removeOtherLanguagesExcept, getFormattedMetaDescription, getFormattedMetaTitle } from '../helpers'
import { get } from 'lodash-es'
import { appTitleTemplate } from '@/constants/app'

async function beforeRouteEnterOrUpdate(to, from, next) {
  const slug = to.params.id
  const result = await store.dispatch('resort/getItemBySlug', slug)
  next()
}

export default Vue.extend({
  name: 'listing-page',
  components: {
    ResortDescription,
    BookingBar,
    PageFooter,
    PageHeader,
    ListingContactForm
  },
  props: ['slug'],
  async beforeRouteEnter(to, from, next) {
    beforeRouteEnterOrUpdate(to, from, next)
  },
  async beforeRouteUpdate(to, from, next) {
    beforeRouteEnterOrUpdate(to, from, next)
  },
  metaInfo() {
    return {
      title: getFormattedMetaTitle((this as any).resort.title),
      titleTemplate: appTitleTemplate,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: getFormattedMetaDescription(
            removeOtherLanguagesExcept('en', (this as any).resort.description).innerText
          )
        }
      ]
    }
  },
  methods: {
    get,
    onStartBooking(): void {
      // @ts-ignore
      this.updateRoomDescriptionHTML()
    },
    updateRoomDescriptionHTML(): void {
      // @ts-ignore
      const resortRulesText = this.$refs.roomDescriptionWrapperRef.$el.innerHTML
      store.dispatch('booking/updateRoomDescriptionHTML', resortRulesText)
    }
  },
  computed: {
    resort(): Resort {
      return store.getters['resort/itemBySlug'](this.slug)
    },
    categories(): string[] {
      // @ts-ignore
      const resort = this.resort
      const categories = get(resort, 'categories', [])
      // @ts-ignore
      return categories.map(item => item.name)
    },
    shouldShowContactForm(): boolean {
      // @ts-ignore
      return !this.categories.includes('accommodations')
    },
    shouldShowBookingBar(): boolean {
      // @ts-ignore
      return this.categories.includes('accommodations')
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/utility.scss';
</style>
