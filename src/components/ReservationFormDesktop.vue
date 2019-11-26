<template>
  <v-form
    v-if="resort"
    :name="resort.categories[0].name"
    method="post"
    netlify
    ref="form"
    v-model="valid"
    action="/thanks"
    data-netlify="true"
  >
    <input type="hidden" name="form-name" :value="resort.categories[0].name" />
    <v-row no-gutters>
      <v-flex xs12 v-if="resort.ctaText > 0">
        <p class="subheading text-center pb-2">
          <span class="normalText">Starting from </span>
          <span
            style="font-weight: bold; font-size: 28px; color: #B9BCC1;"
          >&dollar;{{ resort.ctaText }} </span>
          <span class="normalText">per night</span>
        </p>
        <!-- <Rating :rating="rating" :counter="counter"/> -->
        <v-divider class="mb-6" style="background-color:#3D424E;"></v-divider>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="name"
          outlined
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
        <input v-model="slug" hidden name="Property" color="#B9BCC1" dark readonly />
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="email"
          outlined
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
          outlined
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
      <v-flex
        v-if="resort.modules.hotel && resort.modules.hotel.roomTypes.length>0"
      >
        <v-select
          v-model="roomType"
          item-text="type"
          item-value="type"
          return-object
          :items="resort.modules.hotel.roomTypes"
          dark
          outlined
          :rules="bedTypeRules"
          label="Bed Type"
          color="#B9BCC1"
          type="text"
        >
          <template slot="selection" slot-scope="data">
            {{data.item.beds[0].count}} {{data.item.beds[0].type}}
          </template>
          <template slot="item" slot-scope="data">
            <template>
              <v-list-item-content>
                <v-list-item-title>
                  {{data.item.beds[0].count}} {{data.item.beds[0].type}}
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
        </v-select>
      </v-flex>

      <!-- resort.name is a temporary fix for category name, ideally category id should be used-->

      <v-flex
        xs12
        v-if="resort.categories[0].name=='accommodations' || resort.categories[0].name=='events' || resort.categories[0].name=='experiences'"

        class="position-relative"
      >
        <v-text-field
          outlined
          dark
          type="text"
          name="Date"
          color="#B9BCC1"
          id="datepicker"
          label="Reserve Dates"
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
          style="left:-70%; top: 60px;"
          :show-shortcuts-menu-trigger="false"
          @apply="getPrices(dateOne, dateTwo)"
        />
      </v-flex>
      <v-flex
        xs12
        v-if="resort.categories[0].name=='accommodations' || resort.categories[0].name=='events' || resort.categories[0].name=='experiences'"
      >
        <v-checkbox
          v-model="transportation"
          label="Do you need transportation?"
          color="#B9BCC1"
          dark
          style="margin:0; padding:0;"
          height="30px"
        ></v-checkbox>
        <input hidden name="Transportation needed" :value="transportation" />
      </v-flex>
      <v-flex xs12 style="margin-bottom:30px;" v-if="finalPrice > 0 && resort.categories[0].name=='accommodations'">
        <v-row no-gutters v-for="price in prices" v-bind:key="price.id">
          <v-flex xs6 class="normalText">{{formatDates(price.date)}}</v-flex>
          <v-flex xs6 class="text-right normalText">${{price.amount}}</v-flex>
        </v-row>
        <v-row no-gutters>
          <v-flex XS6 class="normalText">VAT (10%)</v-flex>
          <v-flex XS6 class="text-right normalText">${{vat}}</v-flex>
        </v-row>
        <v-divider style="background-color:#3D424E; margin-top:20px; margin-bottom:10px;"></v-divider>
        <v-row no-gutters>
          <v-flex xs6>
            <h3 style="font-size: 20px; color: #D8DADE;">Total</h3>
          </v-flex>
          <v-flex xs6 class="text-right">
            <h3 style="font-size: 20px; color: #D8DADE;">${{finalPrice}}</h3>
          </v-flex>
        </v-row>
        <input name="Amount (in $)" hidden :value="finalPrice" type="text" readonly />
      </v-flex>
      <v-flex xs12>
        <v-textarea
          v-model="message"
          outlined
          hide-details
          dark
          color="#B9BCC1"
          name="Message"
          label="Write message here..."
          class="mb-6"
          height="122px"
          no-resize
        ></v-textarea>
      </v-flex>
      <v-flex xs12 v-if="resort.categories[0].name!='accommodations'">
        <v-btn
          block
          color="#F7B947"
          dark
          class="text-capitalize font-weight-bold"
          :ripple="false"
          :disabled="!valid"
          style="height:74px;"
          type="submit"
        >
          <span v-if="resort.categories[0].name=='events' || resort.categories[0].name=='experiences'">
            Reserve Now
          </span>
          <span v-else>
            Contact Now
          </span>
          <v-spacer></v-spacer>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-flex>
    </v-row>
    <v-row no-gutters justify-center v-if="!isAuthenticated && resort.categories[0].name=='accommodations'">
      <v-dialog v-model="auth1" persistent max-width="583px">
        <template v-slot:activator="{ on }">
          <v-btn
            block
            color="#F7B947"
            dark
            class="text-capitalize font-weight-bold"
            :ripple="false"
            :disabled="!valid"
            style="height:74px;"
            v-on="on"
          >
              Log in to continue
            <v-spacer></v-spacer>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </template>
        <v-card
          color="#191C21"
          dark
          style="border: 1px solid #E1E7ED; border-radius: 3px; margin:0;"
        >
          <v-flex xs2>
            <v-btn icon dark @click="auth1 = !auth1" style="margin:10px; margin-bottom:-20px;">
              <v-icon color="#B9BCC1" size="25">close</v-icon>
            </v-btn>
          </v-flex>
          <Login v-if="register"></Login>
          <SignUp v-if="!register"></SignUp>
          <v-flex xs12 text-center style="margin-bottom:30px;">
            <span class="normalText">Don't have an account? </span>
            <a @click="register=!register" class="yellowLink">{{register?'Sign up':'Log in'}}</a>
          </v-flex>
        </v-card>
      </v-dialog>
    </v-row>
    <v-flex xs12 v-if="isAuthenticated==true && resort.categories[0].name=='accommodations'">
      <v-btn
        block
        color="#F7B947"
        dark
        class="text-capitalize font-weight-bold"
        :ripple="false"
        :disabled="!valid"
        style="height:74px;"
        to="/reservation/reviewrules"
      >
        Reserve Now
        <v-spacer></v-spacer>
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
    <v-flex
      xs12
      text-center
      class="mt-4"
      v-if="resort.categories[0].name=='accommodations' || resort.categories[0].name=='events' || resort.categories[0].name=='experiences'"
    >
      <p
        style="font-weight: bold; font-size: 14px; line-height: 17px; color: #B9BCC1;"
      >You won't be charged yet.</p>
    </v-flex>
  </v-form>
