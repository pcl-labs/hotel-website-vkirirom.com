<template>
  <div v-if="resort && resort.id">
    <div class="pa-0 ma-0">

      <!-- images -->
      <v-row no-gutters class="pa-0 mx-0 my-0">
        <v-col class="pa-0 overflow-hidden d-none d-md-block">
          <v-img class="image ma-0 pa-0" :src="resort.featuredImage" style="height:470px;"></v-img>
        </v-col>
        <v-col
          class="pa-0 ma-0 overflow-hidden d-none d-md-block"
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
        <v-col xs12 class="d-md-none">

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
    <v-container class="is-limited">
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
<<<<<<< HEAD
              <span>
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds && resort.modules.hotel.beds[0].count }} 
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds && resort.modules.hotel.beds[0].type }}
              </span>
              <span v-if="resort.modules.hotel.beds.length> 1">
                /
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds && resort.modules.hotel.beds[1].count }} 
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds && resort.modules.hotel.beds[1].type }}
              </span>
              <span>Bed(s)</span>
              </v-flex>
            </v-layout>
            <v-flex v-if="resort.description" style="height:100%" class="mt-3">
              <div class="description">
                <vue-markdown>{{resort.description}}</vue-markdown>
              </div>
            </v-flex>
            <v-flex v-if="resort.modules.hotel && resort.modules.hotel.gettingAround" style="height:100%;">
              <div class="description">
                <vue-markdown>{{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.gettingAround}}</vue-markdown>
=======
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
>>>>>>> staging
              </div>
              <div v-if="getResortHotel().location" style="height:100%;">
                <h2
                  style="font-size: 20px; line-height: 23px; color: #D8DADE;"
                  class="mb-4 mt-4"
                >Location</h2>
                <p>
                  <a :href="getResortHotel().location" style="color: #B9BCC1;">Get Directions</a>
                </p>
