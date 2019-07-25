<template>
  <div v-if="resort && resort.id">
    <div class="pa-0 ma-0">
      <v-layout row flex class="pa-0 mx-0">
        <v-flex class="pa-0 overflow-hidden hidden-sm-and-down" style="height:470px;">
          <v-img class="image ma-0 pa-0" :src="resort.featuredImage"></v-img>
        </v-flex>
        <v-flex
          class="pa-0 ma-0 overflow-hidden hidden-sm-and-down"
          v-if="resort.images && resort.images.length>0"
          style="height:470px;"
        >
          <v-layout row flex class="pa-0 ma-0 overflow-hidden" style="max-height:235px;">
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 0">
              <v-img class="image ma-0 pa-0" :src="resort.images[0].url"></v-img>
            </v-flex>
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 2">
              <v-img class="image" :src="resort.images[2].url"></v-img>
            </v-flex>
          </v-layout>
          <v-layout row flex class="pa-0 ma-0 overflow-hidden" style="max-height:235px;">
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 1">
              <v-img class="image" :src="resort.images[1].url"></v-img>
            </v-flex>
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 3">
              <v-img class="image" :src="resort.images[3].url"></v-img>
            </v-flex>
          </v-layout>
        </v-flex>
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
      </v-layout>
    </div>
    <v-container>
      <v-layout row wrap style="min-height: 100vh;">
        <v-flex xs12 md6>
          <h1 style="color: #FFFFFF; margin-top:30px;">{{resort.title}}</h1>
          <v-flex xs12>
            <v-layout row wrap style="height:100%">
              <v-flex
                v-if="resort.name=='blog'"
                style="font-size: 16px; color: #B9BCC1; margin-top:20px; margin-bottom:20px;"
              >Published July 5, 2019</v-flex>
              <v-flex
                v-if="resort.modules.hotel && resort.modules.hotel.capacity"
                style="font-size: 16px; color: #B9BCC1; margin-top:20px; margin-bottom:20px;"
              >
                <v-icon size="30" color="#B9BCC1" style="margin-bottom:-5px;">supervisor_account</v-icon>
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.capacity }} guests
              </v-flex>
              <v-flex
                v-if="resort.modules.hotel && resort.modules.hotel.roomTypes.length>0 && resort.modules.hotel.roomTypes[0].beds.length>0"
                style="font-size: 16px; color: #B9BCC1; margin-top:20px; margin-bottom:20px;"
              >
                <v-icon size="30" color="#B9BCC1" style="margin-bottom:-5px;">hotel</v-icon>
                <span>
                  {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.roomTypes && resort.modules.hotel.roomTypes[0].beds && resort.modules.hotel.roomTypes[0].beds[0].count }}
                  {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.roomTypes && resort.modules.hotel.roomTypes[0].beds && resort.modules.hotel.roomTypes[0].beds[0].type }}
                </span>
                <span v-if="resort.modules.hotel.roomTypes[0].beds.length> 1">
                  /
                  {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.roomTypes && resort.modules.hotel.roomTypes[0].beds && resort.modules.hotel.roomTypes[0].beds[1].count }}
                  {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.roomTypes && resort.modules.hotel.roomTypes[0].beds && resort.modules.hotel.roomTypes[0].beds[1].type }}
                </span>
                <span>Bed(s)</span>
              </v-flex>
            </v-layout>
            <v-flex v-if="resort.description" style="height:100%" class="mt-3">
              <div class="description">
                <vue-markdown>{{resort.description}}</vue-markdown>
              </div>
            </v-flex>
            <v-flex
              v-if="resort.modules.hotel && resort.modules.hotel.gettingAround"
              style="height:100%;"
            >
              <div class="description">
                <vue-markdown>{{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.gettingAround}}</vue-markdown>
              </div>
            </v-flex>
            <v-flex
              xs12
              v-if="resort.modules.hotel && resort.modules.hotel.location"
              style="height:100%;"
            >
              <h2
                style="font-size: 20px; line-height: 23px; color: #D8DADE;"
                class="mb-3 mt-3"
              >Location</h2>
              <p>
                <a :href="resort.modules.hotel.location" style="color: #B9BCC1;">Get Directions</a>
              </p>
            </v-flex>
            <v-flex
              v-if="resort.modules.hotel && resort.modules.hotel.spaces && resort.modules.hotel.spaces.length > 0"
            >
              <h2
                style="font-size: 20px; line-height: 23px; color: #D8DADE;"
                class="mb-3 mt-3"
              >Spaces</h2>
              <p
                class="normalText"
              >{{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.spaces[0]}}</p>
            </v-flex>
          </v-flex>
          <v-flex
            xs12
            v-if="resort.modules.hotel && resort.modules.hotel.roomTypes.length>0 && resort.modules.hotel.roomTypes[0].amenities.length >0"
          >
            <h2 style="font-size: 20px; color: #D8DADE;" class="mb-3 mt-3">Amenities</h2>
            <v-flex style="height:100%;">
              <span
                class="normalText"
              >{{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.roomTypes[0] && resort.modules.hotel.roomTypes[0].amenities[0]}}</span>
            </v-flex>
          </v-flex>
          <v-flex
            v-if="resort.modules.hotel && resort.modules.hotel.rules && resort.modules.hotel.rules.length >0"
          >
            <h2 style="font-size: 20px; color: #D8DADE; height:100%;" class="mb-3 mt-3">Rules</h2>
            <span
              class="normalText"
            >{{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.rules[0]}}</span>
          </v-flex>
          <div style="margin:80px;"></div>
        </v-flex>
        <v-flex md6 class="hidden-sm-and-down">
          <v-card
            class="bookForm"
            width="300px"
            color="#191C21"
            style="border: 1px solid #E1E7ED; border-radius: 3px; margin-top:30px; margin-bottom:30px; margin-left:77px; padding:25px;"
          >
            <reservation-form-desktop :resort-slug="slug" />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div id="bookBottom" class="hidden-md-and-up book-bottom">
          <v-flex xs12 v-if="resort.ctaText > 0">
            <p>
              <span style="font-size: 28px; color: #D8DADE;">&dollar;{{resort.ctaText}}+</span>
              <span class="normalText">/night</span>
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
  title: '...',
  description: ''
}

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
    }
  },
  computed: {
    resort() {
      return this.$store.getters["resort/getItemBySlug"](this.slug);
    }
  },
  mounted() {
    this.init();
  }
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

@media only screen and (max-width: 600px) {
  .container {
    max-width: 292px;
  }
}
@media only screen and (min-width: 768px) {
  .container {
    max-width: 600px;
  }
}
@media only screen and (min-width: 1024px) {
  .container {
    max-width: 900px;
  }
}
</style>