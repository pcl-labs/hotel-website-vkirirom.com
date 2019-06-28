<template>
<v-container-fluid>
  <v-toolbar app dark color="#191C21" dense>
    <router-link to="/">
      <img src="/static/img/icons/Logo.png" style="height:30px;">
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" style="color:#D8DADE;"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat style="color: #D8DADE; text-transform:capitalize;" to="/search/accommodations"><h3 style="font-size: 16px; line-height: 22px; color: #D8DADE;">Accommodation</h3></v-btn>
      <v-btn flat style="color: #D8DADE; text-transform:capitalize;" to="/search/events"><h3 style="font-size: 16px; line-height: 22px; color: #D8DADE;">Events</h3></v-btn>
      <v-btn flat style="color: #D8DADE; text-transform:capitalize;" to="/search/experience"><h3 style="font-size: 16px; line-height: 22px; color: #D8DADE;">Experience</h3></v-btn>
      <v-btn flat style="color: #D8DADE; text-transform:capitalize;" to="/search/food"><h3 style="font-size: 16px; line-height: 22px; color: #D8DADE;">Food</h3></v-btn>
      <v-btn flat style="color: #D8DADE; text-transform:capitalize;" to="/search/blog"><h3 style="font-size: 16px; line-height: 22px; color: #D8DADE;">Blog</h3></v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-navigation-drawer dark style="box-shadow: 0px 1px 0px #121416; position:fixed; background:#191C21;" class="hidden-md-and-up" temporary v-model="drawer">
    <v-layout text-xs-left column wrap class="mt-5">
      <v-flex xs12>
        <v-btn flat block style="color: #D8DADE; text-transform:capitalize" to="/search/accommodations" class="mt-2"><h3>Accommodation</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block style="color: #D8DADE; text-transform:capitalize" to="/search/events" class="mt-2"><h3>Events</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block style="color: #D8DADE; text-transform:capitalize" to="/search/experience" class="mt-2"><h3>Experience</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block style="color: #D8DADE; text-transform:capitalize" to="/search/food" class="mt-2"><h3>Food</h3></v-btn>
      </v-flex>
      <v-flex>
        <v-btn flat block style="color: #D8DADE; text-transform:capitalize" to="/search/blog" class="mt-2"><h3>Blog</h3></v-btn>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</v-container-fluid>
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
</style>
