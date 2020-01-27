<template>
  <v-footer v-resize="storeFooterHeight" padless class="page-footer light--text" ref="pageFooter">
    <v-container fluid class="page-footer--container-1 px-0 py-8">
      <v-container class="is-limited align-start pt-0 pb-4">
        <v-row no-gutters justify-space-between>
          <v-col cols="6" sm="4" class="mb-4 mb-sm-0">
            <h3 class="h3 mb-6">Engage</h3>

            <ul class="pa-0 ma-0" style="list-style:none;">
              <li class="mb-2">
                <router-link to="/Contact" class="link">
                  Contact
                </router-link>
              </li>
              <li class="mb-2">
                <a href="http://asiato.asia/" target="_blank" class="link">About</a>
              </li>
              <!-- <li class="mb-2">Book Now</li> -->
              <li class="mb-2">
                <router-link to="/listing/in-the-press" class="link">
                  In the press
                </router-link>
              </li>
              <li class="mt-3">
                <div class="d-flex">
                  <a
                    :class="{ active: selectedLanguageCode === 'en' }"
                    @click="updateSelectedLanguageCode('en')"
                    class="page-footer--flag-link pa-1 primary--text mr-3"
                  >
                    <img
                      class="d-block page-footer--flag"
                      height="16"
                      src="https://restcountries.eu/data/usa.svg"
                      alt=""
                    />
                  </a>
                  <a
                    :class="{ active: selectedLanguageCode === 'kh' }"
                    @click="updateSelectedLanguageCode('kh')"
                    class="page-footer--flag-link pa-1 primary--text"
                  >
                    <img
                      class="d-block page-footer--flag"
                      height="16"
                      src="https://restcountries.eu/data/khm.svg"
                      alt=""
                    />
                  </a>
                </div>
              </li>
            </ul>
          </v-col>
          <v-col cols="6" sm="4" class="mb-4 mb-sm-0">
            <h3 class="h3 mb-6">Invest</h3>

            <ul class="pa-0 ma-0" style="list-style:none;">
              <li class="mb-2">
                <router-link to="/listing/nature-city-investment-cambodia-property" class="link">
                  Lease a Property
                </router-link>
              </li>
              <!-- <li class="mb-2">Collaborate</li> -->
              <li class="mb-2">
                <router-link to="/listing/partner" class="link">
                  Partner
                </router-link>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" sm="4" class="mb-4 mb-sm-0">
            <h3 class="h3 mb-6">Learn</h3>

            <ul class="pa-0 ma-0" style="list-style:none;">
              <!-- <li class="mb-2">Community Outreach</li> -->
              <li class="mb-2">
                <router-link to="/listing/our-scholarship-program" class="link">
                  Our Scholarship Program
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/listing/Proudly-Powered-by-KIT-Students" class="link">
                  Proudly Powered by KIT
                </router-link>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-footer>
</template>

<script>
import store from '@/store'
export default {
  name: 'page-footer',
  mounted() {
    this.storeFooterHeight()
  },
  methods: {
    updateSelectedLanguageCode(languageCode) {
      store.dispatch('language/updateSelectedLanguageCode', languageCode)
    },
    storeFooterHeight() {
      const pageFooter = this.$refs.pageFooter
      store.dispatch('layout/updateFooterHeight', pageFooter.$el.clientHeight)
    }
  },
  computed: {
    selectedLanguageCode() {
      return store.getters['language/config'].selectedLanguageCode
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: map-get($grey, 'lighten-1');
}
.page-footer {
  background-color: map-get($grey, 'darken-4') !important;
  z-index: $zindex-page-footer;
}
.page-footer--flag {
  border-radius: $border-radius-root;
}
.page-footer--flag-link {
  border: 1px solid transparent;
  &.active {
    border: 1px solid;
    border-radius: $border-radius-root;
  }
}
</style>
