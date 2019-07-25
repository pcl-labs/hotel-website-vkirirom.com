import Vue from "vue";

export default {
  namespaced: true,
  state: {},
  mutations: {
    addItem(state, payload) {
      Vue.set(state, payload.slug, payload)
    }
  },
  actions: {
    getItemBySlug(context, slug) {
      return Vue.http.get("https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/" + slug).then(function(data) {
        context.commit("addItem", data.body);
      });
    }
  },
  getters: {
    getItemBySlug: (state) => slug => {
      return state[slug];
    }
  }
};
