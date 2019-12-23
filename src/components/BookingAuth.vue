<template>
  <v-card tile :elevation="0" class="dark">
    <v-toolbar class="px-2" flat dark color="dark">
      <v-btn
        class="ma-0"
        small
        icon
        dark
        depressed
        @click="$emit('booking-cancel')"
      >
        <v-icon color="gray-82">close</v-icon>
      </v-btn>
      <v-toolbar-title
        v-if="dialog.title"
        class="light--text pl-0 ml-n4 text-center display-1"
        >{{ dialog.title }}</v-toolbar-title
      >
    </v-toolbar>

    <div class="d-flex flex-column">
      <div class="light--text mx-auto">
        <v-card color="dark px-2 pb-4" tile :ripple="false">
          <auth-core />
        </v-card>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import AuthCore from '@/components/AuthCore.vue'

export default Vue.extend({
  name: 'booking-auth',
  components: { AuthCore },
  props: {
    nextStep: {
      type: Object,
      required: true
    }
  },
  mounted() {
    store.dispatch('auth/updateActiveState', 'auth-login')
    if (this.isAuthenticated) {
      this.goNextStep()
    }
  },
  computed: {
    dialog() {
      return store.getters['auth/dialog']
    },
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    }
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.goNextStep()
      }
    }
  },
  methods: {
    goNextStep() {
      store.dispatch('booking/updateCurrentStep', this.nextStep)
    }
  }
})
</script>
