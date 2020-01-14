export default {
  namespaced: true,
  state: {
    config: {
      selectedLanguageCode: 'en'
    }
  },
  mutations: {
    updateSelectedLanguageCode(state, payload) {
      state.config.selectedLanguageCode = payload
    }
  },
  actions: {
    updateSelectedLanguageCode(context, payload) {
      context.commit('updateSelectedLanguageCode', payload)
    }
  },
  getters: {
    config(state) {
      return state.config
    }
  }
}
