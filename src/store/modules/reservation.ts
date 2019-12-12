import { addDays } from 'date-fns'
import { RoomTypeService } from '@/connection/resources.js'
import { CompanyService } from '@/connection/resources.js'
import { ReservationService } from '@/connection/resources.js'


const defaultState = {
  transportation: false,
  message: '',
  name: '',
  email: '',
  phone: '',
  guests: 0,
  roomType: {
    id: 0,
    name: '',
    capacity: 0,
    beds: [
      {
        count: '',
        type: ''
      }
    ]
  },
  dateOne: '',
  dateTwo: '',
  checkOut: '',
  vat: '',
  finalPrice: '',
  prices: [],
  stripeKey: '',
  reservationId: 0,
  clientSecret: '',
  reservationDetails: {}
}

export default {
  namespaced: true,
  state: { ...defaultState },
  mutations: {
    updateDateOne(state, payload) {
      state.dateOne = payload
    },
    updateDateTwo(state, payload) {
      state.dateTwo = payload
      state.checkOut = addDays(payload, 1)
    },
    updateVat(state, payload) {
      state.vat = payload
    },
    updateFinalPrice(state, payload) {
      state.finalPrice = payload
    },
    updatePrices(state, payload) {
      state.prices = payload
    },
    updateTransportation(state, payload) {
      state.transportation = payload
    },
    updateMessage(state, payload) {
      state.message = payload
    },
    updateName(state, payload) {
      state.name = payload
    },
    updateEmail(state, payload) {
      state.email = payload
    },
    updatePhone(state, payload) {
      state.phone = payload
    },
    updateRoomType(state, payload) {
      state.roomType = payload
    },
    fetchStripeKey(state, payload) {
      state.stripeKey = payload
    },
    fetchReservationId(state, payload) {
      state.reservationId = payload
    },
    fetchClientSecret(state, payload) {
      state.clientSecret = payload
    },
    fetchReservationDetails(state, payload) {
      state.reservationDetails = payload
    },
    resetState(state) {
      for (const key in defaultState) {
        if (defaultState.hasOwnProperty(key)) {
          state[key] = defaultState[key]
        }
      }
    }
  },
  actions: {
    getPrices(context, { roomTypeId, dateOne, dateTwo }) {
      return RoomTypeService.prices({
        roomTypeId,
        startDate: dateOne,
        endDate: dateTwo
      }).then(prices => {
        let totalPrice = 0
        for (let i = 0; i < prices.length; i++) {
          totalPrice += prices[i].amount
        }
        const vat = totalPrice * 0.1
        totalPrice = totalPrice + vat
        // vat = vat.toFixed(2);
        const finalPrice = totalPrice.toFixed(2)

        context.commit('updatePrices', prices)
        context.commit('updateVat', vat)
        context.commit('updateFinalPrice', finalPrice)
      })
    },
    getStripeKey(context) {
      return CompanyService.stripePublishableKey().then(
        stripePublishableKey => {
          context.commit('fetchStripeKey', stripePublishableKey.key)
        }
      )
    },
    reserveRoom(context, { roomTypeId, dateOne, checkOut, finalPrice, email, phone, message, guests, transportation }) {
      return ReservationService.reserveByRoomType({
        roomTypeId: roomTypeId,
        name: name,
        message: message,
        numberOfGuests: guests,
        start: dateOne,
        end: checkOut,
        payment: {
          amount: finalPrice
        },
        email: email,
        phone: phone
      }).then(
        reserveByRoomType => {
          context.commit('fetchReservationId', reserveByRoomType.reservationId)
        }
      )
    },
    getClientSecret(context, {reservationId, finalPrice}) {
      return ReservationService.payReservation({
        reservationId: reservationId,
        amount: finalPrice
      }).then(
        payReservation => {
          context.commit('fetchClientSecret', payReservation.clientSecret)
        }
      )
    },
    getReservationDetails(context, {reservationId}) {
      return ReservationService.get({
        reservationId: reservationId
      }).then(
        get => {
          context.commit('fetchReservationDetails', get)
        }
      )
    }
  },
  getters: {
    vat(state) {
      return state.vat
    },
    finalPrice(state) {
      return state.finalPrice
    },
    dateOne(state) {
      return state.dateOne
    },
    dateTwo(state) {
      return state.dateTwo
    },
    checkOut(state) {
      return state.checkOut
    },
    prices(state) {
      return state.prices
    },
    transportation(state) {
      return state.transportation
    },
    message(state) {
      return state.message
    },
    name(state) {
      return state.name
    },
    email(state) {
      return state.email
    },
    phone(state) {
      return state.phone
    },
    roomType(state) {
      return state.roomType
    },
    stripeKey(state) {
      return state.stripeKey
    },
    reservationId(state) {
      return state.reservationId
    },
    clientSecret(state) {
      return state.clientSecret
    },
    reservationDetails(state) {
      return state.reservationDetails
    }
  }
}
