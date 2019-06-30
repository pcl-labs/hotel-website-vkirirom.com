<template>
  <v-container-fluid>
    <v-container-fluid class="pa-0 ma-0">
      <v-layout row flex class="pa-0 mx-0">
        <v-flex class="pa-0 overflow-hidden hidden-sm-and-down">
          <v-img class="image ma-0 pa-0" :src="resort.featuredImage"></v-img>
        </v-flex>
        <v-flex class="pa-0 ma-0 overflow-hidden hidden-sm-and-down" v-if="resort.images">
          <v-layout row flex class="pa-0 ma-0 overflow-hidden">
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 0">
              <v-img class="image ma-0 pa-0" :src="resort.images[0].url"></v-img>
            </v-flex>
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 1">
              <v-img class="image" :src="resort.images[1].url"></v-img>
            </v-flex>
          </v-layout>
          <v-layout row flex class="pa-0 ma-0 overflow-hidden">
            <v-flex class="pa-0 overflow-hidden" v-if="resort.images.length > 2" >
              <v-img class="image" :src="resort.images[2].url"></v-img>
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
            <v-carousel-item :src="resort.featuredImage">
            </v-carousel-item>
            <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[0].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="resort.images.length > 1" :src="resort.images[1].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="resort.images.length > 2" :src="resort.images[2].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="resort.images.length > 3" :src="resort.images[3].url" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container-fluid>
    <v-container>
      <v-layout row wrap style="height:100%">
        <v-flex xs12 md6>
          <h1 style="color: #FFFFFF; margin-top:30px;">{{resort.title}}</h1>
          <v-flex xs12>
            <v-layout row wrap style="height:100%">
              <v-flex v-if="resort.modules.hotel.capacity" style="font-size: 16px; color: #B9BCC1; margin-top:20px; margin-bottom:20px;">
                <v-icon size="30" color="#B9BCC1" style="margin-bottom:-5px;">supervisor_account</v-icon> 
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.capacity }} guests
              </v-flex>
              <v-flex v-if="resort.modules.hotel.beds && resort.modules.hotel.beds.length> 0" style="font-size: 16px; line-height: 19px; color: #B9BCC1; margin-top:20px; margin-bottom:20px;">
                <v-icon size="30" color="#B9BCC1" style="margin-bottom:-5px;">hotel</v-icon>
              <span>
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds && resort.modules.hotel.beds[0].count }} 
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds && resort.modules.hotel.beds[0].type }}
              </span>
              <span v-if="resort.modules.hotel.beds.length> 1">
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds && resort.modules.hotel.beds[1].count }} 
                {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds && resort.modules.hotel.beds[1].type }}
              </span>
              <span>Bed(s)</span>
              </v-flex>
            </v-layout>
            <v-flex v-if="resort.description" style="height:100%" class="mt-3">
              <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
                {{resort.description}}
              </p>
            </v-flex>
            <v-flex v-if="resort.modules.hotel.gettingAround" style="height:100%;">
              <!-- <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
                Description
              </h2> -->
              <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
                <vue-markdown>{{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.gettingAround}}</vue-markdown>
              </p>
            </v-flex>
            <v-flex xs12 v-if="resort.modules.hotel.location" style="height:100%;">
              <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-3">
                Location
              </h2>
              <p>
                <a :href="resort.modules.hotel.location" style="color: #B9BCC1;">Get Directions</a>
              </p>
            </v-flex>
            <v-flex v-if="resort.modules.hotel.spaces && resort.modules.hotel.spaces.length > 0">
              <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-3">
                Spaces
              </h2>
              <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
                {{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.spaces[0]}}
              </p>
            </v-flex>
            <!-- <v-layout row flex>
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
            </v-layout> -->
          </v-flex>
          <v-flex xs12 v-if="resort.modules.hotel.amenities && resort.modules.hotel.amenities.length >0">
            <h2 style="font-size: 20px; color: #D8DADE;" class="mb-3 mt-3">
              Amenities
            </h2>
            <v-flex style="height:100%;">
              <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 
                {{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.amenities[0]}}
              </span>
            </v-flex>
            <!-- <v-layout row wrap justify-space-between align-center>
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
            </v-layout> -->
            <!-- <v-layout row wrap justify-space-between align-center>
              <v-flex>
                <v-icon color="#B9BCC1" size="24px">kitchen</v-icon>
                <span style="font-size: 16px; color: #B9BCC1;">Kitchen</span>
              </v-flex>
              <v-flex>
                <v-icon color="#B9BCC1" size="24px">local_cafe</v-icon>
                <span style="font-size: 16px; color: #B9BCC1;">Coffee</span>
              </v-flex>
              <v-flex>
                <v-icon color="#B9BCC1" size="24px">local_cafe</v-icon>
                <span style="font-size: 16px; color: #B9BCC1;">Coffee</span>
              </v-flex>
              <v-flex>
                <v-icon color="#B9BCC1" size="24px">local_cafe</v-icon>
                <span style="font-size: 16px; color: #B9BCC1;">Coffee</span>
              </v-flex>
              <v-flex>
                <v-icon color="#B9BCC1" size="24px">local_cafe</v-icon>
                <span style="font-size: 16px; color: #B9BCC1;">Coffee</span>
              </v-flex>
            </v-layout> -->
          </v-flex>
          <v-flex v-if="resort.modules.hotel.rules && resort.modules.hotel.rules.length >0">
            <h2 style="font-size: 20px; color: #D8DADE; height:100%;" class="mb-3 mt-3">
              Rules
            </h2>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;">
              {{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.rules[0]}}
            </span>
          </v-flex>
          <v-flex xs12>
            <v-btn
              block
              color="#F7B947"
              dark
              class="text-capitalize font-weight-bold"
              style="border-radius: 4px; max-width:238px; height:50px; margin-bottom:100px; margin-top:45px;"
              to="/contact"
            >
              Contact<v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-flex>
        </v-flex>
        <v-flex md6 class="hidden-sm-and-down">
          <v-card class="bookForm" width="300px" color="#191C21" style="border: 1px solid #E1E7ED; border-radius: 3px; margin-top:30px; margin-bottom:30px; margin-left:77px; padding:25px;">
            <v-form :name="resort.name" method="post" netlify ref="form" v-model="valid"  action="/thanks" data-netlify="true">
              <input type="hidden" name="form-name" :value="resort.name"/>
              <v-layout row wrap>
              <v-flex xs12 v-if="resort.ctaText > 0">
                <p class="subheading text-xs-center pb-2">
                  <span style="font-weight: bold; font-size: 28px; color: #B9BCC1;">&dollar;{{ resort.ctaText }} </span>
                  <span style="font-size: 16px; color: #B9BCC1;"> per night</span>
                </p>
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
              <v-flex xs12 v-if="resort.modules.hotel.beds && resort.modules.hotel.beds.length >0">
                <v-text-field
                  outline
                  dark
                  type="text"
                  name="Date"
                  color="#B9BCC1"
                  id="datepicker"
                  readonly
                  :rules="dateRules"
                  :value="formatDates(dateOne, dateTwo)"
                  >
                  <v-icon slot="append" color="#B9BCC1">event</v-icon>
                  <p slot="label">
                    Check in 
                    <v-icon color="#B9BCC1" style="font-size:30px; width:30px; height:18px;">arrow_right_alt</v-icon> 
                    Check out
                  </p>
                  </v-text-field>
                <AirbnbStyleDatepicker
                  :trigger-element-id="'datepicker'"
                  :mode="'range'"
                  :fullscreen-mobile="false"
                  :date-one="dateOne"
                  :date-two="dateTwo"
                  @date-one-selected="val => { dateOne = val }"
                  @date-two-selected="val => { dateTwo = val }"
                  style="left:-70%; top:60%;"
                  :show-shortcuts-menu-trigger="false"
                  dark
                />
                </v-flex>
              <v-layout row wrap justify-center justify-space-between v-if="resort.modules.hotel.beds && resort.modules.hotel.beds.length >0">
                <v-flex mr-2 mb-4>
                <v-btn-toggle v-model="toggle0" style="background-color:transparent; width:100%;">
                  <v-btn v-if="resort.modules.hotel.beds.length >0" :value="resort.modules.hotel.beds[0].type" flat dark outline block text-xs-center style="border: 3px solid #B9BCC1; box-sizing: border-box; border-radius: 3px; height:108px; font-weight: bold; font-size: 14px; line-height: 17px; color: #B9BCC1;">
                    <p class="mt-4">  
                      {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].count }}
                      {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].type }}
                    <br>
                      <v-img class="mt-1 ml-3" width="22px" height="20px" :src="bed"></v-img>
                    </p>
                  </v-btn>
                </v-btn-toggle>
                </v-flex>
                <v-flex ml-2 mb-4>
                <v-btn-toggle v-model="toggle1" style="width:100%; background-color:transparent;">
                  <v-btn v-if="resort.modules.hotel.beds.length >0" :value="resort.modules.hotel.beds[0].type" flat dark outline block text-xs-center style="border: 3px solid #B9BCC1; box-sizing: border-box; border-radius: 3px; height:108px; font-weight: bold; font-size: 14px; line-height: 17px; color: #B9BCC1;">
                    <p class="mt-4">  
                      {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].count }}
                      {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].type }}
                    <br>
                      <v-img class="mt-1 ml-3" width="22px" height="20px" :src="bed"></v-img>
                    </p>
                  </v-btn>
                </v-btn-toggle>
                </v-flex>
              </v-layout>
              <input
                name="Type1"
                hidden
                :value="toggle1"
                type="text"
                readonly
              />
              <input
                name="Type2"
                hidden
                :value="toggle0"
                type="text"
                readonly
              />
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
              Reserve Now <v-icon>keyboard_arrow_right</v-icon>
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
          <v-flex xs12 v-if="resort.ctaText > 0">
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
                color="#F7B947"
                v-on="on"
              >
                Reserve Now <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </template>
          <v-card class="bookForm" color="#191C21" style="position:absolute;">
            <v-form :name="resort.name"  method="post" netlify ref="form" v-model="valid" class="ma-5" action="/thanks" data-netlify="true">
              <input type="hidden" name="form-name" :value="resort.name" />
              <v-layout row wrap>
              <v-flex xs1>
                <v-btn icon dark @click="bookDialog = false">
                  <v-icon color="#B9BCC1">close</v-icon>
                </v-btn>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs11 v-if="resort.ctaText > 0">
                <p class="subheading text-xs-center pb-2">
                  <span style="font-weight: bold; font-size: 28px; color: #B9BCC1;">&dollar;{{ resort.ctaText }} </span>
                  <span style="font-size: 16px; color: #B9BCC1;"> per night</span>
                </p>
                <!-- <Rating :rating="rating" :counter="counter"/> -->
                <!-- <v-divider class="mt-3 mb-3" style="background-color:#3D424E;"></v-divider> -->
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
              <v-flex xs12 v-if="resort.modules.hotel.beds && resort.modules.hotel.beds.length >0">
                <v-text-field
                  outline
                  dark
                  type="text"
                  name="Date"
                  readonly
                  color="#B9BCC1"
                  id="datepicker-trigger"
                  :rules="dateRules"
                  :value="formatDates(dateOne, dateTwo)"
                  >
                  <v-icon slot="append" color="#B9BCC1">event</v-icon>
                  <p slot="label">
                    Check in 
                    <v-icon color="#B9BCC1" style="font-size:30px; width:30px; height:18px;">arrow_right_alt</v-icon> 
                    Check out
                  </p>
                  </v-text-field>
                <AirbnbStyleDatepicker
                  :trigger-element-id="'datepicker-trigger'"
                  :mode="'range'"
                  style="width:100%; height:100%;"
                  :fullscreen-mobile="true"
                  :date-one="dateOne"
                  :show-shortcuts-menu-trigger="false"
                  :date-two="dateTwo"
                  @date-one-selected="val => { dateOne = val }"
                  @date-two-selected="val => { dateTwo = val }"
                />
              </v-flex>
              <v-layout row wrap justify-center justify-space-between v-if="resort.modules.hotel.beds && resort.modules.hotel.beds.length >0">
                <v-flex mr-2 mb-4>
                <v-btn-toggle v-model="toggle0" style="background-color:transparent; width:100%;">
                  <v-btn v-if="resort.modules.hotel.beds.length >0" :value="resort.modules.hotel.beds[0].type" flat dark outline block text-xs-center style="border: 3px solid #B9BCC1; box-sizing: border-box; border-radius: 3px; height:108px; font-weight: bold; font-size: 14px; line-height: 17px; color: #B9BCC1;">
                    <p class="mt-4">  
                      {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].count }}
                      {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].type }}
                    <br>
                      <v-img class="mt-1 ml-3" width="22px" height="20px" :src="bed"></v-img>
                    </p>
                  </v-btn>
                </v-btn-toggle>
                </v-flex>
                <v-flex ml-2 mb-4>
                <v-btn-toggle v-model="toggle1" style="width:100%; background-color:transparent;">
                  <v-btn v-if="resort.modules.hotel.beds.length >0" :value="resort.modules.hotel.beds[0].type" flat dark outline block text-xs-center style="border: 3px solid #B9BCC1; box-sizing: border-box; border-radius: 3px; height:108px; font-weight: bold; font-size: 14px; line-height: 17px; color: #B9BCC1;">
                    <p class="mt-4">  
                      {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].count }}
                      {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].type }}
                    <br>
                      <v-img class="mt-1 ml-3" width="22px" height="20px" :src="bed"></v-img>
                    </p>
                  </v-btn>
                </v-btn-toggle>
                </v-flex>
              </v-layout>
              <input
                name="Type1"
                hidden
                :value="toggle1"
                type="text"
                readonly
              />
              <input
                name="Type2"
                hidden
                :value="toggle0"
                type="text"
                readonly
              />
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
              Reserve Now <v-icon>keyboard_arrow_right</v-icon>
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
  <Footer class="hidden-sm-and-down"></Footer>
  </v-container-fluid>
