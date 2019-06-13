<template>
  <v-container-fluid>
    <v-container-fluid class="pa-0">
      <v-layout row flex class="pa-0 mx-0">
        <v-flex xs12 sm12 md6 class="pa-0 overflow-hidden hidden-sm-and-down">
          <v-img class="image" v-if="resort.images.length > 0" :src="resort.featuredImage" aspect-ratio="1.7"></v-img>
        </v-flex>
        <v-flex xs12 class="hidden-md-and-up">
          <v-carousel height="300px" hide-controls dark>
            <v-carousel-item :src="resort.featuredImage" class="ma-0 pa-0" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item :src="resort.images[0].url" class="ma-0 pa-0" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item :src="resort.images[1].url" class="ma-0 pa-0" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item :src="resort.images[2].url" class="ma-0 pa-0" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item :src="resort.images[3].url" class="ma-0 pa-0" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0 overflow-hidden hidden-sm-and-down">
          <v-layout row flex class="pa-0 ma-0 overflow-hidden">
            <v-flex xs12 sm6 class="pa-0 overflow-hidden">
              <v-img class="image ma-0 pa-0" v-if="resort.images.length > 0" :src="resort.images[0].url" aspect-ratio="1.7"></v-img>
            </v-flex>
            <v-flex xs12 sm6 class="pa-0 overflow-hidden">
              <v-img class="image" v-if="resort.images.length > 0" :src="resort.images[1].url" aspect-ratio="1.7"></v-img>
            </v-flex>
          </v-layout>
          <v-layout row flex class="pa-0 ma-0 overflow-hidden">
            <v-flex xs12 sm6 class="pa-0 overflow-hidden">
              <v-img class="image" v-if="resort.images.length > 0" :src="resort.images[2].url" aspect-ratio="1.7"></v-img>
            </v-flex>
            <v-flex xs12 sm6 class="pa-0 overflow-hidden">
              <v-img class="image" v-if="resort.images.length > 0" :src="resort.images[3].url" aspect-ratio="1.7"></v-img>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container-fluid>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <h1 style="color: #FFFFFF;" class="mt-2">{{resort.title}}</h1>
          <p style="font-size: 16px; color: #687C94;" class="mt-2">Entire {{resort.title}}</p>
          <div class="text-xs-left mb-5 mt-4 font-weight-regular">
            <p class="subDescription">
              <img class="mr-2" :src="MultiUsers" />
              <span class="mr-3">{{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.capacity }} guests</span>
              <!-- <span class="mr-5 font-weight-bold">{{ bedRooms.length }} bedrooms</span> -->
              <span class="mr-3">{{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].count }} Bed(s)</span>
              <span>Type: {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].type }}</span>
            </p>
          </div>
          <div class="text-xs-left font-weight-regular">
            <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
              {{resort.h2}}
            </p>
          </div>
          <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
            Location
          </h2>
          <p>
            <a href="https://goo.gl/maps/NusquSFKVm2SHrDy7" style="text-decoration:none;">Go to Location</a>
          </p>
          <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
            Spaces
          </h2>
          <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
            {{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.spaces[0]}}
          </p>
          <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
            Getting Around
          </h2>
          <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
            {{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.gettingAround}}
          </p>
          <v-layout row flex>
          <v-flex xs12 md6 class="availability">
            <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
              Availability
            </h2>
            <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">Updated 3 days ago</p>
            <Calendar
              :fullScreenMobile="false"
              :mode="'range'"
              triggerID="availability"
              monthsToShow="2"
              :showInput="false"
              :cardBorder="false"
              :showActionButtons="false"
            >
            </Calendar>
          </v-flex>
          </v-layout>
          <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
            Amenities
          </h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-layout row wrap justify-space-between align-center>
            <v-flex xs6 md6 class="py-3">
              <img :src="wifi">
              <br>
              <span style="font-size: 16px; color: #B9BCC1;">Wifi</span>
            </v-flex>
            <v-flex xs6 md6 class="py-3">
              <img :src="cutlery">
              <br>
              <span style="font-size: 16px; color: #B9BCC1;">Cutlery</span>
            </v-flex>
            <v-flex xs6 md6 class="py-3">
              <img :src="HairDryer">
              <br>
              <span style="font-size: 16px; color: #B9BCC1;">Hair Dryer</span>
            </v-flex>
            <v-flex xs6 md6 class="py-3">
              <img :src="Washer">
              <br>
              <span style="font-size: 16px; color: #B9BCC1;">Washer</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md6 class="hidden-sm-and-down">
          <v-card class="pa-4 mt-5 ml-2 bookForm" width="300px" color="#191C21" style="position:absolute; top:30%; left:59%;">
            <v-form name="bookForm"  method="post" netlify ref="form" v-model="valid" action="/thankYou">
              <input type="hidden" name="form-name" value="bookForm"/>
              <v-layout row wrap>
              <v-flex xs12>
                <p class="subheading text-xs-center pb-2">
                  <span style="font-weight: bold; font-size: 28px; color: #B9BCC1;">&dollar;{{ resort.ctaText }} </span>
                  <span style="font-size: 16px; color: #B9BCC1;"> per night</span>
                </p>
                <!-- <Rating :rating="rating" :counter="counter"/> -->
                <v-divider class="mt-3" style="background-color:#3D424E;"></v-divider>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  outline
                  label="Enter your name"
                  name="Name"
                  color="#B9BCC1"
                  required
                  dark
                  :rules="nameRules"
                >
                <v-icon slot="append" color="#B9BCC1">person_outline</v-icon>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  outline
                  color="#B9BCC1"
                  label="Enter e-mail address"
                  name="E-mail"
                  required
                  dark
                  :rules="emailRules"
                >
                <v-icon slot="append" color="#B9BCC1">email</v-icon>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  outline
                  v-model="phone"
                  label="Phone"
                  name="Phone"
                  color="#B9BCC1"
                  required
                  dark
                  :rules="phoneRules"
                >
                <v-icon slot="append" color="#B9BCC1">local_phone</v-icon>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
              <v-text-field
                outline
                dark
                type="text"
                name="Date"
                color="#B9BCC1"
                id="datepicker"
                label="Select dates"
                :rules="dateRules"
                :value="formatDates(dateOne, dateTwo)"
                >
                <v-icon slot="append" color="#B9BCC1">event</v-icon>
                </v-text-field>
              <AirbnbStyleDatepicker
                :trigger-element-id="'datepicker'"
                :mode="'range'"
                :fullscreen-mobile="false"
                :date-one="dateOne"
                :date-two="dateTwo"
                @date-one-selected="val => { dateOne = val }"
                @date-two-selected="val => { dateTwo = val }"
                offsetY="5"
                offsetX="-50"
                style="left:-70%; top:60%"
              />
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  hide-details
                  dark
                  color="#B9BCC1"
                  name="Message"
                  label="Message"
                  class="mb-4"
                >
                </v-textarea>
              </v-flex>
            </v-layout>
            <v-btn
              block
              color="#4B7F52"
              dark
              class="text-capitalize font-weight-bold form-button"
              type="submit"
              :ripple="false"
            >
              Book Now <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
            <v-flex xs12 text-xs-center class="mt-3">
              <p style="font-weight: bold; font-size: 14px; line-height: 17px; color: #B9BCC1;">
                You won't be charged yet.
              </p>
            </v-flex>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div id="bookBottom" class="hidden-md-and-up book-bottom">
          <v-flex xs12>
            <p>
              <span style="font-size: 28px; color: #D8DADE;">&dollar;{{resort.ctaText}}</span>
              <span style="font-size: 16px; color: #B9BCC1;"> per night</span>
            </p>
            <!-- <Rating :rating="rating" :counter="counter"/> -->
          </v-flex>
          <v-flex xs12 class="hidden-md-and-up">
          <v-dialog v-model="bookDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
              <v-btn
                :ripple="false"
                dark
                depressed style="box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize"
                color="#4B7F52"
                v-on="on"
              >
                Book Now <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </template>
          <v-card class="bookForm" color="#191C21">
            <v-form name="bookForm"  method="post" netlify ref="form" v-model="valid" action="/thankYou" class="ma-5">
              <input type="hidden" name="form-name" value="bookForm" />
              <v-layout row wrap>
              <v-flex xs1>
                <v-btn icon dark @click="bookDialog = false">
                  <v-icon color="#B9BCC1">close</v-icon>
                </v-btn>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs11>
                <p class="subheading text-xs-center pb-2">
                  <span style="font-weight: bold; font-size: 28px; color: #B9BCC1;">&dollar;{{ resort.ctaText }} </span>
                  <span style="font-size: 16px; color: #B9BCC1;"> per night</span>
                </p>
                <!-- <Rating :rating="rating" :counter="counter"/> -->
                <v-divider class="mt-3" style="background-color:#3D424E;"></v-divider>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  outline
                  label="Enter your name"
                  name="Name"
                  required
                  color="#B9BCC1"
                  dark
                  :rules="nameRules"
                >
                <v-icon slot="append" color="#B9BCC1">person_outline</v-icon>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  outline
                  label="Enter e-mail address"
                  name="E-mail"
                  color="#B9BCC1"
                  required
                  dark
                  :rules="emailRules"
                >
                <v-icon slot="append" color="#B9BCC1">email</v-icon>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  outline
                  v-model="phone"
                  label="Phone"
                  name="Phone"
                  color="#B9BCC1"
                  required
                  dark
                  :rules="phoneRules"
                >
                <v-icon slot="append" color="#B9BCC1">local_phone</v-icon>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
              <v-text-field
                outline
                dark
                type="text"
                name="Date"
                color="#B9BCC1"
                id="datepicker-trigger"
                label="Select dates"
                :rules="dateRules"
                :value="formatDates(dateOne, dateTwo)"
                >
                <v-icon slot="append" color="#B9BCC1">event</v-icon>
                </v-text-field>
              <AirbnbStyleDatepicker
                :trigger-element-id="'datepicker-trigger'"
                :mode="'range'"
                style="width:100%; height:100%;"
                :fullscreen-mobile="true"
                :date-one="dateOne"
                :date-two="dateTwo"
                @date-one-selected="val => { dateOne = val }"
                @date-two-selected="val => { dateTwo = val }"
              />
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  hide-details
                  dark
                  name="Message"
                  color="#B9BCC1"
                  label="Message"
                  class="mb-4"
                >
                </v-textarea>
              </v-flex>
            <v-flex xs12>
              <v-btn
              block
              color="#4B7F52"
              dark
              class="text-capitalize font-weight-bold form-button"
              type="submit"
              :ripple="false"
            >
              Book Now <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
            </v-flex>
            <v-flex xs12 text-xs-center class="mt-3">
              <p style="font-weight: bold; font-size: 14px; color: #B9BCC1;">
                You won't be charged yet.
              </p>
            </v-flex>
            </v-layout>
          </v-form>
          </v-card>
          </v-dialog>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
  </v-container-fluid>
