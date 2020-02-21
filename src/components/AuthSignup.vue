<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-container fluid class="pa-0 d-flex flex-column flex-grow-1 justify-space-between">
      <v-row no-gutters class="flex-grow-0" v-if="formMode === 'by-oauth'">
        <v-col cols="12" class="mb-2">
          <!-- by oauth providers -->
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn
                x-large
                block
                outlined
                dark
                class="mb-8 text-capitalize light--text py-3"
                @click="oauth('Facebook')"
                ><v-spacer></v-spacer><v-icon class="mr-4">$vuetify.icons.facebook</v-icon
                ><span>Continue with Facebook</span><v-spacer></v-spacer>
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn x-large block outlined dark class="mb-8 text-capitalize light--text py-3" @click="oauth('Google')"
                ><v-spacer></v-spacer><v-icon class="mr-4">$vuetify.icons.google</v-icon
                ><span>Continue with Google</span><v-spacer></v-spacer><v-icon>keyboard_arrow_right</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-col>

        <separator-or></separator-or>

        <!-- by oauth providers -->
        <v-col cols="12">
          <v-col cols="12" v-if="registerError">
            <p class="error--text">{{ registerError }}</p>
          </v-col>

          <v-btn
            x-large
            block
            color="primary"
            class="py-3 text-transform-none mb-4 dark--text"
            dark
            @click="formMode = 'by-email'"
          >
            <v-spacer></v-spacer>
            <v-icon class="mr-4">$vuetify.icons.messageDark</v-icon>
            <span>Sign up with Email</span>
            <v-spacer></v-spacer>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <auth-signup-by-email v-if="formMode === 'by-email'"></auth-signup-by-email>
    </v-container>
  </div>
</template>

<script lang="ts">
const SeparatorOr = () => import('@/components/SeparatorOr.vue');
const AuthSignupByEmail = () => import('@/components/AuthSignupByEmail.vue');
import store from '@/store';

// TODO: if register error happened and account exists, then $emit 'auth-login-existing-account'

export default {
  name: 'auth-signup',
  components: { SeparatorOr, AuthSignupByEmail },
  data() {
    return {
      formMode: 'by-oauth'
    };
  },
  methods: {
    updateActiveState(value) {
      (this as any).$store.dispatch('auth/updateActiveState', value);
    },
    async oauth(provider) {
      // TODO: move to store
      await (this as any).$store.commit('auth/updateProvider', provider);
      await (this as any).$store.dispatch('auth/updateReturnUrl', window.location.href);
      const redirectUrl = await (this as any).$store.getters['auth/oauth'];
      window.location.assign(redirectUrl);
      (this as any).$store.dispatch('auth/ping');
    }
  },
  computed: {
    registerError() {
      return (this as any).$store.getters['auth/registerError'];
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>
