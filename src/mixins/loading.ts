import { mapState } from 'vuex'
import loadingProgress from '@/components/LoadingProgress.vue'
import store from '@/store'

export default {
  components: { loadingProgress },
  mounted() {
    store.commit('loading/loading', true)
    setTimeout(() => {
      store.commit('loading/loading', false)
    }, 1000)
  },
  computed: {
    ...mapState({
      isLoading: (state: any) => state.loading.isLoading
    })
  },
  watch: {
    isLoading(newValue: boolean, oldValue: boolean) {
      if (newValue !== oldValue) {
        if (newValue === true) {
          document.body.setAttribute('page-is-loading', 'true')
        } else {
          document.body.removeAttribute('page-is-loading')
        }
      }
    }
  }
}
