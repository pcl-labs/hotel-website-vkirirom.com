import Vue from 'vue';
import { dark } from '@/constants/themes';
import IconFacebook from '@/components/IconFacebook.vue';
import IconGoogle from '@/components/IconGoogle.vue';
import IconMessage from '@/components/IconMessage.vue';
import IconMessageDark from '@/components/IconMessageDark.vue';
import IconLock from '@/components/IconLock.vue';
import IconCash from '@/components/IconCash.vue';
import IconUser from '@/components/IconUser.vue';
import IconCreditCard from '@/components/IconCreditCard.vue';
// @ts-ignore
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

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
      creditCard: {
        component: IconCreditCard
      },
      cash: {
        component: IconCash
      },
      user: {
        component: IconUser
      }
    }
  },
  theme: {
    dark: true,
    themes: {
      dark
    }
  }
});
