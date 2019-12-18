// TODO: separate resorts similar to https://github.com/whynotearth/shinta-mani-wild/pull/298
// TODO: remove deprecateds
import { PageService } from '@/connection/resources.js'
import Vue from 'vue'

const companySlug = 'vkirirom'

export default {
  namespaced: true,
  state: {
    items: {},
    // deprecated
    resort: {}
  },
  mutations: {
    // deprecated
    addItem(state, payload) {
      state.resort = payload
    },

    update(state: any, { data, slug }: any) {
      const items = Object.assign({}, state.items, { [slug]: data })
      Vue.set(state, 'items', items)
    }
  },
  actions: {
    // deprecated
    getItemBySlug(context, slug) {
      context.state.resort = {}
      return PageService.get({
        companySlug,
        pageSlug: slug
      }).then(res => {
        context.commit('addItem', res)
      })
    },

    getBySlug(context: any, slug: string) {
      context.state.items[slug] = {}
      return PageService.get({
        companySlug,
        pageSlug: slug
      }).then((data: any) => {
        context.commit('update', { data, slug })
      })
    }
  },
  getters: {
    // deprecated
    getResort(state) {
      return state.resort
    },

    items(state: any) {
      return state.items
    },
    itemBySlug: (state: any) => (slug: string) => {
      return state.items[slug] || {}
    }
  }
}
