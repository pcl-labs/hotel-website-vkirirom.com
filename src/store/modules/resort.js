import { PageService } from '@/connection/resources.js'

export default {
  namespaced: true,
  state: {
    resort:{}
  },
  mutations: {
    addItem(state, payload) {
      state.resort = payload
    }
  },
  actions: {
    getItemBySlug(context, slug) {
      context.state.resort={};
      return PageService.get({
        companySlug: 'vkirirom',
        pageSlug: slug
      })
      .then(res => {
        context.commit("addItem", res);
      });
    }
  },
  getters: {
    getResort(state){
      return state.resort;
    },
  }
};
