import { addDays } from 'date-fns'
import { RoomTypeService, CompanyService, ReservationService } from '@/connection/resources.js'
import { bookingStep } from '@/types'
import { setDocumentClassesOnToggleDialog } from '@/helpers'
import { cloneDeep } from 'lodash-es'
import countriesList from '@/constants/countries-list'

const steps: { [name: string]: bookingStep } = {
  notStarted: {
    id: 0
  },
  confirmDates: {
    id: 1,
    width: 348
  },
  auth: {
    id: 2,
    width: 376
  },
  confirmGuests: {
    id: 3,
    width: 376
  },
  confirmBooking: {
    id: 4,
    width: 348
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
      infants: 0,
      total: 1
    },
    transportation: true,
    message: '',
    name: '',
    email: '',
    phoneNumber: '',
    phoneCountry: countriesList.find(item => item.name === 'Cambodia'),
    payWith: 'cash',
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
    updateCardNumber(state, payload) {
      state.bookingInfo.cardNumber = payload
    },
    updateExpiration(state, payload) {
      state.bookingInfo.expiration = payload
    },
    updateCVV(state, payload) {
      state.bookingInfo.CVV = payload
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
    updateCardNumber(context, payload) {
      context.commit('updateCardNumber', payload)
    },
    updateExpiration(context, payload) {
      context.commit('updateExpiration', payload)
    },
    updateCVV(context, payload) {
      context.commit('updateCVV', payload)
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
      return (getters.computedTotalPrice + getters.computedTransportationPrice) * 0.1
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
    computedFinalPrice(state, getters) {
      return getters.computedTotalPrice + getters.computedVat + getters.computedTransportationPrice
    },
    currentStep(state) {
      return state.currentStep
    },
    steps(state) {
      return state.steps
    }
  }
}
