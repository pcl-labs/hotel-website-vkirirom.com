<template>
  <div v-if="resort && resort.id">
    <div class="pa-0 ma-0">
      <v-layout row flex class="pa-0 mx-0 my-0">
        <v-flex class="pa-0 overflow-hidden hidden-sm-and-down">
          <v-img class="headerImage ma-0 pa-0" :src="resort.featuredImage" style="height:470px;"></v-img>
        </v-flex>
        <v-flex
          class="pa-0 ma-0 overflow-hidden hidden-sm-and-down"
          v-if="resort.images && resort.images.length>0"
          style="height:470px;"
        >
          <v-layout row flex class="pa-0 ma-0 overflow-hidden">
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 0">
              <v-img class="headerImage ma-0 pa-0" :src="resort.images[0].url" style="height:235px;"></v-img>
            </v-flex>
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 2">
              <v-img class="headerImage" :src="resort.images[2].url" style="height:235px;"></v-img>
            </v-flex>
          </v-layout>
          <v-layout row flex class="pa-0 ma-0 overflow-hidden">
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 1">
              <v-img class="headerImage" :src="resort.images[1].url" style="height:235px;"></v-img>
            </v-flex>
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 3">
              <v-img class="headerImage" :src="resort.images[3].url" style="height:235px;"></v-img>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-flex xs12 class="hidden-md-and-up">
        <v-carousel height="300px" hide-controls dark :cycle="false">
          <!-- v-if="belltent.images.length > 0" is required to avoid the error "cannot read property 'url' of undefined.
          It is needed only when we want to iterate through an array of images, or nested elements.-->
          <v-carousel-item :src="resort.featuredImage"></v-carousel-item>
          <v-carousel-item
            v-for="image in resort.images.slice(0,4)"
            v-bind:key="image.url"
            :src="image.url"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </div>
    <v-container>
      <v-layout row wrap justify-space-between style="min-height: 100vh;">
        <v-flex mb-5 class="content-column">
          <h1>{{resort.title}}</h1>
          <v-flex xs12>
            <v-layout row wrap class="mt-2 mb-2">
              <v-flex v-if="resort.categories[0].name=='blog'" class="listingInfo">Published July 5, 2019</v-flex>
              <v-flex v-if="getResortHotel().capacity" class="listingInfo">
                <v-icon size="30" color="#B9BCC1" style="margin-bottom:-5px; margin-right: 2px;">supervisor_account</v-icon>
                {{ getResortHotel().capacity }} guests
              </v-flex>
              <v-flex v-if="resort && resort.modules && resort.modules.hotel && resort.modules.hotel.roomTypes.length>0" class="listingInfo">
                <v-icon size="30" color="#B9BCC1" style="margin-bottom:-5px; margin-right: 2px;">hotel</v-icon>
                <span v-for="(roomType, index) in resort.modules.hotel.roomTypes" v-bind:key="index">
                  {{roomType.beds[0].count}}
                  {{roomType.beds[0].type}}
                  <span v-if="index != resort.modules.hotel.roomTypes.length - 1">
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
                <span>Bed(s)</span>
              </v-flex>
            </v-layout>
            <v-flex v-if="resort.description" class="mt-2">
              <div class="description">
                <vue-markdown>{{resort.description}}</vue-markdown>
              </div>
            </v-flex>
            <v-flex v-if="getResortHotel().gettingAround">
              <div class="description">
                <vue-markdown>{{getResortHotel().gettingAround}}</vue-markdown>
              </div>
            </v-flex>
            <v-flex xs12 v-if="getResortHotel().location">
              <h2 class="mb-3 mt-3" >Location</h2>
              <p>
                <a :href="getResortHotel().location">Get Directions</a>
              </p>
            </v-flex>
            <v-flex v-if="getResortHotelSpaces().length > 0">
              <h2 class="mb-3 mt-3" >Spaces</h2>
              <p>{{getResortHotelSpaces()[0]}}</p>
            </v-flex>
          </v-flex>
          <v-flex
            xs12
            v-if="((getResortRoom({roomType: 0}) || {}).amenities || []).length > 0"
          >
            <h2 class="mb-3 mt-3">Amenities</h2>
            <p>{{(getResortRoom({roomType: 0}).amenities || [])[0]}}</p>
          </v-flex>
          <v-flex v-if="getResortHotelRules().length > 0">
            <h2 class="mb-3 mt-3">Rules</h2>
            <p>{{getResortHotelRules()[0]}}</p>
          </v-flex>
        </v-flex>
        <v-flex mb-5 class="hidden-sm-and-down">
          <v-card class="bookForm" color="#191C21">
            <reservation-form-desktop :resort-slug="slug" />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <v-flex>
        <div id="bookBottom" class="hidden-md-and-up book-bottom">
          <v-flex xs12 v-if="resort.ctaText > 0">
            <p class="mb-0">
              <span style="font-size: 28px; color: #D8DADE;">&dollar;{{resort.ctaText}}+</span>
              <span>/night</span>
            </p>
          </v-flex>
          <v-flex xs12 class="hidden-md-and-up">
            <reservation-form-mobile :resort-slug="slug" />
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
    <Footer class="hidden-sm-and-down"></Footer>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
