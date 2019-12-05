<template>
  <v-card tile :elevation="0" class="dark">
    <v-toolbar class="px-2" flat dark color="dark">
      <v-btn
        class="ma-0"
        small
        icon
        dark
        depressed
        @click="$emit('booking-close')"
      >
        <v-icon color="gray-82">close</v-icon>
      </v-btn>
      <v-toolbar-title class="light--text pl-0 ml-n4 text-center display-1"
        >Log in</v-toolbar-title
      >
    </v-toolbar>

    <div class="d-flex flex-column">
      <div class="light--text mx-auto">
        <v-card color="dark px-2 pb-4" tile :ripple="false">
          <AuthLogin></AuthLogin>
        </v-card>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import AuthLogin from '@/components/AuthLogin.vue'
import AuthSignUp from '@/components/AuthSignUp.vue'

export default Vue.extend({
  name: 'booking-auth',
  components: { AuthLogin },
  props: {
    nextStep: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // isLoading: false
    }
  },
  computed: {
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    submit() {
      store.dispatch('booking/updateCurrentStep', this.nextStep)
    }
  }
})
</script>

<style lang="scss" scoped>
//
</style>
