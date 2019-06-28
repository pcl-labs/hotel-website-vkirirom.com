<template>
  <v-container-fluid>
    <v-container-fluid class="pa-0">
      <v-layout row flex class="pa-0 mx-0">
        <v-flex xs12 sm12 md6 class="pa-0 overflow-hidden hidden-sm-and-down">
          <v-img class="image" :src="resort.featuredImage" aspect-ratio="1.7"></v-img>
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
        <v-flex xs12 class="hidden-md-and-up">
          <v-carousel height="300px" hide-controls dark>
            <!-- v-if="belltent.images.length > 0" is required to avoid the error "cannot read property 'url' of undefined.
            also, to toggle data wrt content in db-->
            <v-carousel-item :src="resort.featuredImage">
            </v-carousel-item>
            <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[0].url">
            </v-carousel-item>
            <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[1].url">
            </v-carousel-item>
            <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[2].url">
            </v-carousel-item>
            <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[3].url">
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container-fluid>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-flex xs12>
            <h1 style="color: #FFFFFF; margin-top:30px;">{{resort.title}}</h1>
            <div class="text-xs-left font-weight-regular">
              <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
                Description
              </h2>
              <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
                <!-- let vue-markdown be inline with text only, else you'll see an ugly white background -->
                <!-- Without this v-if, vue-markdown doesn't work -->
                <vue-markdown v-if="resort.modules.hotel.gettingAround.length >0">{{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.gettingAround}}</vue-markdown>
              </p>
            </div>
            <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
              Location
            </h2>
            <p>
              <a href="https://goo.gl/maps/NusquSFKVm2SHrDy7" style="color: #006064;">Get Directions</a>
            </p>
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
          <v-card class="bookForm" width="300px" color="#191C21" style="border: 1px solid #E1E7ED; border-radius: 3px; margin-top:30px; margin-left:77px; padding:25px;">
            <v-form name="bookForm" method="post" netlify ref="form" v-model="valid"  action="/thanks" data-netlify="true">
              <input type="hidden" name="form-name" value="bookForm"/>
              <v-layout row wrap>
              <v-flex xs12>
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
              <v-flex xs12>
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
                color="#F7B947"
                v-on="on"
              >
                Book Now <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </template>
          <v-card class="bookForm" color="#191C21" style="position:absolute;">
            <v-form name="bookForm"  method="post" netlify ref="form" v-model="valid" class="ma-5" action="/thanks" data-netlify="true">
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
              <v-flex xs12>
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
  <Footer class="hidden-sm-and-down"></Footer>
  </v-container-fluid>
</template>

<script>
//components
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

      slug: this.$route.params.id,
      resort: {
        title:'',
        gettingAround: '',
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
