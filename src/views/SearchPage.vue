<template>
  <fragment>
    <page-header></page-header>
    <div class="page page-search light--text">
      <div class="page-content brand-gradient">
        <div class="position-relative hero">
          <v-overlay :absolute="true" :value="true" :opacity="0">
            <h1
              :class="$vuetify.breakpoint.mdAndUp ? 'display-1' : 'title'"
              class="primary--text font-weight-bold text-capitalize"
            >
              {{ resort.title }}
            </h1>
          </v-overlay>
          <v-img :aspect-ratio="2880 / 1008" :src="resort.backgroundImage"> </v-img>
        </div>
        <v-container class="is-limited light--text px-2 px-md-0 py-8" grid-list-md>
          <div class="mb-8 mt-md-10 mb-md-6 pt-md-2 pb-md-10 title font-weight-normal text-center">
            <markdown-block :content="resort.description"></markdown-block>
          </div>

          <v-row dense>
            <v-col cols="12" sm="6" md="4" v-for="resort in categories" :key="resort.id">
              <card-product
                :title="resort.title"
                :description="resort.ctaText ? `Starting from ${resort.ctaText}$ per night` : ''"
                :image="resort.featuredImage"
                :link="'/listing/' + resort.slug"
              ></card-product>
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
const CardProduct = () => import('@/components/CardProduct.vue')
import PageHeader from '@/components/PageHeader.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import { get } from 'lodash-es'
import store from '@/store'

export default {
  name: 'search-page',
  components: {
    PageFooter,
    PageHeader,
    MarkdownBlock,
    CardProduct
  },
  props: ['slug'],
  created() {
    store.dispatch('resort/getBySlug', this.slug)
    store.dispatch('category/getItemsByName', this.slug)
  },
  computed: {
    resort() {
      return store.getters['resort/itemBySlug'](this.slug)
    },
    categories() {
      return store.getters['category/getItemsByName'](this.slug)
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
</style>
