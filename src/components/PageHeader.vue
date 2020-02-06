<template>
  <!-- 
  nav mobile       => logo                       hamburger
  nav desktop      =>        links / logo / links        /

  booking mobile   => logo           txt                 /
  booking desktop  => logo           links               /
  -->
  <div class="page-header">
    <!-- logo (portal content) -->
    <portal to="page-header-logo">
      <router-link width="54" exact class="page-header--logo" to="/">
        <img
          class="page-header--logo-image"
          :src="
            transformCloudinaryUrl(
              'https://res.cloudinary.com/die9ji2vn/image/upload/v1578304830/Home%20Page/logo2_qoiy2d.png',
              'h_64,f_auto'
            )
          "
          alt="vKirirom"
        />
      </router-link>
    </portal>

    <auth-dialog ref="authDialogRef"></auth-dialog>

    <v-app-bar dark app :height="$vuetify.breakpoint.smAndUp ? 80 : 56">
      <!-- ------ booking navigation ------ -->
      <div v-if="shouldShowBookingNavigation" class="d-flex justify-space-between align-center w-100">
        <portal-target slim name="page-header-logo"></portal-target>

        <div>
          <v-container class="is-limited pa-0">
            <v-row no-gutters v-if="$vuetify.breakpoint.mdAndUp">
              <v-col cols="12">
                <booking-navigation :desktop-mode="true"></booking-navigation>
              </v-col>
            </v-row>

            <booking-navigation :desktop-mode="false" v-else></booking-navigation>
          </v-container>
        </div>

        <div class="logo-mirror-ghost"></div>
      </div>

      <!-- ------ mobile navigation ------ -->
      <div v-else-if="$vuetify.breakpoint.smAndDown" class="d-flex justify-space-between align-center w-100">
        <portal-target slim name="page-header-logo"></portal-target>

        <!-- hamburger -->
        <v-app-bar-nav-icon
          v-if="!shouldShowBookingNavigation"
          class="d-md-none"
          @click.stop="drawer = !drawer"
          color="light"
        ></v-app-bar-nav-icon>
      </div>

      <!-- desktop menu -->
      <div v-else class="d-flex align-center h-100 w-100">
        <div class="h-100 flex-grow-1 flex-basis-0 d-flex">
          <v-toolbar-items class="page-header--nav-desktop ml-auto hidden-sm-and-down d-md-flex">
            <v-btn text class="text-transform-none" to="/search/accommodations"
              ><span class="mb-0 h3 font-weight-semiblack">Accommodation</span></v-btn
            >
            <v-btn text class="text-transform-none" to="/search/menu"
              ><span class="mb-0 h3 font-weight-semiblack">Menu</span></v-btn
            >
          </v-toolbar-items>
        </div>

        <div>
          <!-- logo -->
          <portal-target slim class="mx-3" name="page-header-logo"></portal-target>
        </div>

        <div class="h-100 flex-grow-1 flex-basis-0">
          <v-toolbar-items class="page-header--nav-desktop mr-auto hidden-sm-and-down d-md-flex">
            <v-btn text class="text-transform-none" to="/search/experiences"
              ><span class="mb-0 h3 font-weight-semiblack">Experiences</span></v-btn
            >

            <v-menu
              eager
              min-width="216"
              transition="slide-y-transition"
              offset-y
              v-if="isAuthenticated"
              :loading="loading"
            >
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" text class="text-transform-none"
                  ><span class="mb-0 h3 font-weight-semiblack"
                    >Profile<v-icon class="down-icon">chevron_right</v-icon></span
                  >
                </v-btn>
              </template>
              <v-list tile dense color="dark" class="dropdown-list">
                <!-- <v-list-item class="pa-0">
                  <v-btn text tile block class="text-transform-none"
                    ><span class="mb-0 title text-left w-100">Trips</span></v-btn
                  >
                </v-list-item> -->
                <!-- <v-list-item class="pa-0">
                  <v-btn text tile block class="text-transform-none"
                    ><span class="mb-0 title text-left w-100">My Account</span></v-btn
                  >
                </v-list-item> -->
                <v-list-item class="pa-0">
                  <v-btn
                    text
                    tile
                    block
                    class="text-transform-none"
                    @click="logout()"
                    v-if="isAuthenticated"
                    :loading="loading"
                    ><span class="mb-0 title text-left w-100">Log Out</span></v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn v-else text class="text-transform-none" @click="openLogin()"
              ><span class="mb-0 h3 font-weight-semiblack">Log In</span></v-btn
            >
          </v-toolbar-items>
        </div>
      </div>
    </v-app-bar>

    <!-- mobile drawer -->
    <v-navigation-drawer dark="" fixed class="d-md-none page-header--drawer" temporary v-model="drawer">
      <v-row no-gutters class="mb-8">
        <v-col cols="12">
          <div class="px-4 py-3">
            <portal-target slim name="page-header-logo"></portal-target>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn text block to="/search/accommodations" class="my-2 text-left"
            ><h3 class="mb-0 w-100 text-transform-none">Accommodation</h3></v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn text block to="/search/experiences" class="my-2 text-left"
            ><h3 class="mb-0 w-100 text-transform-none">Experience</h3></v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn text block to="/search/menu" class="my-2 text-left"
            ><h3 class="mb-0 w-100 text-transform-none">Menu</h3></v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn text block to="/search/blog" class="my-2 text-left"
            ><h3 class="mb-0 w-100 text-transform-none">Blog</h3></v-btn
          >
        </v-col>
        <v-col cols="12">
          <div class="mx-4">
            <v-divider class="my-3 dark-border"></v-divider>
          </div>
        </v-col>
        <v-col cols="12" v-if="!isAuthenticated">
          <v-btn text block class="my-2 text-left" @click="openLogin()"
            ><h3 class="mb-0 w-100 text-transform-none">Log in</h3></v-btn
          >
        </v-col>
        <v-col cols="12" v-else>
          <v-btn text block class="my-2 text-left"
            ><h3 class="mb-0 w-100 text-transform-none" @click="isProfileExpanded = !isProfileExpanded">
              Profile<v-icon size="32" class="ml-2 down-icon" :class="{ 'is-expanded': isProfileExpanded }"
                >chevron_right</v-icon
              >
            </h3>
          </v-btn>

          <v-slide-y-transition>
            <v-col cols="12" v-if="isProfileExpanded" no-gutters class="transition-fast-in-fast-out pa-0">
              <v-row no-gutters>
                <!-- <v-col cols="12">
                  <v-btn text block class="my-2 text-left"><h3 class="mb-0 w-100 text-transform-none">Trips</h3></v-btn>
                </v-col> -->
                <!-- <v-col cols="12">
                  <v-btn text block class="my-2 text-left"
                    ><h3 class="mb-0 w-100 text-transform-none">My Account</h3></v-btn
                  >
                </v-col> -->
                <v-col cols="12">
                  <v-btn text block class="my-2 text-left" @click="logout()" :loading="loading"
                    ><h3 class="mb-0 w-100 text-transform-none">Log out</h3></v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-slide-y-transition>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import store from '@/store'
