<template>
  <v-form
    v-if="resort"
    :name="resort.name"
    method="post"
    netlify
    ref="form"
    v-model="valid"
    action="/thanks"
    data-netlify="true"
  >
    <input type="hidden" name="form-name" :value="resort.name" />
    <v-layout row wrap>
      <v-flex xs12 v-if="resort.ctaText > 0">
        <p class="subheading text-xs-center pb-2">
          <span class="normalText">Starting from </span>
          <span
            style="font-weight: bold; font-size: 28px; color: #B9BCC1;"
          >&dollar;{{ resort.ctaText }} </span>
          <span class="normalText">per night</span>
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
        <input v-model="slug" hidden name="Property" color="#B9BCC1" dark readonly />
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
      <v-flex
        v-if="resort.modules.hotel && resort.modules.hotel.roomTypes.length>0 && resort.modules.hotel.roomTypes[0].beds.length>0"
      >
        <v-select
          v-model="bedType"
          item-text="type"
          item-value="type"
          return-object
          :items="resort.modules.hotel.roomTypes[0].beds"
          dark
          outline
          label="Bed Type"
          color="#B9BCC1"
          type="text"
        >
          <template slot="selection" slot-scope="data">{{data.item.count}} {{data.item.type}}</template>
          <template slot="item" slot-scope="data">
            <template>
              <v-list-tile-content>
                <v-list-tile-title>{{data.item.count}} {{data.item.type}}</v-list-tile-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-select>
        <input hidden name="Bed count and type" :value=" bedType.count + ',' + bedType.type" />
      </v-flex>

      <!-- resort.name is a temporary fix for category name, ideally category id should be used-->

      <v-flex
        xs12
        v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'"
      >
        <v-text-field
          outline
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
          style="left:-70%; top:60%;"
          :show-shortcuts-menu-trigger="false"
          @apply="getPrices(dateOne, dateTwo)"
        />
      </v-flex>
      <v-flex
        xs12
        v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'"
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
      <v-flex xs12 style="margin-bottom:30px;" v-if="finalPrice > 0">
        <v-layout row wrap v-for="price in prices" v-bind:key="price.id">
          <v-flex xs6 class="normalText">{{formatDates(price.date)}}</v-flex>
          <v-flex xs6 class="text-xs-right normalText">${{price.amount}}</v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex XS6 class="normalText">VAT (10%)</v-flex>
          <v-flex XS6 class="text-xs-right normalText">${{vat}}</v-flex>
        </v-layout>
        <v-divider style="background-color:#3D424E; margin-top:20px; margin-bottom:10px;"></v-divider>
        <v-layout row wrap>
          <v-flex xs6>
            <h3 style="font-size: 20px; color: #D8DADE;">Total</h3>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <h3 style="font-size: 20px; color: #D8DADE;">${{finalPrice}}</h3>
          </v-flex>
        </v-layout>
        <input name="Amount (in $)" hidden :value="finalPrice" type="text" readonly />
      </v-flex>
      <v-flex xs12>
        <v-textarea
          v-model="message"
          outline
          hide-details
          dark
          color="#B9BCC1"
          name="Message"
          label="Write message here..."
          class="mb-4"
          height="122px"
          no-resize
        ></v-textarea>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
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
            Reserve Now
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
            <v-btn icon dark @click="auth1 = !auth1" style="margin:0; margin:10px;">
              <v-icon color="#B9BCC1" size="25">close</v-icon>
            </v-btn>
          </v-flex>
          <Login v-if="register"></Login>
          <SignUp v-if="!register"></SignUp>
          <v-flex xs12 text-xs-center style="margin-bottom:30px;">
            <span class="normalText">Don't have an account?</span>
            <a @click="register=!register" class="yellowLink">{{register?'Sign up':'Log in'}}</a>
          </v-flex>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-flex
      xs12
      text-xs-center
      class="mt-3"
      v-if="resort.name=='accommodations' || resort.name=='events' || resort.name=='experiences'"
    >
      <p
        style="font-weight: bold; font-size: 14px; line-height: 17px; color: #B9BCC1;"
      >You won't be charged yet.</p>
    </v-flex>
  </v-form>
</template>

<script>
import { formatDates } from "@/helpers.js";
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
        v => (v || "").length <= 10 || "A maximum of 10 characters is allowed",
        v => (v || "").length >= 9 || "A minimum of 9 characters is needed",
        v => (v || "").indexOf(" ") < 0 || "No spaces are allowed"
      ],
      dateRules: [v => !!v || "Dates are required"],

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
  computed: {
    resort() {
      return this.$store.getters["resort/getItemBySlug"](this.resortSlug);
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
    bedType: {
      get() {
        return this.$store.getters["reservation/bedType"];
      },
      set(value) {
        this.$store.commit("reservation/updateBedType", value);
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
