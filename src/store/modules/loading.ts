export default {
  namespaced: true,
  state: {
    refCount: 0,
    isLoading: true
  },
  mutations: {
    loading(state: any, isLoading: boolean) {
      if (isLoading) {
        state.refCount++
        state.isLoading = true
      } else if (state.refCount > 0) {
        state.refCount--
        state.isLoading = state.refCount > 0
      }
    }
  },
  getters: {
    isLoading(state: any) {
      return state.isLoading
    }
  }
}
