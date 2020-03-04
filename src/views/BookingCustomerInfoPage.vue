<template>
  <fragment>
    <page-header></page-header>
    <div class="page light--text">
      <div class="page-content brand-gradient">
        <!-- mobile -->
        <v-container class="pa-0" v-if="$vuetify.breakpoint.smAndDown">
          <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
          <v-container class="brand-gradient py-8 px-4">
            <h1 class="mb-4 font-weight-bold display-1">{{ steps.customerInfo.title }}</h1>
            <booking-customer-info :countries-list="countriesList"></booking-customer-info>
          </v-container>
        </v-container>
        <!-- NOTE duplicate components for desktop -->
        <v-container v-else class="is-limited light--text px-0 py-8">
          <v-row no-gutters>
            <v-col cols="12">
              <h1 class="mb-4 font-weight-bold display-2">{{ steps.customerInfo.title }}</h1>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="7">
              <div class="pr-7">
                <booking-customer-info :countries-list="countriesList"></booking-customer-info>
              </div>
            </v-col>
            <v-col cols="12" md="5">
              <booking-confirm-booking :has-cancel-button="false"></booking-confirm-booking>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue';
const BookingCustomerInfo = () => import('@/components/BookingCustomerInfo.vue');
const BookingConfirmBooking = () => import('@/components/BookingConfirmBooking.vue');
const PageHeader = () => import('@/components/PageHeader.vue');
import { countriesListUrl } from '../constants/app';
import { ajax } from '@/connection/ajax';
import store from '@/store';
import { Country } from '../types';

export default Vue.extend({
  name: 'booking-customer-info-page',
  components: { PageHeader, BookingCustomerInfo, BookingConfirmBooking },
  mounted() {
    (this as any).getCountriesList();
    (this as any).$store.dispatch('booking/updateCurrentStep', (this as any).steps.customerInfo);
  },
  methods: {
    async getCountriesList() {
      let countriesList;
      try {
        countriesList = (
          await ajax({
            url: countriesListUrl,
            method: 'get',
            withCredentials: false,
            timeout: Infinity
          })
        ).data;
      } catch (error) {
        console.log('error on get countries list');
      }
      return store.dispatch('booking/updateCountriesList', countriesList);
    }
  },
  computed: {
    steps() {
      return (this as any).$store.getters['booking/steps'];
    },
    returnUrl() {
      return (this as any).$store.getters['booking/bookingInfo'].returnUrl;
    },
    countriesList(): Country[] {
      return (this as any).$store.getters['booking/countriesList'];
    }
  }
});
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
