import { addDays } from 'date-fns'
import { RoomTypeService } from '@/connection/resources.js'

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
    prices: []
  }
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
      console.log('start booking...')

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
    }
  },
  getters: {
    bookingInfo(state) {
      return state.bookingInfo
    },
    currentStep(state) {
      return state.currentStep
    }
  }
}
