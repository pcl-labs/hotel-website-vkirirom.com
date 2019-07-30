import Vue from "vue";

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
      return Vue.http.get("https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/" + slug).then(data => {
        context.commit("addItem", data.body);
      });
    }
  },
  getters: {
    getResort(state){
      return state.resort;
    },
  }
};
