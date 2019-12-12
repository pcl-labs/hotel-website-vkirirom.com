import { addDays } from 'date-fns'
import { RoomTypeService } from '@/connection/resources.js'
import { CompanyService } from '@/connection/resources.js'
import { ReservationService } from '@/connection/resources.js'

const defaultState = {
  currentStep: 0,
  bookingInfo: {
    transportation: false,
    message: '',
    name: '',
    email: '',
    phone: '',
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
    guests: 0
  },
  stripeKey: '',
  reservationId: 0,
  clientSecret: '',
  reservationDetails: {}
}

export default {
  namespaced: true,
  state: { ...defaultState },
  mutations: {
    updateCurrentStep(state, payload) {
      state.currentStep = payload
    },
    updateDateOne(state, payload) {
      state.bookingInfo.dateOne = payload
    },
    updateDateTwo(state, payload) {
      state.bookingInfo.dateTwo = payload
      state.bookingInfo.checkOut = addDays(payload, 1)
    },
    updateVat(state, payload) {
      state.bookingInfo.vat = payload
    },
    updateFinalPrice(state, payload) {
      state.bookingInfo.finalPrice = payload
    },
    updatePrices(state, payload) {
      state.bookingInfo.prices = payload
    },
    updateTransportation(state, payload) {
      state.bookingInfo.transportation = payload
    },
    updateMessage(state, payload) {
      state.bookingInfo.message = payload
    },
    updateName(state, payload) {
      state.bookingInfo.name = payload
    },
    updateEmail(state, payload) {
      state.bookingInfo.email = payload
    },
    updatePhone(state, payload) {
      state.bookingInfo.phone = payload
    },
    updateRoomType(state, payload) {
      state.bookingInfo.roomType = payload
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
    startBooking(context) {
      context.commit('updateCurrentStep', 1)
    },
    updateCurrentStep(context, payload) {
      context.commit('updateCurrentStep', payload)
    },
    updateDateOne(context, payload) {
      context.commit('updateDateOne', payload)
    },
    updateDateTwo(context, payload) {
      context.commit('updateDateTwo', payload)
    },
    clearDateTwo(context) {
      context.commit('updateDateTwo', defaultState.bookingInfo.dateTwo)
    },
    updateVat(context, payload) {
      context.commit('updateVat', payload)
    },
    updateFinalPrice(context, payload) {
      context.commit('updateFinalPrice', payload)
    },
    updatePrices(context, payload) {
      context.commit('updatePrices', payload)
    },
    updateTransportation(context, payload) {
      context.commit('updateTransportation', payload)
    },
    updateMessage(context, payload) {
      context.commit('updateMessage', payload)
    },
    updateName(context, payload) {
      context.commit('updateName', payload)
    },
    updateEmail(context, payload) {
      context.commit('updateEmail', payload)
    },
    updatePhone(context, payload) {
      context.commit('updatePhone', payload)
    },
    updateRoomType(context, payload) {
      context.commit('updateRoomType', payload)
    },
    clearPrices(context) {
      context.commit('updatePrices', defaultState.bookingInfo.prices)
      context.commit('updateVat', defaultState.bookingInfo.vat)
      context.commit('updateFinalPrice', defaultState.bookingInfo.finalPrice)
    },
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
      return CompanyService.stripePublishableKey({
        companyId: 1
      }).then(stripePublishableKey => {
        context.commit('fetchStripeKey', stripePublishableKey.key)
      })
    },
    reserveRoom(context, bookingInfo) {
      return ReservationService.reserveByRoomType({
        roomTypeId: bookingInfo.roomType.id,
        name: bookingInfo.name,
        message: bookingInfo.message,
        numberOfGuests: bookingInfo.guests,
        start: bookingInfo.dateOne,
        end: bookingInfo.checkOut,
        payment: {
          amount: bookingInfo.finalPrice
        },
        email: bookingInfo.email,
        phone: bookingInfo.phone
      }).then(reserveByRoomType => {
        context.commit('fetchReservationId', reserveByRoomType.reservationId)
      })
    },
    getClientSecret(context, reservationId, bookingInfo) {
      return ReservationService.payReservation({
        reservationId: reservationId,
        amount: bookingInfo.finalPrice
      }).then(payReservation => {
        context.commit('fetchClientSecret', payReservation.clientSecret)
      })
    },
    getReservationDetails(context, { reservationId }) {
      return ReservationService.get({
        reservationId: reservationId
      }).then(get => {
        context.commit('fetchReservationDetails', get)
      })
    }
  },
  getters: {
    finalPrice(state) {
      return state.bookingInfo.finalPrice
    },
    bookingInfo(state) {
      return state.bookingInfo
    },
    currentStep(state) {
      return state.currentStep
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
