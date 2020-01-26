// @ts-ignore
import { PageService } from '@/connection/resources.js'
import { Category } from '@/types'
import Vue from 'vue'
import { companySlug } from '@/constants/app'

export default {
  namespaced: true,
  state: {
    items: {}
  },
  mutations: {
    update(state: any, payload: any) {
      Vue.set(state.items, payload.key, payload.data)
    }
  },
  actions: {
    getItemsByName(context: any, name: String): Category[] {
      return PageService.byCompanyByCategoryName({
        companySlug,
        categoryName: name
      }).then((res: any) => {
        context.commit('update', { key: name, data: res })
      })
    }
  },
  getters: {
    getItemsByName: (state: any) => name => {
      return state.items[name] || []
    }
  }
}