</template>

<script>
import { formatDates } from "@/helpers";
import format from "date-fns/format";
import { debounce } from "lodash-es";
const Login = () => import("@/components/Auth/Login.vue");
const SignUp = () => import("@/components/Auth/SignUp.vue");
const TEXTFIELDS_DEBOUNCE_TIME = 200;

export default {
  name: "reservation-form-desktop",
  components: {
    Login,
    SignUp
  },
  data() {
    return {
      toggle0: 0,
      valid: false,
      register: true,
      nameRules: [v => !!v || "Name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid",
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ],
      phoneRules: [
        v => !!v || "Phone no. is required",
        v => (v || "").length <= 12 || "A maximum of 12 characters is allowed",
        v => (v || "").length >= 9 || "A minimum of 9 characters is needed",
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ],
      dateRules: [
        v => !!v || "Dates are required"
      ],
      bedTypeRules: [
        (v) => !!this.roomType.beds[0].count || 'Bed type is required',
      ],

      bookDialog: false,
      auth1: false,
      auth2: false,

      slug: this.$route.params.id,
    };
  },
  props: {
    resortSlug: {
      type: String,
      required: true
    }
  },
  // watch: {
  //   '$route' (to, from){
  //     this.$store.commit("reservation/resetPrices")
  //   }
  // },
  mounted(){
    if(this.resort.slug !== this.resortSlug) {
      this.$store.commit("reservation/resetState")
    }
  },
  computed: {
    resort() {
      return this.$store.getters["resort/getResort"];
    },
    isAuthenticated(){
      return this.$store.getters["auth/isAuthenticated"];
    },
    dateOne: {
      get() {
        return this.$store.getters["reservation/dateOne"];
      },
      set(value) {
        this.$store.commit("reservation/updateDateOne", value);
      }
    },
    dateTwo: {
      get() {
        return this.$store.getters["reservation/dateTwo"];
      },
      set(value) {
        this.$store.commit("reservation/updateDateTwo", value);
      }
    },
    prices() {
      return this.$store.getters["reservation/prices"];
    },
    finalPrice() {
      return this.$store.getters["reservation/finalPrice"];
    },
    vat() {
      return this.$store.getters["reservation/vat"].toFixed(2);
    },
    transportation: {
      get() {
        return this.$store.getters["reservation/transportation"];
      },
      set(value) {
        this.$store.commit("reservation/updateTransportation", value);
      }
    },
    message: {
      get() {
        return this.$store.getters["reservation/message"];
      },
      set: debounce(function(value) {
        this.$store.commit("reservation/updateMessage", value);
      }, TEXTFIELDS_DEBOUNCE_TIME)
    },
    name: {
      get() {
        return this.$store.getters["reservation/name"];
      },
      set: debounce(function(value) {
        this.$store.commit("reservation/updateName", value);
      }, TEXTFIELDS_DEBOUNCE_TIME)
    },
    email: {
      get() {
        return this.$store.getters["reservation/email"];
      },
      set: debounce(function(value) {
        this.$store.commit("reservation/updateEmail", value);
      }, TEXTFIELDS_DEBOUNCE_TIME)
    },
    phone: {
      get() {
        return this.$store.getters["reservation/phone"];
      },
      set: debounce(function(value) {
        this.$store.commit("reservation/updatePhone", value);
      }, TEXTFIELDS_DEBOUNCE_TIME)
    },
    roomType: {
      get() {
        return this.$store.getters["reservation/roomType"];
      },
      set(value) {
        this.$store.commit("reservation/updateRoomType", value);
      }
    },
  },
  methods: {
    formatDates,
    getPrices() {
      const dateOne = this.dateOne;
      const dateTwo = this.dateTwo;
      const roomTypeId = this.resort.modules.hotel.roomTypes[0].id;
      this.$store.dispatch("reservation/getPrices", {
        roomTypeId,
        dateOne,
        dateTwo
      });
    }
  }
};
</script>

<style>
  .yellowLink{
    font-size:16px; text-decoration:none; color: #F7B947;
  }
</style>

