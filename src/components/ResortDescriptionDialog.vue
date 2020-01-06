<template>
  <v-dialog
    dark
    v-model="isDialogOpen"
    :width="600"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :hide-overlay="$vuetify.breakpoint.smAndDown"
    transition="dialog-bottom-transition"
  >
    <v-card tile :elevation="0" color="dark" v-if="resort.id">
      <v-toolbar class="px-2" flat dark color="dark">
        <v-btn class="ma-0" small icon dark depressed @click="closeDialog()">
          <v-icon color="gray-82">close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="resort.title" class="light--text pl-0 ml-sm-n4 ml-md-0 text-center display-1">{{
          resort.title
        }}</v-toolbar-title>
      </v-toolbar>

      <div class="d-flex flex-column">
        <div class="light--text mx-auto">
          <v-card color="dark mt-6 px-6 pb-4" tile :ripple="false">
            <resort-description :resort="resort"></resort-description>

            <v-btn
              @click="closeDialog"
              x-large
              block
              color="primary"
              dark
              class="text-transform-none font-weight-bold dark--text text-center mt-6"
              type="submit"
            >
              <span>Close</span>
            </v-btn>
          </v-card>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import ResortDescription from '@/components/ResortDescription.vue'
import store from '../store'
import { Resort } from '../types'
export default Vue.extend({
  name: 'resort-description-dialog',
  components: { ResortDescription },
  props: {
    slug: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      isDialogOpen: false
    }
  },
  mounted() {
    this.getResort()
  },
  methods: {
    openDialog() {
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isDialogOpen = false
    },
    getResort() {
      this.$store.dispatch('resort/getBySlug', this.slug)
    }
  },
  computed: {
    resort(): Resort {
      return store.getters['resort/itemBySlug'](this.slug)
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
