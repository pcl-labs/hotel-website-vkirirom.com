export default {
  namespaced: true,
  state: {
    refCount: 0,
    isLoading: true,
    firstRouteEntered: false
  },
  mutations: {
    loading(state, isLoading: boolean) {
      if (isLoading) {
        state.refCount++
        state.isLoading = true
      } else if (state.refCount > 0) {
        state.refCount--
        state.isLoading = state.refCount > 0
      }
    },
    updateFirstRouteEntered(state, payload) {
      state.firstRouteEntered = payload
    }
  },
  getters: {
    isLoading(state): boolean {
      return state.isLoading
    },
    firstRouteEntered(state): boolean {
      return state.firstRouteEntered
    }
  }
}
