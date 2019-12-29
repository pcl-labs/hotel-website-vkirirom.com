<template>
<!-- TODO: move to views/ -->
  <div v-if="resort && resort.id">
    <div class="pa-0 ma-0">
      <!-- images -->
      <v-row no-gutters class="pa-0 mx-0 my-0">
        <v-col class="pa-0 overflow-hidden d-none d-md-block">
          <v-img
            class="image ma-0 pa-0"
            :src="resort.featuredImage"
            style="height:470px;"
          ></v-img>
        </v-col>
        <v-col
          class="pa-0 ma-0 overflow-hidden d-none d-md-block"
          v-if="resort.images && resort.images.length > 0"
          style="height:470px;"
        >
          <v-row no-gutters class="pa-0 ma-0 overflow-hidden">
            <v-col class="pa-0 overflow-hidden" v-if="resort.images.length > 0">
              <v-img
                class="image ma-0 pa-0"
                :src="resort.images[0].url"
                style="height:235px;"
              ></v-img>
            </v-col>
            <v-col class="pa-0 overflow-hidden" v-if="resort.images.length > 2">
              <v-img
                class="image"
                :src="resort.images[2].url"
                style="height:235px;"
              ></v-img>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-0 ma-0 overflow-hidden">
            <v-col class="pa-0 overflow-hidden" v-if="resort.images.length > 1">
              <v-img
                class="image"
                :src="resort.images[1].url"
                style="height:235px;"
              ></v-img>
            </v-col>
            <v-col class="pa-0 overflow-hidden" v-if="resort.images.length > 3">
              <v-img
                class="image"
                :src="resort.images[3].url"
                style="height:235px;"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col xs12 class="d-md-none">
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
    <v-container class="is-limited py-0">
      <v-row
        no-gutters
        class="flex-column my-12 light--text"
        style="min-height: 100vh;"
      >
        <v-col xs12>
          <h1 class="page--title ma-0 mb-3">{{ resort.title }}</h1>
        </v-col>
        <v-col xs12>
          <v-row no-gutters class="mb-4">
            <!-- TODO: real date? -->
            <v-col v-if="resort.categories[0].name == 'blog'"
              >Published July 5, 2019</v-col
            >
            <v-col v-if="getResortHotel().capacity">
              <v-icon size="30" color="light">supervisor_account</v-icon>
              {{ getResortHotel().capacity }} guests
            </v-col>
            <v-col
              v-if="
                resort &&
                  resort.modules &&
                  resort.modules.hotel &&
                  resort.modules.hotel.roomTypes.length > 0
              "
            >
              <div class="d-flex align-center">
                <v-icon size="30" color="light" class="mr-2">hotel</v-icon>
                <span
                  class="mr-1"
                  v-for="(roomType, index) in resort.modules.hotel.roomTypes"
                  v-bind:key="index"
                >
                  <span class="mr-1">
                    {{ roomType.beds[0].count }}
                    {{ roomType.beds[0].type }}
                  </span>
                  <span
                    class="mr-1"
                    v-if="index != resort.modules.hotel.roomTypes.length - 1"
                  >
                    /
                  </span>
                </span>
                <!-- <span>
                  {{ getRoomBed({roomType, bed}).count }}
                  {{ getRoomBed({roomType, bed}).type }}
                </span>
                <span v-if="getHotelRoomBeds({roomType: 0}).length > 1">
                  /
                  {{ getRoomBed({roomType: 0, bed: 1}).count }}
                  {{ getRoomBed({roomType: 0, bed: 1}).type }}
                </span> -->
                <span>bed(s)</span>
              </div>
            </v-col>
          </v-row>
          <div>
            <div v-if="resort.description" class="mb-4">
              <div class="description">
                <vue-markdown>{{ resort.description }}</vue-markdown>
              </div>
            </div>
            <div v-if="getResortHotel().gettingAround" class="mb-4">
              <div class="description">
                <vue-markdown>{{
                  getResortHotel().gettingAround
                }}</vue-markdown>
              </div>
            </div>
            <div class="description">
              <div v-if="getResortHotel().location">
                <h2 class="mb-2">
                  Location
                </h2>
                <p>
                  <a :href="getResortHotel().location">Get Directions</a>
                </p>
              </div>
              <div v-if="getResortHotelSpaces().length > 0">
                <h2 class="mb-2">
                  Spaces
                </h2>
                <p class="normalText">{{ getResortHotelSpaces()[0] }}</p>
              </div>

              <div v-if="getResortHotelRules().length > 0">
                <h2 class="mb-2">
                  Rules
                </h2>
                <span class="normalText">{{ getResortHotelRules()[0] }}</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          xs12
          v-if="
            ((getResortRoom({ roomType: 0 }) || {}).amenities || []).length > 0
          "
        >
          <h2 class="mb-4 mt-4">
            Amenities
          </h2>
          <v-col>
            <span class="normalText">{{
              (getResortRoom({ roomType: 0 }).amenities || [])[0]
            }}</span>
          </v-col>
        </v-col>
        <!-- <reservation-form-desktop :resort-slug="slug" /> -->
      </v-row>
    </v-container>

    <booking-bar
      v-if="shouldShowBookingBar"
      :title="resort.h2"
      :price="Number(resort.ctaText)"
    ></booking-bar>

    <Footer></Footer>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
