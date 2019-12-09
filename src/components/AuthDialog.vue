<template>
  <fragment>
    <!-- we load the activator (e.g. "book now" button) here -->
    <slot name="default" />

    <v-dialog
      dark
      persistent
      v-model="isDialogOpen"
      :width="currentStep.width"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      transition="dialog-bottom-transition"
    >
      <auth-core />
    </v-dialog>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import BookingConfirmDates from '@/components/BookingConfirmDates.vue'
import BookingAuth from '@/components/BookingAuth.vue'
import AuthCore from '@/components/AuthCore.vue'

export default Vue.extend({
  name: 'booking-dialog',
  components: { BookingConfirmDates, BookingAuth, AuthCore },
  data() {
    return {
      isDialogOpen: false
    }
  },
  mounted() {
    this.resetComponentState()
  },
  watch: {
    currentStep(newVal, oldValue) {
      this.isDialogOpen = newVal.id > 0
      this.setDocumentClasses()
    }
  },
  computed: {
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    setDocumentClasses() {
      if (this.isDialogOpen) {
        document.documentElement.classList.add(
          'overflow-y-hidden',
          'dialog--is-open'
        )
      } else {
        document.documentElement.classList.remove(
          'overflow-y-hidden',
          'dialog--is-open'
        )
      }
    },
    // this is for development purposes only, related to HMR
    resetComponentState() {
      // FIXME: enable
      this.isDialogOpen = false
      this.setDocumentClasses()
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep {
  .v-dialog {
    border-radius: 0;
  }
  .v-toolbar__title {
    width: calc(100% - #{rem(28px)});
  }
}
</style>

<style lang="scss">
// global
.dialog--is-open {
  .v-overlay--active ~ .v-application--wrap {
    filter: blur(8px);
  }
  .v-overlay__scrim {
    background-color: rgba(black, 0.4) !important;
  }
}
</style>