</template>

<script>
//components

// icons
import wifi from '../assets/icons/wifi.svg'
import HairDryer from '../assets/icons/hair-dryer.svg'
import Washer from '../assets/icons/washing-machine.svg'
import cutlery from '../assets/icons/cutlery.svg'
import bed from '../assets/icons/bed.svg'
import MultiUsers from '../assets/icons/multiple-users-silhouette.svg'
import format from 'date-fns/format'
import Footer from './Footer.vue'
import VueMarkdown from 'vue-markdown'

export default {
  components:{
    Footer,
    VueMarkdown
  },
  head:{
    title: function() {
      return{
        inner: this.resort.title,
      }
    },
    meta: function()
    { 
      return[
        {
          name: 'description', 
          content: this.resort.description,
          id: 'desc' 
        }
      ]
    }
  },
  data(){
    return{
      toggle0:0,
      toggle1:1,
      beds: false,
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        v => !!v || 'Phone no. is required',
      ],
      dateRules: [
        v => !!v || 'Dates are required',
      ],
      name: '',
      email: '',
      phone: '',

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
      bed,

      slug: this.$route.params.id,
      // categories:[
      //   {
      //     id: '',
      //     name: '',
      //   }
      // ],
      resort: {
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
            capacity: '',
            gettingAround: '',
            location: '',
            amenities: '',
            beds: [
              {
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
    // this.$http.get('https://stagingapi.whynot.earth/api/v0/categories').then(function(data){
    //   this.categories=data.body;
    // });
  },
}
</script>

<style lang="scss">
  .v-input__slot{
    margin: 0;
    height: 55px;
    /*To make the total margin:30px */
    margin-bottom: 10px; 
  }
  html {
    scroll-behavior: smooth;
  }
  .v-carousel__controls{
    background: linear-gradient(0deg, #191C21 0%, rgba(25, 28, 33, 0) 50%);
    .v-icon{
      font-size: 7px !important;
      padding: 0px;
    }
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
