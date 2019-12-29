<template>
  <!-- TODO: header https://res.cloudinary.com/die9ji2vn/image/upload/v1577609316/Booking%20Flow/LogIn_bl4sz3.png -->
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
      <v-card tile :elevation="0" class="dark px-4 pt-6 pb-8">
        <div class="d-flex mb-2 align-center mb-8 mx-auto">
          <v-btn class="ma-0" small icon dark depressed @click="closeDialog()">
            <v-icon color="gray-82">close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <div v-if="dialog.title" class="light--text pl-0 ml-sm-n4 ml-md-0 text-center display-1">
            {{ dialog.title }}
          </div>
          <v-spacer></v-spacer>
        </div>

        <div class="d-flex flex-column">
          <div class="light--text mx-auto">
            <v-card color="dark" tile :ripple="false" :elevation="0">
              <auth-core />
            </v-card>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import AuthCore from '@/components/AuthCore.vue'

export default Vue.extend({
  name: 'booking-dialog',
  components: { AuthCore },
  computed: {
    dialog() {
      return store.getters['auth/dialog']
    },
    isDialogOpen: {
      get() {
        return store.getters['auth/dialog'].isOpen
      },
      set(value: boolean) {
        store.dispatch('auth/updateDialog', {
          isOpen: value
        })
      }
    },
    isAuthenticated(): boolean {
      return store.getters['auth/isAuthenticated']
    }
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.closeDialog()
      }
    }
  },
  methods: {
    onClose() {
      this.closeDialog()
    },
    // NOTE: can be used outside of component by ref
    openDialog() {
      store.dispatch('auth/updateActiveState', 'auth-login')
      store.dispatch('auth/updateDialog', {
        isOpen: true
      })
    },
    closeDialog() {
      store.dispatch('auth/updateDialog', {
        isOpen: false
      })
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