import AuthDialog from '@/components/AuthDialog.vue'
import BookingNavigation from '@/components/BookingNavigation.vue'

export default {
  name: 'page-header',
  components: { AuthDialog, BookingNavigation },
  data() {
    return {
      isProfileExpanded: false,
      drawer: false
    }
  },
  methods: {
    async logout() {
      try {
        await store.dispatch('auth/logout')
        store.dispatch('snackbar/show', {
          color: 'success',
          text: 'Logging out was successful'
        })
      } catch (error) {
        store.dispatch('snackbar/show', {
          color: 'error',
          text: 'Logging out was unsuccessful'
        })
      }
    },
    openLogin() {
      this.drawer = false
      this.$nextTick(() => {
        this.$refs.authDialogRef.openDialog()
      })
    }
  },
  computed: {
    shouldShowBookingNavigation() {
      return this.$route.meta.hasBookingNavigation
    },
    isAuthenticated() {
      return store.getters['auth/isAuthenticated']
    },
    loading() {
      return store.getters['auth/loading']
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/utility.scss';
</style>

<style lang="scss" scoped>
.page-header {
  z-index: $zindex-page-header;
  height: rem($header-height-xs);
  @include media-breakpoint-up(sm) {
    height: rem($header-height-sm);
  }
}

.v-toolbar {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2);
}
::v-deep .v-toolbar__content {
  padding-top: 0;
  padding-bottom: 0;
}
.page-header--nav-desktop ::v-deep {
  .v-btn__content {
    position: relative;
    top: rem(12px);
  }
  .v-btn::before {
    background: none;
  }
  // .v-btn--active {
  //   color: $primary;
  // }
}

.page-header--logo-image {
  height: rem(32px);
  @include media-breakpoint-up(sm) {
    height: rem(40px);
  }

  vertical-align: middle;
}
.logo-mirror-ghost {
  width: rem(54px);
}

.v-list-item .v-btn {
  height: rem(44px) !important;
}
.down-icon {
  transform: rotate(90deg);
  &.is-expanded {
    transform: rotate(-90deg);
  }
}
.page-header--drawer {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2);
}
::v-deep .v-navigation-drawer__border {
  display: none;
}
</style>
