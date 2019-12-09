<template>
  <fragment>
    <v-dialog
      dark
      persistent
      v-model="isDialogOpen"
      :width="376"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :hide-overlay="$vuetify.breakpoint.smAndDown"
      transition="dialog-bottom-transition"
    >
      <v-card tile :elevation="0" class="dark">
        <v-toolbar class="px-2" flat dark color="dark">
          <v-btn class="ma-0" small icon dark depressed @click="closeDialog()">
            <v-icon color="gray-82">close</v-icon>
          </v-btn>
          <v-toolbar-title
            v-if="title"
            class="light--text pl-0 ml-n4 text-center display-1"
            >{{ title }}</v-toolbar-title
          >
        </v-toolbar>

        <div class="d-flex flex-column">
          <div class="light--text mx-auto">
            <v-card color="dark px-2 pb-4" tile :ripple="false">
              <auth-core
                @message="onMessage"
                @change-auth-state="changeAuthState"
              />
            </v-card>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar color="success" top v-model="snackbar" :timeout="2000">
      {{ snackbarTitle }}
      <v-btn color="white" text @click="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import AuthCore from '@/components/AuthCore.vue'

export default Vue.extend({
  name: 'booking-dialog',
  components: { AuthCore },
  data() {
    return {
      snackbar: false,
      snackbarTitle: '',
      title: 'Log In',
      isDialogOpen: false
    }
  },
  mounted() {
    this.resetComponentState()
  },
  watch: {
    isDialogOpen() {
      this.setDocumentClasses()
    },
    isAuthenticated(newVal) {
      if (newVal) {
        this.snackbar = true
        this.closeDialog()
      }
    }
  },
  computed: {
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    onMessage({ title }) {
      this.snackbarTitle = title
      this.snackbar = true
    },
    openDialog() {
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isDialogOpen = false
    },
    changeAuthState({ title }) {
      this.title = title
    },
    onClose() {
      this.closeDialog()
    },
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
