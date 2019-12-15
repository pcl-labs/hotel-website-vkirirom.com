import Vue from 'vue'
import { light } from '@/constants/themes'
import IconFacebook from '@/components/IconFacebook.vue'
import IconGoogle from '@/components/IconGoogle.vue'
import IconMessage from '@/components/IconMessage.vue'
import IconMessageDark from '@/components/IconMessageDark.vue'
import IconLock from '@/components/IconLock.vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    values: {
      facebook: {
        component: IconFacebook,
        props: {}
      },
      google: {
        component: IconGoogle
      },
      message: {
        component: IconMessage
      },
      messageDark: {
        component: IconMessageDark
      },
      lock: {
        component: IconLock
      },
    }
  },
  theme: {
    dark: false,
    themes: {
      light
    }
  }
})