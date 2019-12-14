import { addDays } from 'date-fns'
import {
  RoomTypeService,
  CompanyService,
  ReservationService
} from '@/connection/resources.js'
import { bookingStep } from '@/types'
import { setDocumentClassesOnToggleDialog } from '@/helpers'

const steps: { [name: string]: bookingStep } = {
  notStarted: {
    id: 0,
    width: 332
  },
  confirmDates: {
    id: 1,
    width: 332
  },
  auth: {
    id: 2,
    width: 376
  },
  confirmGuests: {
    id: 3,
    width: 332
  },
  confirmBooking: {
    id: 4,
    width: 332
  },
  reviewPolicies: {
    id: 5,
    width: 332
  },
  customerInfo: {
    id: 6,
    width: 332
  },
  paymentInfo: {
    id: 7,
    width: 332
  },
  thanksYou: {
    id: 8,
    width: 332
  }
}

const defaultState = {
  currentStep: {
    id: 0,
    width: 332
  },
  steps,
  dialog: {
    isOpen: false
  },
  bookingInfo: {
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
      total: 0
    },
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
    prices: []
  },
  vat: 0,
  finalPrice: 0,
  stripeKey: '',
  reservationId: 0,
  clientSecret: '',
  reservationDetails: {}
}

export default {
  namespaced: true,
  state: { ...defaultState },
  mutations: {
    updateDialog(state, payload) {
      state.dialog = payload
    },
    updateCurrentStep(state, payload) {
      state.currentStep = payload
    },
    updateGuests(state, payload) {
      state.bookingInfo.guests = payload
    },
    updateDateOne(state, payload) {
      state.bookingInfo.dateOne = payload
    },
    updateDateTwo(state, payload) {
      state.bookingInfo.dateTwo = payload
      state.bookingInfo.checkOut = addDays(payload, 1)
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
    updateDialog(context, payload) {
      const dialog = {
        ...context.state.dialog,
        ...payload
      }

      setDocumentClassesOnToggleDialog(dialog.isOpen)
      context.commit('updateDialog', dialog)
    },
    startBooking(context) {
      context.commit('updateCurrentStep', context.state.steps.confirmDates)
    },
    updateCurrentStep(context, payload) {
      context.commit('updateCurrentStep', payload)
    },
    updateGuests(context, payload) {
      context.commit('updateGuests', payload)
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
    },
    getPrices(context, { roomTypeId, dateOne, dateTwo }) {
      return RoomTypeService.prices({
        roomTypeId,
        startDate: dateOne,
        endDate: dateTwo
      }).then(prices => {
        context.commit('updatePrices', prices)
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
    getClientSecret(context, { reservationId, bookingInfo }) {
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
    dialog: state => {
      return state.dialog
    },
    bookingInfo(state) {
      return state.bookingInfo
    },
    computedTotalPrice(state) {
      const prices = state.bookingInfo.prices
      let totalPrice = 0
      for (let i = 0; i < prices.length; i++) {
        totalPrice += prices[i].amount
      }
      return totalPrice
    },
    computedVat(state, getters) {
      return getters.computedTotalPrice * 0.1
    },
    computedFinalPrice(state, getters) {
      return getters.computedTotalPrice + getters.computedVat
    },
    currentStep(state) {
      return state.currentStep
    },
    steps(state) {
      return state.steps
    }
  }
}