const Footer = () => import('@/components/Footer.vue')
import BookingBar from '@/components/BookingBar.vue'

const defaultResort = {
  title: '...',
  description: ''
}

export default {
  components: {
    BookingBar,
    Footer,
    VueMarkdown
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
  data() {
    return {
      slug: this.$route.params.id
    }
  },
  methods: {
    init() {
      this.$store.dispatch('resort/getItemBySlug', this.slug).then(() => {
        this.$emit('updateHead')
      })
    },
    currentURL() {
      this.$store.commit('auth/updateCurrentURL', window.location.href)
    },
    getHotelRoomBeds({ roomType }) {
      const resortRoomType = this.getResortRoom({ roomType })
      return (resortRoomType && resortRoomType.beds) || []
    },
    getRoomBed({ roomType, bed }) {
      const beds = this.getHotelRoomBeds({ roomType })
      return (beds && beds[bed]) || {}
    },
    getResortRoom({ roomType }) {
      const hotel = this.getResortHotel()
      return (hotel && hotel.roomTypes && hotel.roomTypes[roomType]) || {}
    },
    getResortHotelRules() {
      const hotel = this.getResortHotel()
      return hotel.rules || []
    },
    getResortHotelSpaces() {
      const hotel = this.getResortHotel()
      return hotel.spaces || []
    },
    getResortHotel() {
      return (
        (this.resort && this.resort.modules && this.resort.modules.hotel) || {}
      )
    }
  },
  computed: {
    resort() {
      return this.$store.getters['resort/getResort']
    },
    shouldShowBookingBar() {
      const listingType = this.$store.getters['resort/getResort'].categories[0]
        .name
        // 'accommodations', 'events', 'experiences'
      return ['accommodations'].includes(listingType)
    }
  },
  mounted() {
    this.init()
    this.currentURL()
  }
}
</script>

<style lang="scss" scoped>
#bookBottom {
  height: 80px;
  width: 100vw;
  background: #191c21;
  position: fixed;
  bottom: 0;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.page--title {
  font-size: rem(48px);
}
.description::v-deep {
  font-size: rem(16px);
  a {
    text-decoration: none;
  }
  p {
    margin-bottom: rem(16px);
  }
  h2 {
    font-size: rem(36px);
  }
  h3 {
    font-size: rem(36px);
  }
  h1 {
    font-size: rem(36px);
  }
  li {
    font-size: 16px;
  }
  td {
    font-size: 16px;
    padding-right: 10px;
  }
}
</style>
