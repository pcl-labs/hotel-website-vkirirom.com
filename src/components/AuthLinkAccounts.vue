<template>
  <div class="w-100">
    <!-- facebook -->
    <div class="d-flex align-center w-100">
      <label for="connect-to-facebook"
        ><v-icon class="mr-4">$vuetify.icons.facebook</v-icon><span>Facebook</span></label
      >
      <v-spacer></v-spacer>
      <v-switch
        value="Facebook"
        :loading="isLoading.facebook"
        id="connect-to-facebook"
        color="primary"
        flat
        v-model="connectedProviders"
        @change="value => toggleProviderState('Facebook', value)"
      ></v-switch>
    </div>
    <!-- google -->
    <div class="d-flex align-center w-100">
      <label for="connect-to-google"><v-icon class="mr-4">$vuetify.icons.google</v-icon><span>Google</span></label>
      <v-spacer></v-spacer>
      <v-switch
        value="Google"
        :loading="isLoading.google"
        id="connect-to-google"
        color="primary"
        flat
        v-model="connectedProviders"
        @change="value => toggleProviderState('Google', value)"
      ></v-switch>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'auth-link-accounts',
  data: () => ({
    isLoading: {
      Google: true,
      Facebook: false
    },
    connectedProviders: ['Google']
  }),
  watch: {
    loginProviders: {
      immediate: true,
      deep: true,
      handler(newValue) {
        console.log(newValue);
        this.connectedProviders = [...this.loginProviders];
      }
    }
  },
  computed: {
    loginProviders() {
      return (this as any).$store.getters['auth/user'].loginProviders;
    }
  },
  methods: {
    toggleProviderState(provider) {
      this.isProviderConnected(provider) ? this.connectProvider(provider) : this.disconnectProvider(provider);
    },
    async disconnectProvider(provider) {
      this.isLoading[provider] = 'secondary';
      console.log('TODO disconnect', provider);
    },
    async connectProvider(provider) {
      console.log('connect', provider);
      this.isLoading[provider] = 'secondary';
      await (this as any).$store.commit('auth/updateProvider', provider);
      await (this as any).$store.dispatch('auth/updateReturnUrl', window.location.href);
      const redirectUrl = await (this as any).$store.getters['auth/oauth'];
      window.location.assign(redirectUrl);
    },
    isProviderConnected(provider) {
      return this.connectedProviders.includes(provider);
    }
  }
});
</script>

<style lang="scss">
// @import '@/styles/utility.scss';
</style>
