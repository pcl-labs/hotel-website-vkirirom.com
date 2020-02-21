import Vue from 'vue';
import { transformCloudinaryUrl, getPosterImage } from '@/helpers';
import vhFix from '@/mixins/vh-fix';

Vue.mixin({
  mixins: [vhFix],
  data() {
    return {
      // pageWidth: document.body.clientWidth,
      // devicePixelRatio: window.devicePixelRatio || 1
    };
  },
  methods: {
    transformCloudinaryUrl,
    getPosterImage
  }
});
