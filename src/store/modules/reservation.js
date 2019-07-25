import Vue from 'vue'

export default {
  nampespaced:true,
  state:{
    dateOne: '',
    dateTwo: '',
    vat: '',
    finalPrice: '',
    prices: [{

    }],
  },
  getters:{
    vat: state => {
      return state.vat
    },
    finalPrice: state => {
      return state.finalPrice
    },
    dateOne: state => {
      return state.dateOne
    },
    dateTwo: state => {
      return state.dateTwo
    }
  },
  mutations:{
    updateDateOne(state, dateOne) {
      state.dateOne = dateOne
    },
    updateDateTwo(state, dateTwo) {
      state.dateTwo = dateTwo
    },
    computePrice: state => {
      state.prices.for( price => {
        state.finalprice+=price.amount
      })
      state.vat=state.finalPrice*0.1,
      state.vat=state.vat.toFixed(2),
      state.finalPrice=state.finalPrice.toFixed(2)
    }
  },
  actions:{
    getPrices(context){
      Vue.http.get('https://stagingapi.whynot.earth/api/v0/roomtypes/' + context.state.resort.modules.hotel.roomTypes[0].id + '/prices?startDate=' + context.state.dateOne + '&endDate=' + context.state.dateTwo).then(function(data){
        context.state.prices=data.body;
      })
    }
  }
}