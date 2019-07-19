<template>
<v-container>
  <v-toolbar app dark color="#191C21" dense>
    <router-link to="/">
      <img src="/img/icons/Logo.png" style="height:30px;">
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" style="color:#D8DADE;"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat class="button" to="/search/accommodations"><h3 class="desktop">Accommodation</h3></v-btn>
      <v-btn flat class="button" to="/search/events"><h3 class="desktop">Events</h3></v-btn>
      <v-btn flat class="button" to="/search/experiences"><h3 class="desktop">Experience</h3></v-btn>
      <v-btn flat class="button" to="/search/food"><h3 class="desktop">Food</h3></v-btn>
      <v-btn flat class="button" to="/search/blog"><h3 class="desktop">Blog</h3></v-btn>
      <v-btn flat class="button" to="/listing/Pine-View-Kitchen-PVK"><h3 class="desktop">Restaurant</h3></v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-navigation-drawer dark style="box-shadow: 0px 1px 0px #121416; position:fixed; background:#191C21;" class="hidden-md-and-up" temporary v-model="drawer">
    <v-layout text-xs-left column wrap class="mt-5">
      <v-flex xs12>
        <v-btn flat block to="/search/accommodations" class="mt-2 button"><h3>Accommodation</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block to="/search/events" class="mt-2 button"><h3>Events</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block to="/search/experiences" class="mt-2 button"><h3>Experience</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block to="/search/food" class="mt-2 button"><h3>Food</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block to="/search/blog" class="mt-2 button"><h3>Blog</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block to="/listing/Pine-View-Kitchen-PVK" class="mt-2 button"><h3>Restaurant</h3></v-btn>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
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
