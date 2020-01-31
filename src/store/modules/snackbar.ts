const defaultSettings = {
  text: '',
  visible: false,
  color: 'success',
  timeout: 3000,
  bottom: true,
  left: false,
  right: false
}

export default {
  namespaced: true,
  state: {
    item: { ...defaultSettings }
  },
  mutations: {
    update(state, payload) {
      state.item = payload
    },
    updateVisibility(state, payload) {
      state.item.visible = payload
    }
  },
  actions: {
    show(context, payload) {
      const settings = {
        ...defaultSettings,
        ...payload,
        visible: true
      }
      context.commit('update', settings)
    },
    updateVisibility(context, payload) {
      context.commit('updateVisibility', payload)
    }
  },
  getters: {
    item(state) {
      return state.item
    }
  }
}
