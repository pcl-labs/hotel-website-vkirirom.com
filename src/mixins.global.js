import Vue from 'vue'
import { transformCloudinaryUrl, getPosterImage } from '@/helpers'
import vhFix from '@/mixins/vh-fix'
import connection from "@/mixins/connection.js";

Vue.mixin({
  mixins: [vhFix],
  data() {
    return {
      pageWidth: document.body.clientWidth
    }
  },
  methods: {
    ...connection,
    transformCloudinaryUrl,
    getPosterImage
  }
})
