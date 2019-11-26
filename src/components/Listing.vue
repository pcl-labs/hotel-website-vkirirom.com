<template>
  <div v-if="resort && resort.id">
    <div class="pa-0 ma-0">

      <!-- images -->
      <v-row no-gutters class="pa-0 mx-0 my-0">
        <v-col class="pa-0 overflow-hidden hidden-sm-and-down">
          <v-img class="image ma-0 pa-0" :src="resort.featuredImage" style="height:470px;"></v-img>
        </v-col>
        <v-col
          class="pa-0 ma-0 overflow-hidden hidden-sm-and-down"
          v-if="resort.images && resort.images.length>0"
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

      <v-row no-gutters>
        <v-col xs12 class="hidden-md-and-up">

          <v-carousel height="300px" :show-arrows="false" dark :cycle="false">
            <!-- v-if="belltent.images.length > 0" is required to avoid the error "cannot read property 'url' of undefined.
            It is needed only when we want to iterate through an array of images, or nested elements.-->
            <v-carousel-item :src="resort.featuredImage"></v-carousel-item>
            <v-carousel-item
              v-for="image in resort.images.slice(0,4)"
              v-bind:key="image.url"
              :src="image.url"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </div>
    <v-container>
      <v-row no-gutters style="min-height: 100vh;">
        <v-col xs12 md6>
          <v-col xs12>
            <h1 style="color: #D7D9DD; margin-top:30px;">{{resort.title}}</h1>
          </v-col>
          <v-col xs12>
            <v-row no-gutters style="height:100%">
              <v-col
                v-if="resort.categories[0].name=='blog'"
                style="font-size: 16px; color: #B9BCC1; margin-top:20px; margin-bottom:20px;"
              >Published July 5, 2019</v-col>
              <v-col
                v-if="getResortHotel().capacity"
                style="font-size: 16px; color: #B9BCC1; margin-top:20px; margin-bottom:20px;"
              >
                <v-icon size="30" color="#B9BCC1" style="margin-bottom:-5px;">supervisor_account</v-icon>
                {{ getResortHotel().capacity }} guests
              </v-col>
              <v-col
                v-if="resort && resort.modules && resort.modules.hotel && resort.modules.hotel.roomTypes.length>0"
                style="font-size: 16px; color: #B9BCC1; margin-top:20px; margin-bottom:20px;"
              >
                <v-icon size="30" color="#B9BCC1" style="margin-bottom:-5px;">hotel</v-icon>
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
              </v-col>
            </v-row>
            <div>
              <div v-if="resort.description" style="height:100%" class="mt-4">
                <div class="description">
                  <vue-markdown>{{resort.description}}</vue-markdown>
                </div>
              </div>
              <div v-if="getResortHotel().gettingAround" class="mt-4" style="height:100%;">
                <div class="description">
                  <vue-markdown>{{getResortHotel().gettingAround}}</vue-markdown>
                </div>
              </div>
              <div v-if="getResortHotel().location" style="height:100%;">
                <h2
                  style="font-size: 20px; line-height: 23px; color: #D8DADE;"
                  class="mb-4 mt-4"
                >Location</h2>
                <p>
                  <a :href="getResortHotel().location" style="color: #B9BCC1;">Get Directions</a>
                </p>
              </div>
              <div v-if="getResortHotelSpaces().length > 0">
                <h2
                  style="font-size: 20px; line-height: 23px; color: #D8DADE;"
                  class="mb-4 mt-4"
                >Spaces</h2>
                <p class="normalText">{{getResortHotelSpaces()[0]}}</p>
              </div>
            </div>
          </v-col>
          <v-col
            xs12
            v-if="((getResortRoom({roomType: 0}) || {}).amenities || []).length > 0"
          >
            <h2 style="font-size: 20px; color: #D8DADE;" class="mb-4 mt-4">Amenities</h2>
            <v-col style="height:100%;">
              <span class="normalText">{{(getResortRoom({roomType: 0}).amenities || [])[0]}}</span>
            </v-col>
          </v-col>
          <v-col v-if="getResortHotelRules().length > 0">
            <h2 style="font-size: 20px; color: #D8DADE; height:100%;" class="mb-4 mt-4">Rules</h2>
            <span class="normalText">{{getResortHotelRules()[0]}}</span>
          </v-col>
          <div style="margin:80px;"></div>
        </v-col>
        <v-col md6 class="hidden-sm-and-down">
          <v-card
            class="bookForm"
            width="300px"
            color="#191C21"
            style="border: 1px solid #E1E7ED; border-radius: 3px; margin-top:30px; margin-bottom:30px; margin-left:77px; padding:25px;"
          >
            <reservation-form-desktop :resort-slug="slug" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row no-gutters>
      <v-col xs12>
        <div id="bookBottom" class="hidden-md-and-up book-bottom">
          <v-col xs12 v-if="resort.ctaText > 0">
            <p>
              <span style="font-size: 28px; color: #D8DADE;">&dollar;{{resort.ctaText}}+</span>
              <span class="normalText">/night</span>
            </p>
          </v-col>
          <v-col xs12 class="hidden-md-and-up">
            <reservation-form-mobile :resort-slug="slug" />
          </v-col>
        </div>
      </v-col>
    </v-row>
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
  height: 55px;
  /*To make the total margin:30px */
  margin-bottom: 10px;
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
.image {
  transition: 0.8s ease;
  -webkit-transition: 0.8s ease;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
.normalText {
  font-size: 16px;
  color: #b9bcc1;
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

.description {
  a {
    color: #b9bcc1;
    text-decoration: none;
  }
  p {
    color: #b9bcc1;
    font-size: 16px;
  }
  h2 {
    color: #d8dade;
    font-size: 28px;
  }
  h3 {
    font-size: 20px;
    color: #d8dade;
  }
  h1 {
    font-size: 36px;
    color: #ffffff;
  }
  li {
    color: #b9bcc1;
    font-size: 16px;
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