<<<<<<< HEAD
                <!-- <Rating :rating="rating" :counter="counter"/> -->
                <v-divider class="mb-4" style="background-color:#3D424E;"></v-divider>
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
                <v-icon slot="append" color="#B9BCC1">person</v-icon>
              </v-text-field>
              </v-flex>
              <v-flex xs12>
                <input
                  v-model="slug"
                  hidden
                  name="Property"
                  color="#B9BCC1"
                  dark
                  readonly
                >
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
              <v-flex v-if="resort.modules.hotel && resort.modules.hotel.beds.length >0">
                <v-select v-model="bedType" item-text="type" item-value="type" required :rules="bedTypeRules" return-object :items="resort.modules.hotel.beds" dark outline label="Bed Type" color="#B9BCC1" type="select">
                  <template slot="selection" slot-scope="data">
                    {{data.item.count}} {{data.item.type}}
                  </template>
                  <template slot="item" slot-scope="data">
                    <template>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{data.item.count}} {{data.item.type}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-select>
                <input hidden name="Bed count and type" :value=" bedType.count + ',' + bedType.type"/>
              </v-flex>

              <!-- resort.name is a temporary fix for category name, ideally category id should be used-->

              <v-flex xs12 v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'">
                <v-text-field
                  outline
                  dark
                  type="text"
                  name="Date"
                  color="#B9BCC1"
                  id="datepicker"
                  :label="resort.name=='accommodations'? 'Reserve Nights' : 'Reserve dates'"
                  readonly
                  :rules="dateRules"
                  :value="formatDates(dateOne, dateTwo)"
                >
                  <v-icon slot="append" color="#B9BCC1">event</v-icon>
                </v-text-field>
                <AirbnbStyleDatepicker
                  :trigger-element-id="'datepicker'"
                  :mode="'range'"
                  :fullscreen-mobile="false"
                  :min-date="new Date()"
                  :date-one="dateOne"
                  :date-two="dateTwo"
                  @date-one-selected="val => { dateOne = val, dateTwo = val }"
                  @date-two-selected="val => { dateTwo = val }"
                  style="left:-70%; top:60%;"
                  :show-shortcuts-menu-trigger="false"
                  @apply="computePrice(dateOne, dateTwo)"
                />
              </v-flex>
              <v-flex xs12 v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'">
                <v-checkbox 
                  v-model="checkbox" 
                  label="Do you need transportation?"
                  color="#B9BCC1"
                  dark
                  style="margin:0; padding:0;"
                  height="30px"
                >
                </v-checkbox>
                <input hidden name="Transportation needed" :value="checkbox" />
              </v-flex>
              <v-flex xs12 style="margin-bottom:30px;" v-if="finalPrice > 0">
                <v-layout row wrap v-for="price in prices" v-bind:key="price.id">
                  <v-flex xs6 style="font-size: 16px; color: #B9BCC1;">{{formatDates(price.date)}}</v-flex>
                  <v-flex xs6 style="font-size: 16px; color: #B9BCC1;" class="text-xs-right">${{price.amount}}</v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex XS6 style="font-size: 16px; color: #B9BCC1;">VAT (10%)</v-flex>
                  <v-flex XS6 style="font-size: 16px; color: #B9BCC1;" class="text-xs-right">${{vat}}</v-flex>
                </v-layout>
                <v-divider style="background-color:#3D424E; margin-top:20px; margin-bottom:10px;"></v-divider>
                <v-layout row wrap>
                  <v-flex xs6><h3 style="font-size: 20px; color: #D8DADE;">Total</h3></v-flex>
                  <v-flex xs6 class="text-xs-right"><h3 style="font-size: 20px; color: #D8DADE;">${{finalPrice}}</h3></v-flex>
                </v-layout>
                <input name="Amount (in $)" hidden :value="finalPrice" type="text" readonly />
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  hide-details
                  dark
                  color="#B9BCC1"
                  name="Message"
                  label="Write message here..."
                  class="mb-4"
                  height="122px"
                  no-resize
                >
                </v-textarea>
              </v-flex>
            </v-layout>
            <v-btn
              block
              color="#F7B947"
              dark
              class="text-capitalize font-weight-bold form-button"
              type="submit"
              :ripple="false"
              :disabled="!valid"
              style="height:74px;"
            >
              Reserve Now <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
            <v-flex xs12 text-xs-center class="mt-3" v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'">
              <p style="font-weight: bold; font-size: 14px; line-height: 17px; color: #B9BCC1;">
                You won't be charged yet.
              </p>
            </v-flex>
            </v-form>
=======
              </div>
              <div v-if="getResortHotelSpaces().length > 0">
                <h2
                  style="font-size: 20px; line-height: 23px; color: #D8DADE;"
                  class="mb-4 mt-4"
                >Spaces</h2>
                <p class="normalText">{{getResortHotelSpaces()[0]}}</p>
              </div>

              <div v-if="getResortHotelRules().length > 0">
                <h2 style="font-size: 20px; color: #D8DADE; height:100%;" class="mb-4">Rules</h2>
                <span class="normalText">{{getResortHotelRules()[0]}}</span>
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
          <div style="margin:80px;"></div>
        </v-col>
        <v-col md6 class="d-none d-md-block">
          <v-card
            class="bookForm"
            width="300px"
            color="#191C21"
            style="border: 1px solid #E1E7ED; border-radius: 3px; margin-top:30px; margin-bottom:30px; margin-left:77px; padding:25px;"
          >
            <reservation-form-desktop :resort-slug="slug" />
>>>>>>> staging
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row no-gutters>
      <v-col xs12>
        <div id="bookBottom" class="d-md-none book-bottom">
          <v-col xs12 v-if="resort.ctaText > 0">
            <p>
              <span style="font-size: 28px; color: #D8DADE;">&dollar;{{resort.ctaText}}+</span>
              <span class="normalText">/night</span>
            </p>
<<<<<<< HEAD
          </v-flex>
          <v-flex xs12 class="hidden-md-and-up">
          <v-dialog v-model="bookDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
              <v-btn
                :ripple="false"
                dark
                depressed style="box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize"
                color="#F7B947"
                v-on="on"
              >
                Reserve Now <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </template>
          <v-card class="bookForm" color="#191C21" style="position:absolute;">
            <v-form :name="resort.name"  method="post" netlify ref="form" v-model="valid" class="ma-5" action="/thanks" data-netlify="true">
              <input type="hidden" name="form-name" :value="resort.name" />
              <v-layout row wrap>
              <v-flex xs1>
                <v-btn icon dark @click="bookDialog = false" style="margin:0; margin-bottom:20px;">
                  <v-icon color="#B9BCC1" size="35">close</v-icon>
                </v-btn>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs11 v-if="resort.ctaText > 0">
                <p class="text-xs-center" style="margin:0; margin-bottom:20px;">
                  <span style="font-weight: bold; font-size: 28px; color: #B9BCC1;"> &dollar;{{ resort.ctaText }}+</span>
                  <span style="font-size: 16px; color: #B9BCC1;">/night</span>
                </p>
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
                <v-icon slot="append" color="#B9BCC1">person</v-icon>
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <input
                  v-model="slug"
                  hidden
                  name="Property"
                  color="#B9BCC1"
                  dark
                  readonly
                >
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

              <v-flex v-if="resort.modules.hotel && resort.modules.hotel.beds.length >0">
                <v-select v-model="bedType" item-text="count" item-value="type" :rules="bedTypeRules" return-object :items="resort.modules.hotel.beds" dark outline label="Bed Type" color="#B9BCC1" type="select">
                  <template slot="selection" slot-scope="data">
                    {{data.item.count}} {{data.item.type}}
                  </template>
                  <template slot="item" slot-scope="data">
                    <template>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{data.item.count}} {{data.item.type}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-select>
                <input hidden name="Bed count and type" :value=" bedType.count + ',' + bedType.type"/>
              </v-flex>
              <!-- resort.name is a temporary fix for category name, ideally category id should be used-->

              <v-flex xs12 v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'">
                <v-text-field
                  outline
                  dark
                  type="text"
                  name="Date"
                  readonly
                  color="#B9BCC1"
                  :label="resort.name=='accommodations'? 'Reserve Nights' : 'Reserve dates'"
                  id="datepicker-trigger"
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
                  :min-date="new Date()"
                  :date-one="dateOne"
                  :show-shortcuts-menu-trigger="false"
                  :date-two="dateTwo"
                  @date-one-selected="val => { dateOne = val, dateTwo = val }"
                  @date-two-selected="val => { dateTwo = val }"
                  @apply="computePrice(dateOne, dateTwo)"
                />
              </v-flex>
              <v-flex xs12 v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'">
                <v-checkbox 
                  v-model="checkbox" 
                  label="Do you need transportation?"
                  color="#B9BCC1"
                  dark
                  style="margin:0; padding:0;"
                  height="30px"
                >
                </v-checkbox>
                <input hidden name="Transportation needed" :value="checkbox" />
              </v-flex>
              <v-flex xs12 style="margin-bottom:30px;" v-if="finalPrice > 0">
                <v-layout row wrap v-for="price in prices" v-bind:key="price.id">
                  <v-flex xs6 style="font-size: 16px; color: #B9BCC1;">{{formatDates(price.date)}}</v-flex>
                  <v-flex xs6 style="font-size: 16px; color: #B9BCC1;" class="text-xs-right">${{price.amount}}</v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex XS6 style="font-size: 16px; color: #B9BCC1;">VAT (10%)</v-flex>
                  <v-flex XS6 style="font-size: 16px; color: #B9BCC1;" class="text-xs-right">${{vat}}</v-flex>
                </v-layout>
                <v-divider style="background-color:#3D424E; margin-top:20px; margin-bottom:10px;"></v-divider>
                <v-layout row wrap>
                  <v-flex xs6><h3 style="font-size: 20px; color: #D8DADE;">Total</h3></v-flex>
                  <v-flex xs6 class="text-xs-right"><h3 style="font-size: 20px; color: #D8DADE;">${{finalPrice}}</h3></v-flex>
                </v-layout>
                <input name="Amount (in $)" hidden :value="finalPrice" type="text" readonly />
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  outline
                  hide-details
                  dark
                  name="Message"
                  color="#B9BCC1"
                  label="Write message here..."
                  class="mb-4"
                  height="122px"
                  no-resize
                >
                </v-textarea>
              </v-flex>
            <v-flex xs12>
              <v-btn
              block
              color="#F7B947"
              dark
              class="text-capitalize font-weight-bold form-button"
              type="submit"
              :ripple="false"
              :disabled="!valid"
              style="height:74px;"
            >
              Reserve Now <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
            </v-flex>
            <v-flex xs12 text-xs-center class="mt-3" v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'">
              <p style="font-weight: bold; font-size: 14px; color: #B9BCC1;">
                You won't be charged yet.
              </p>
            </v-flex>
            </v-layout>
          </v-form>
          </v-card>
          </v-dialog>
          </v-flex>
=======
          </v-col>
          <v-col xs12 class="d-md-none">
            <reservation-form-mobile :resort-slug="slug" />
          </v-col>
>>>>>>> staging
        </div>
      </v-col>
    </v-row>
    <Footer class="d-none d-md-block"></Footer>
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
<<<<<<< HEAD
  data(){
    return{
      checkbox: false,
      toggle0:0,
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ],
      phoneRules: [
        v => !!v || 'Phone no. is required',
        v => (v || '').length <= 10 || 'A maximum of 10 characters is allowed',
        v => (v || '').length >= 9 || 'A minimum of 9 characters is needed',
        v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
      ],
      dateRules: [
        v => !!v || 'Dates are required',
      ],
      bedTypeRules: [
        (v) => !!this.bedType.count || 'Bed type is required',
      ],
      name: '',
      email: '',
      phone: '',

      bookDialog: false,

      // states
      dateFormat: 'ddd, D MMM',
      dateOne: '',
      dateTwo: '',

      slug: this.$route.params.id,

      prices: [{
      }],
      finalPrice:'',
      vat: '',
      bedType: {count:'', type:''},
      resort: {
        id: '',
        name: '',
        title:'',
        description: '',
        h2: '',
        slug: '',
        backgroundImage: '',
        featuredImage: '',
        images: [{
          order: '',
          url: '',
        }],
        ctaText: '',
        custom: '',
        modules: {
          hotel: {
            id: '',
            capacity: '',
            gettingAround: '',
            location: '',
            amenities: '',
            beds: [
              {
                id: '',
                count: '',
                type: '',
              }
            ],
            rules: '',
            spaces: []
          }
        }
      }
    }
=======
  data() {
    return {
      slug: this.$route.params.id
    };
>>>>>>> staging
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

.description {
  color: #b9bcc1;
  a {
    color: #b9bcc1;
    text-decoration: none;
  }
  p {
    font-size: rem(16px);
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
</style>
