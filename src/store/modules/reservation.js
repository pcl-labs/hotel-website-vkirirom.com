import Vue from "vue";
import { addDays } from "date-fns";

export default {
  namespaced: true,
  state: {
    transportation: false,
    message: "",
    name: "",
    email: "",
    phone: "",
    roomType: { 
      id: 0,
      name: "",
      beds:[
        {
          count: "", 
          type: ""
        }
      ]
    },
    dateOne: "",
    dateTwo: "",
    checkOut: "",
    vat: "",
    finalPrice: "",
    prices: []
  },
  mutations: {
    updateDateOne(state, payload) {
      state.dateOne = payload;
    },
    updateDateTwo(state, payload) {
      state.dateTwo = payload;
      state.checkOut = addDays(payload, 1)
    },
    updateVat(state, payload) {
      state.vat = payload;
    },
    updateFinalPrice(state, payload) {
      state.finalPrice = payload;
    },
    updatePrices(state, payload) {
      state.prices = payload;
    },
    updateTransportation(state, payload) {
      state.transportation = payload;
    },
    updateMessage(state, payload) {
      state.message = payload;
    },
    updateName(state, payload) {
      state.name = payload;
    },
    updateEmail(state, payload) {
      state.email = payload;
    },
    updatePhone(state, payload) {
      state.phone = payload;
    },
    updateRoomType(state, payload) {
      state.roomType = payload;
    },
  },
  actions: {
    getPrices(context, { roomTypeId, dateOne, dateTwo }) {
      return Vue.http
        .get(
          `https://stagingapi.whynot.earth/api/v0/roomtypes/${roomTypeId}/prices?startDate=${dateOne}&endDate=${dateTwo}`
        )
        .then(data => {
          let totalPrice = 0;
          const prices = data.body;
          for (let i = 0; i < prices.length; i++) {
            totalPrice += prices[i].amount;
          }
          const vat = totalPrice * 0.1;
          totalPrice = totalPrice + vat;
          // vat = vat.toFixed(2);
          const finalPrice = totalPrice.toFixed(2);

          context.commit("updatePrices", prices);
          context.commit("updateVat", vat);
          context.commit("updateFinalPrice", finalPrice);
        });
    }
  },
  getters: {
    vat(state) {
      return state.vat;
    },
    finalPrice(state) {
      return state.finalPrice;
    },
    dateOne(state) {
      return state.dateOne;
    },
    dateTwo(state) {
      return state.dateTwo;
    },
    checkOut(state) {
      return state.checkOut;
    },
    prices(state) {
      return state.prices;
    },
    transportation(state) {
      return state.transportation;
    },
    message(state) {
      return state.message;
    },
    name(state) {
      return state.name;
    },
    email(state) {
      return state.email;
    },
    phone(state) {
      return state.phone;
    },
    roomType(state) {
      return state.roomType;
    },
  }
};