const Footer = () => import("@/components/Footer.vue");
const ReservationFormDesktop = () =>
  import("@/components/ReservationFormDesktop.vue");
const ReservationFormMobile = () =>
  import("@/components/ReservationFormMobile.vue");

const defaultResort = {
  title: "...",
  description: ""
};

export default {
  components: {
    Footer,
    VueMarkdown,
    ReservationFormDesktop,
    ReservationFormMobile
  },
  head: {
    title: function() {
      return {
        inner: (this.resort || defaultResort).title
      };
    },
    meta: function() {
      return [
        {
          name: "description",
          content: (this.resort || defaultResort).description,
          id: "desc"
        }
      ];
    }
  },
  data() {
    return {
      slug: this.$route.params.id
    };
  },
  methods: {
    init() {
      this.$store.dispatch("resort/getItemBySlug", this.slug).then(() => {
        this.$emit("updateHead");
      });
    },
    currentURL() {
      this.$store.commit('auth/updateCurrentURL', window.location.href)
    },
    getHotelRoomBeds({ roomType }) {
      const resortRoomType = this.getResortRoom({ roomType });
      return resortRoomType && resortRoomType.beds || [];
    },
    getRoomBed({ roomType, bed }) {
      const beds = this.getHotelRoomBeds({ roomType });
      return beds && beds[bed] || {};
    },
    getResortRoom({ roomType }) {
      const hotel = this.getResortHotel();
      return hotel && hotel.roomTypes && hotel.roomTypes[roomType] || {};
    },
    getResortHotelRules() {
      const hotel = this.getResortHotel();
      return hotel.rules || [];
    },
    getResortHotelSpaces() {
      const hotel = this.getResortHotel();
      return hotel.spaces || [];
    },
    getResortHotel() {
      return this.resort && this.resort.modules && this.resort.modules.hotel || {};
    }
  },
  computed: {
    resort() {
      return this.$store.getters["resort/getResort"];
    }
  },
  mounted() {
    this.init();
    this.currentURL();
  },
};
</script>

<style lang="scss">
.v-input__slot {
  margin: 0;
  height: 56px;
  /*To make the total margin:32px */
  margin-bottom: 12px;
}
html {
  scroll-behavior: smooth;
}
.v-carousel__controls {
  background: linear-gradient(0deg, #191c21 0%, rgba(25, 28, 33, 0) 50%);
  .v-icon {
    font-size: 7px !important;
    padding: 0px;
  }
}
.header {
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
  height: 464px;
  object-fit: cover;
}
.gradient {
  background-image: linear-gradient(0deg, #191c21 0%, rgba(25, 28, 33, 0) 50%);
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.headerImage {
  min-height: 100%;
  transition: 0.8s ease;
  -webkit-transition: 0.8s ease;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
@-webkit-keyframes autofill {
  to {
    color: white;
    background: transparent;
  }
}

input:-webkit-autofill {
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
}

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

.bookForm {
  width: 300px;
  border: 1px solid #E1E7ED;
  border-radius: 3px;
  padding: 23px;
  margin-left: 64px;
  .v-text-field.v-text-field--enclosed .v-text-field__details,
  .v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
    padding: 0 16px;
  }
  .theme--dark.v-icon {
    color: #b9bcc1;
  }
}

@media only screen and (min-width: 960px) {
  .content-column {
    max-width: calc(100% - 364px);
  }
}

.listingInfo {
  color: #b9bcc1;
  font-size: 16px;
  // To make the total height 32px
  padding: 1px 0;
}

.description {
  h2 {
    margin: 40px 0 16px;
  }
  h3 {
    margin: 24px 0 8px;
  }
  td {
    color: #b9bcc1;
    font-size: 16px;
    padding-right: 10px;
  }
}
.container{
  padding-top: 30px;
  padding-left: 0px;
  padding-right: 0px;
  // doing padding:0px or  0; or padding-bottom:0px or 0; creates an extra overflow scroll which is bad and should be avoided
}
@media only screen and (max-width: 600px) {
  .container{
    max-width: 292px;
  }
}
@media only screen and (min-width: 768px) {
  .container{
    max-width: 600px;
  }
}
@media only screen and (min-width: 1024px) {
  .container{
    max-width: 900px;
  }
}
</style>
