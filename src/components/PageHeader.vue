<template>
  <div class="page-header">
    <auth-dialog ref="authDialogRef"></auth-dialog>
    <v-app-bar dark app height="56">
      <!-- logo -->
      <router-link exact class="page-header--logo" to="/">
        <img
          class="page-header--logo-image"
          :src="
            transformCloudinaryUrl(
              'https://res.cloudinary.com/die9ji2vn/image/upload/v1577807075/website-static/vkirirom-logo-light_p9uw0g.png',
              'h_64,f_auto'
            )
          "
        />
      </router-link>
      <v-spacer v-if="!shouldShowBookingNavigation"></v-spacer>
      <!-- hamburger -->
      <v-app-bar-nav-icon
        v-if="!shouldShowBookingNavigation"
        class="d-md-none"
        @click.stop="drawer = !drawer"
        color="light"
      ></v-app-bar-nav-icon>
      <!-- desktop menu -->
      <v-toolbar-items v-if="!shouldShowBookingNavigation" class="hidden-sm-and-down d-md-flex">
        <v-btn text class="button text-transform-none" to="/search/accommodations"
          ><h3 class="mb-0">Accommodation</h3></v-btn
        >
        <v-menu eager min-width="216" transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text class="button text-transform-none"
              ><h3 class="mb-0">Activities<v-icon class="down-icon">chevron_right</v-icon></h3>
            </v-btn>
          </template>
          <v-list tile dense color="dark">
            <v-list-item class="pa-0">
              <v-btn text tile block class="button text-transform-none" to="/search/events"
                ><h3 class="mb-0 title text-left w-100">Events</h3></v-btn
              >
            </v-list-item>
            <v-list-item class="pa-0">
              <v-btn text tile block class="button text-transform-none" to="/search/experiences"
                ><h3 class="mb-0 title text-left w-100">Experiences</h3></v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu eager min-width="216" transition="slide-y-transition" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text class="button text-transform-none"
              ><h3 class="mb-0">Food<v-icon class="down-icon">chevron_right</v-icon></h3>
            </v-btn>
          </template>
          <v-list tile dense color="dark" class="dropdown-list">
            <v-list-item class="pa-0">
              <v-btn text tile block class="button text-transform-none" to="/listing/Pine-View-Kitchen-PVK"
                ><h3 class="mb-0 title text-left w-100">Restaurant</h3></v-btn
              ></v-list-item
            >
            <v-list-item class="pa-0">
              <v-btn text tile block class="button text-transform-none" to="/search/food"
                ><h3 class="mb-0 title text-left w-100">Menu</h3></v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text class="button text-transform-none" to="/search/blog"><h3 class="mb-0">Blog</h3></v-btn>

        <v-menu
          eager
          min-width="216"
          transition="slide-y-transition"
          offset-y
          v-if="isAuthenticated"
          :loading="loading"
        >
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text class="button text-transform-none"
              ><h3 class="mb-0">Profile<v-icon class="down-icon">chevron_right</v-icon></h3>
            </v-btn>
          </template>
          <v-list tile dense color="dark" class="dropdown-list">
            <v-list-item class="pa-0">
              <v-btn text tile block class="button text-transform-none"
                ><h3 class="mb-0 title text-left w-100">Trips</h3></v-btn
              >
            </v-list-item>
            <v-list-item class="pa-0">
              <v-btn text tile block class="button text-transform-none"
                ><h3 class="mb-0 title text-left w-100">My Account</h3></v-btn
              >
            </v-list-item>
            <v-list-item class="pa-0">
              <v-btn
                text
                tile
                block
                class="button text-transform-none"
                @click="logout()"
                v-if="isAuthenticated"
                :loading="loading"
                ><h3 class="mb-0 title text-left w-100">Log Out</h3></v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-else text class="button text-transform-none" @click="openLogin()"><h3 class="mb-0">Log In</h3></v-btn>
      </v-toolbar-items>

      <v-container class="is-limited pa-0" v-if="shouldShowBookingNavigation">
        <v-row no-gutters>
          <v-col cols="12">
            <booking-navigation></booking-navigation>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- mobile menu -->
    <v-navigation-drawer color="dark" fixed class="d-md-none page-header--drawer" temporary v-model="drawer">
      <v-row no-gutters text-left column class="mt-12">
        <v-flex xs12>
          <v-btn text block to="/search/accommodations" class="my-2 button"><h3 class="mb-0">Accommodation</h3></v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn text block to="/search/events" class="my-2 button"><h3 class="mb-0">Events</h3></v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn text block to="/search/experiences" class="my-2 button"><h3 class="mb-0">Experience</h3></v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn text block to="/search/food" class="my-2 button"><h3 class="mb-0">Food</h3></v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn text block to="/search/blog" class="my-2 button"><h3 class="mb-0">Blog</h3></v-btn>
        </v-flex>
        <v-flex xs12>
          <v-btn text block to="/listing/Pine-View-Kitchen-PVK" class="my-2 button"
            ><h3 class="mb-0">Restaurant</h3></v-btn
          >
        </v-flex>
        <v-flex xs12>
          <v-btn text block class="my-2 button" @click="openLogin()" v-if="!isAuthenticated"
            ><h3 class="mb-0">Log in</h3></v-btn
          >
        </v-flex>
        <v-flex xs12>
          <v-btn text block class="my-2 button" @click="logout()" v-if="isAuthenticated" :loading="loading"
            ><h3 class="mb-0">Log out</h3></v-btn
          >
        </v-flex>
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
      drawer: false
    }
  },
  methods: {
    logout() {
      store.dispatch('auth/logout')
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
      return this.$route.meta.hasBookingNavigation && this.$vuetify.breakpoint.mdAndUp
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

<style lang="scss" scoped>
@import '@/styles/utility.scss';

.page-header {
  min-height: $header-height;
}
.v-list-item .v-btn {
  height: rem(44px) !important;
}
.button {
  color: map-get($grey, 'lighten-1');
  text-transform: capitalize;
}
.page-header--logo {
  @media (min-width: map-get($map: $grid-breakpoints, $key: md) + 120px) {
    position: absolute;
  }
}
.page-header--logo-image {
  height: rem(32px);
  vertical-align: middle;
}
.v-btn {
  letter-spacing: 0;
}
.down-icon {
  transform: rotate(90deg);
}
.page-header--drawer {
  box-shadow: 0px 1px 0px map-get($grey, 'darken-4');
}
</style>
