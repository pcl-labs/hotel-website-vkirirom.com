<template>
  <div v-if="resort && resort.id">
    <div class="pa-0 ma-0">
      <!-- featured images -->
      <v-row no-gutters class="pa-0 mx-0 my-0">
        <v-col class="pa-0 overflow-hidden d-none d-md-block">
          <v-img class="image ma-0 pa-0" :src="resort.featuredImage" style="height:470px;"></v-img>
        </v-col>
        <v-col
          class="pa-0 ma-0 overflow-hidden d-none d-md-block"
          v-if="resort.images && resort.images.length > 0"
          style="height:470px;"
        >
          <v-row no-gutters class="pa-0 ma-0 overflow-hidden">
            <v-col class="pa-0 overflow-hidden" v-if="resort.images.length > 0">
              <v-img class="image ma-0 pa-0" :src="resort.images[0].url" style="height:235px;"></v-img>
            </v-col>
            <v-col class="pa-0 overflow-hidden" v-if="resort.images.length > 2">
              <v-img class="image" :src="resort.images[2].url" style="height:235px;"></v-img>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-0 ma-0 overflow-hidden">
            <v-col class="pa-0 overflow-hidden" v-if="resort.images.length > 1">
              <v-img class="image" :src="resort.images[1].url" style="height:235px;"></v-img>
            </v-col>
            <v-col class="pa-0 overflow-hidden" v-if="resort.images.length > 3">
              <v-img class="image" :src="resort.images[3].url" style="height:235px;"></v-img>
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
              v-for="image in resort.images.slice(0, 4)"
              v-bind:key="image.url"
              :src="image.url"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </div>

    <!-- resort text content -->
    <v-container class="is-limited py-0 mb-12">

      <!-- header -->
      <v-row no-gutters class="flex-column mt-8 light--text">
        <v-col cols="12">
          <h1 class="page--title ma-0 mb-3">{{ resort.title }}</h1>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters class="mb-4">
            <!-- <v-col v-if="getResortHotel().capacity">
              <v-icon size="30" color="light">supervisor_account</v-icon>
              {{ getResortHotel().capacity }} guests
            </v-col> -->
            <v-col v-if="resort && resort.modules && resort.modules.hotel && resort.modules.hotel.roomTypes.length > 0">
              <div class="d-flex align-center">
                <v-icon size="30" color="light" class="mr-2">hotel</v-icon>
                <span class="mr-1" v-for="(roomType, index) in resort.modules.hotel.roomTypes" v-bind:key="index">
                  <span class="mr-1">
                    {{ roomType.beds[0].count }}
                    {{ roomType.beds[0].type }}
                  </span>
                  <span class="mr-1" v-if="index != resort.modules.hotel.roomTypes.length - 1">
                    /
                  </span>
                </span>
                <span>bed(s)</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <resort-description :resort="resort"></resort-description>
    </v-container>

    <booking-bar v-if="shouldShowBookingBar" :title="resort.h2" :price="Number(resort.ctaText)"></booking-bar>

    <page-footer></page-footer>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import ResortDescription from '@/components/ResortDescription.vue'
import BookingBar from '@/components/BookingBar.vue'
import PageFooter from '@/components/PageFooter.vue'

const defaultResort = {
  title: '...',
  description: ''
}

export default {
  components: {
    ResortDescription,
    BookingBar,
    PageFooter
  },
  head: {
    title: function() {
      return {
        inner: (this.resort || defaultResort).title
      }
    },
    meta: function() {
      return [
        {
          name: 'description',
          content: (this.resort || defaultResort).description,
          id: 'desc'
        }
      ]
    }
  },
  methods: {
    init() {
      this.$store.dispatch('resort/getItemBySlug', this.$route.params.id).then(() => {
        this.$emit('updateHead')
      })
    }
  },
  computed: {
    resort() {
      return this.$store.getters['resort/getResort']
    },
    shouldShowBookingBar() {
      const listingType = this.$store.getters['resort/getResort'].categories[0].name
      // 'accommodations', 'events', 'experiences'
      return ['accommodations'].includes(listingType)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.page--title {
  font-size: rem(48px);
}
// .description::v-deep {
//   a {
//     text-decoration: none;
//   }
//   p {
//     margin-bottom: rem(16px);
//   }
//   h2 {
//     font-size: rem(36px);
//   }
//   h3 {
//     font-size: rem(36px);
//   }
//   h1 {
//     font-size: rem(36px);
//   }
//   li {
//     font-size: 16px;
//   }
//   td {
//     font-size: 16px;
//     padding-right: 10px;
//   }
// }
</style>