</template>

<script>
//components

// icons
import wifi from '../assets/icons/wifi.svg';
import HairDryer from '../assets/icons/hair-dryer.svg';
import Washer from '../assets/icons/washing-machine.svg';
import cutlery from '../assets/icons/cutlery.svg';
import MultiUsers from '../assets/icons/multiple-users-silhouette.svg';
import Calendar from './Calendar.vue';
import format from 'date-fns/format';

export default {
  data(){
    return{
      components:{
        Calendar
      },

      bookDialog: false,

      // states
      dateFormat: 'D MMM',
      dateOne: '',
      dateTwo: '',

      //images
      MultiUsers,
      wifi,
      HairDryer,
      Washer,
      cutlery,

      slug: this.$route.params.id,
      resort: {
        images: []
      }
    }
  },
  methods:{
    formatDates(dateOne, dateTwo) {
      let formattedDates = '';
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat);
      }
      if (dateTwo) {
        formattedDates += ' - ' + format(dateTwo, this.dateFormat);
      }
      return formattedDates;
    },
  },
  created() {
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/'+this.slug).then(function(data){
      this.resort=data.body;
    });
  },
}
</script>

<style lang="scss">
  html {
    scroll-behavior: smooth;
  }
  .v-carousel__controls{
    background: linear-gradient(0deg, #191C21 0%, rgba(25, 28, 33, 0) 50%);
  }
  .header{
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    height: 464px;
    object-fit: cover;
  }
  .gradient{
    background-image: linear-gradient(0deg, #191C21 0%, rgba(25, 28, 33, 0) 50%);
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .subDescription{
    color:#B9BCC1;
    font-size: 16px;
  }
  .image{
    transition:  0.8s ease;
    -webkit-transition: 0.8s ease;
    &:hover {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
  // .hidden-sm-and-down .v-icon {
  //   color: #B9BCC1 !important;
  // }
  // .hidden-md-and-up .v-icon {
  //   color: #B9BCC1 !important;
  // }

#bookBottom {
  height: 80px;
  width: 100vw;
  background:#191C21;
  position: fixed;
  bottom: 0;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(0,0,0,0.12);
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
