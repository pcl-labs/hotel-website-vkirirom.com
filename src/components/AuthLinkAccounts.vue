<template>
  <div class="w-100">
    <div class="d-flex align-center w-100">
      <label @click="oauth('Google')" for="connect-to-google"
        ><v-icon class="mr-4">$vuetify.icons.google</v-icon><span>Google</span></label
      >
      <v-spacer></v-spacer>
      <v-switch
        @click="oauth('Google')"
        id="connect-to-google"
        color="primary"
        flat
        v-model="connectedGoogle"
      ></v-switch>
    </div>
    <div class="d-flex align-center w-100">
      <label @click="oauth('Facebook')" for="connect-to-facebook"
        ><v-icon class="mr-4">$vuetify.icons.facebook</v-icon><span>Facebook</span></label
      >
      <v-spacer></v-spacer>
      <v-switch
        @click="oauth('Facebook')"
        id="connect-to-facebook"
        color="primary"
        flat
        v-model="connectedFacebook"
      ></v-switch>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'auth-link-accounts',
  data: () => ({
    connectedGoogle: false,
    connectedFacebook: false
  }),
  methods: {
    async oauth(provider) {
      await (this as any).$store.commit('auth/updateProvider', provider);
      await (this as any).$store.dispatch('auth/updateReturnUrl', window.location.href);
      const redirectUrl = await (this as any).$store.getters['auth/oauth'];
      window.location.assign(redirectUrl);
    }
  }
});
</script>

<style lang="scss">
// @import '@/styles/utility.scss';
</style>
