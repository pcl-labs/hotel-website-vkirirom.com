export default {
  namespaced: true,
  state: {
    sizing: {
      footerHeight: 0
    }
  },
  mutations: {
    updateFooterHeight(state, payload) {
      state.sizing.footerHeight = payload;
    }
  },
  actions: {
    updateFooterHeight(context, payload) {
      context.commit('updateFooterHeight', payload);
    }
  },
  getters: {
    getSizing(state) {
      return state.sizing;
    }
  }
};
