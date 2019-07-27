import Vue from 'vue'
import connection from "@/mixins/connection.js";

Vue.mixin({
  methods: {
    ...connection
  }
})
