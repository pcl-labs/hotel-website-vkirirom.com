<template>
  <div>
    <div v-if="mode==='range'">
      <v-text-field
        solo
        flat
        hide-details
        :label="label"
        append-icon="calendar_today"
        :id="triggerID"
        :value="formatDates(dateOne, dateTwo)"
        v-if="showInput"
      ></v-text-field>
      <div v-else :id="triggerID"></div>
      <AirbnbStyleDatepicker
        class="airBnBDatePicker"
        :class="cardBorder ? '' : 'borderHiddin'"
        :trigger-element-id="triggerID"
        :mode="'range'"
        :inline="!showInput"
        :months-to-show="monthsToShow"
        :fullscreen-mobile="fullScreenMobile"
        :date-one="dateOne"
        :date-two="dateTwo"
        :showActionButtons="showActionButtons"
        @date-one-selected="val => { dateOne = val }"
        @date-two-selected="val => { dateTwo = val }"
      >
      </AirbnbStyleDatepicker>
    </div>
    <div v-else>
      <v-text-field
        solo
        flat
        hide-details
        :label="label"
        append-icon="calendar_today"
        :id="triggerID"
        :value="formatDates(inlineDateOne)"
        v-if="showInput"
      ></v-text-field>
      <div v-else :id="triggerID"></div>
      <AirbnbStyleDatepicker
        class="airBnBDatePicker"
        :class="cardBorder ? '' : 'borderHiddin'"
        :trigger-element-id="triggerID"
        :mode="'single'"
        :inline="!showInput"
        :months-to-show="1"
        :fullscreen-mobile="fullScreenMobile"
        :date-one="inlineDateOne"
        close-icon="close"
        :showActionButtons="showActionButtons"
        @date-one-selected="val => { inlineDateOne = val }"
      >
      </AirbnbStyleDatepicker>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format';
// import component and stylesheet
export default {
  props: {
    fullScreenMobile: {
      type: Boolean,
      default: true,
    },
    triggerID: {
      type: String,
    },
    monthsToShow: {
      type: String,
    },
    showInput: {
      type: Boolean,
    },
    cardBorder: {
      type: Boolean,
    },
    showActionButtons: {
      type: Boolean,
    },
    mode: {
      type: String,
    },
    label: {
      type: String,
      default: 'Check-in > Checkout',
    },
  },
  data() {
    return {
      dateFormat: 'D MMM',
      dateOne: '',
      dateTwo: '',
      inlineDateOne: '',
    };
  },
  methods: {
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
};
</script>
