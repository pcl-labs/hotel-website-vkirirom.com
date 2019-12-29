import { addDays } from 'date-fns'
import { RoomTypeService, ReservationService } from '@/connection/resources.js'
import { bookingStep } from '@/types'
import { setDocumentClassesOnToggleDialog, formatDate } from '@/helpers'
import { cloneDeep } from 'lodash-es'
import countriesList from '@/constants/countries-list'
import store from '@/store'

const steps: { [name: string]: bookingStep } = {
  notStarted: {
    id: 0
  },
  confirmDates: {
    id: 1
  },
  auth: {
    id: 2
  },
  confirmGuests: {
    id: 3
  },
  confirmBooking: {
    id: 4
  },
  reviewPolicies: {
    id: 5
  },
  customerInfo: {
    id: 6
  },
  paymentInfo: {
    id: 7
  },
  thanksYou: {
    id: 8
  }
}

const defaultState = {
  currentStep: {
    id: 0
  },
  steps,
  dialog: {
    isOpen: false
  },
  bookingInfo: {
    returnUrl: '/',
    resort: {},
    guests: {
      adults: 1,
      children: 0,
      total: 1
    },
    transportation: true,
    message: '',
    name: '',
    email: '',
    phoneNumber: '',
    phoneCountry: countriesList.find(item => item.name === 'Cambodia'),
    payWith: 'card',
    roomType: {},
    dateOne: '',
    dateTwo: '',
    checkOut: '',
    prices: [],
    fullName: ''
  },
  vat: 0,
  finalPrice: 0,
  stripeKey: '',
  reservationId: 0,
  clientSecret: '',
  reservationDetails: {},
  isPaymentLoading: false,
  paymentError: ''
}

export default {
  namespaced: true,
  state: cloneDeep(defaultState),
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
      state.bookingInfo.checkOut = formatDate(new Date(addDays(payload, 1)), 'YYYY-MM-DD')
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
    updatePhoneNumber(state, payload) {
      state.bookingInfo.phoneNumber = payload
    },
    updatePhoneCountry(state, payload) {
      state.bookingInfo.phoneCountry = payload
    },
    updatePayWith(state, payload) {
      state.bookingInfo.payWith = payload
    },
    updateFullName(state, payload) {
      state.bookingInfo.fullName = payload
    },
    updateRoomType(state, payload) {
      state.bookingInfo.roomType = payload
    },
    updateReturnUrl(state, payload) {
      state.bookingInfo.returnUrl = payload
    },
    updateResort(state, payload) {
      state.bookingInfo.resort = payload
    },
    updateReservationId(state, payload) {
      state.reservationId = payload
    },
    updateReservationDetails(state, payload) {
      state.reservationDetails = payload
    },
    resetState(state) {
      for (const key in defaultState) {
        if (defaultState.hasOwnProperty(key)) {
          state[key] = cloneDeep(defaultState[key])
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
    cancelBooking(context) {
      context.commit('resetState')
    },
    startBooking(context, { resort, returnUrl }) {
      context.commit('updateResort', resort)
      context.commit('updateReturnUrl', returnUrl)
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
    updatePhoneNumber(context, payload) {
      context.commit('updatePhoneNumber', payload)
    },
    updatePhoneCountry(context, payload) {
      context.commit('updatePhoneCountry', payload)
    },
    updatePayWith(context, payload) {
      context.commit('updatePayWith', payload)
    },
    updateFullName(context, payload) {
      context.commit('updateFullName', payload)
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
    reserveRoom(context, payload) {
      const customBookingInfo = cloneDeep(payload)
      return ReservationService.reserveByRoomType(customBookingInfo)
        .then(reserveByRoomType => {
          return context.commit('updateReservationId', reserveByRoomType.reservationId)
        })
        .catch(error => {
          throw new Error('Error in reserve room.')
        })
    },
    getReservationDetails(context, reservationId) {
      return ReservationService.get({
        reservationId
      }).then(res => {
        context.commit('updateReservationDetails', res)
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
    customBookingInfo(state, getters) {
      const bookingInfo = state.bookingInfo

      return {
        roomTypeId: bookingInfo.roomType.id,
        model: {
          name: bookingInfo.fullName,
          message: bookingInfo.message,
          numberOfGuests: bookingInfo.guests.total,
          start: bookingInfo.dateOne,
          end: bookingInfo.checkOut,
          payment: {
            amount: getters.computedTotalPrice({ all: true })
          },
          // TODO: should I use auth email?
          // email: bookingInfo.email,
          email: store.getters['auth/user'].userName,
          phone: `+${bookingInfo.phoneCountry.callingCodes[0]}` + bookingInfo.phoneNumber
        }
      }
    },
    computedRoomPrice(state) {
      const prices = state.bookingInfo.prices
      let roomPrice = 0
      for (let i = 0; i < prices.length; i++) {
        roomPrice += prices[i].amount
      }
      return roomPrice
    },
    computedVAT: (state, getters) => ({ hasTransportation = false }) => {
      let prices = getters.computedRoomPrice
      if (hasTransportation) {
        prices += getters.computedTransportationPrice
      }
      const VAT_RATE = 0.1
      return prices * VAT_RATE
    },
    computedTransportationPrice(state, getters) {
      const transportation = state.bookingInfo.transportation
      let transportationPrice = 0
      if (transportation === true) {
        const TRANSPORTATION_PER_PAX = 10
        const adults = getters.bookingInfo.guests.adults
        transportationPrice = adults * TRANSPORTATION_PER_PAX
      }
      return transportationPrice
    },
    computedTotalPrice: (state, getters) => ({ all = false, hasVAT = false, hasTransportation = false } = {}) => {
      let totalPrice = getters.computedRoomPrice
      if (all || hasVAT) {
        totalPrice += getters.computedVAT({ hasTransportation })
      }
      if (all || hasTransportation) {
        totalPrice += getters.computedTransportationPrice
      }
      return totalPrice
    },
    currentStep(state) {
      return state.currentStep
    },
    steps(state) {
      return state.steps
    },
    reservationId(state) {
      return state.reservationId
    }
  }
}
