<template>
<div>
  <v-app-bar dark color="#191C21" dense>
    <router-link to="/">
      <img src="/img/icons/Logo.png" style="height:30px;">
    </router-link>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" style="color:#D8DADE;"></v-app-bar-nav-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn text class="button" to="/search/accommodations"><h3 class="desktop mb-0">Accommodation</h3></v-btn>
      <v-btn text class="button" to="/search/events"><h3 class="desktop mb-0">Events</h3></v-btn>
      <v-btn text class="button" to="/search/experiences"><h3 class="desktop mb-0">Experience</h3></v-btn>
      <v-btn text class="button" to="/search/food"><h3 class="desktop mb-0">Food</h3></v-btn>
      <v-btn text class="button" to="/search/blog"><h3 class="desktop mb-0">Blog</h3></v-btn>
      <v-btn text class="button" to="/listing/Pine-View-Kitchen-PVK"><h3 class="desktop mb-0">Restaurant</h3></v-btn>
      <v-btn text class="button" @click="logout()" v-if="isAuthenticated == true" :loading="loading"><h3 class="desktop mb-0">Log out</h3></v-btn>
    </v-toolbar-items>
  </v-app-bar>
  <v-navigation-drawer dark style="box-shadow: 0px 1px 0px #121416; position:fixed; background:#191C21;" class="hidden-md-and-up" temporary v-model="drawer">
    <v-row no-gutters text-left column class="mt-12">
      <v-flex xs12>
        <v-btn text block to="/search/accommodations" class="mt-2 button"><h3 class="mb-0">Accommodation</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn text block to="/search/events" class="mt-2 button"><h3 class="mb-0">Events</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn text block to="/search/experiences" class="mt-2 button"><h3 class="mb-0">Experience</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn text block to="/search/food" class="mt-2 button"><h3 class="mb-0">Food</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn text block to="/search/blog" class="mt-2 button"><h3 class="mb-0">Blog</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn text block to="/listing/Pine-View-Kitchen-PVK" class="mt-2 button"><h3 class="mb-0">Restaurant</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn text block class="mt-2 button" @click="logout()" v-if="isAuthenticated == true" :loading="loading"><h3 class="mb-0">Log out</h3></v-btn>
      </v-flex>
    </v-row>
  </v-navigation-drawer>
</div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/logout')
    }
  },
  computed:{
    isAuthenticated(){
      return this.$store.getters["auth/isAuthenticated"]
    },
    loading(){
      return this.$store.getters["auth/loading"]
    }
  }
}
</script>

<style>
/* button:active {
  background-color: #ffdb3a;
  transition: background 1s ease-out;
  } */
  .desktop{
    font-size: 16px; line-height: 22px; color: #D8DADE;
  }
  .button{
    color: #D8DADE; text-transform:capitalize;
  }
</style>
