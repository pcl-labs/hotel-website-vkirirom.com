<template>
<div>
  <v-app-bar dark color="#191C21" dense>
    <router-link to="/">
      <img class="toolbar--logo" src="/img/icons/Logo.png">
    </router-link>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon class="d-md-none" @click.stop="drawer = !drawer" style="color:#D8DADE;"></v-app-bar-nav-icon>
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn text class="button" to="/search/accommodations"><h3 class="desktop mb-0">Accommodation</h3></v-btn>
     <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
        v-on="on"
        text class="button" 
        ><h3 class="desktop mb-0">Activities<v-icon class="down-icon">chevron_right</v-icon>
        </h3>
        </v-btn>
      </template> 
      <v-list dense class="dropdown-list">
        <v-list-item class="pa-0">
        <v-btn text tile block class="button" to="/search/events"><h3>Events</h3></v-btn>
        </v-list-item>
        <v-list-item class="pa-0">
        <v-btn text tile block class="button" to="/search/experiences"><h3>Experience</h3></v-btn>
        </v-list-item>
      </v-list>
    </v-menu>        
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
      <v-btn
       v-on="on"
       text class="button" 
      ><h3 class="desktop mb-0">Food<v-icon class="down-icon">chevron_right</v-icon>
      </h3>
      </v-btn>
      </template>
      <v-list dense class="dropdown-list">
        <v-list-item class="pa-0">
       <v-btn text tile block class="button" to="/search/food"><h3>Menu</h3></v-btn>
      </v-list-item>
       <v-list-item class="pa-0">
      <v-btn text tile block class="button" to="/listing/Pine-View-Kitchen-PVK"><h3 >Restaurant</h3></v-btn></v-list-item>
      </v-list>
      </v-menu>        
      <v-btn text class="button" to="/search/blog"><h3 class="desktop mb-0">Blog</h3></v-btn>
      <v-btn text class="button" @click="logout()" v-if="isAuthenticated == true" :loading="loading"><h3 class="desktop mb-0">Log out</h3></v-btn>
    </v-toolbar-items>
  </v-app-bar>
  <v-navigation-drawer dark style="box-shadow: 0px 1px 0px #121416; position:fixed; background:#191C21;" class="d-md-none" temporary v-model="drawer">
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
        <v-btn text block to="/listing/Pine-View-Kitchen-PVK" class="my-2 button"><h3 class="mb-0">Restaurant</h3></v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn text block class="my-2 button" @click="logout()" v-if="isAuthenticated == true" :loading="loading"><h3 class="mb-0">Log out</h3></v-btn>
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

<style lang='scss' scoped>
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
  .toolbar--logo {
    height:30px;
    vertical-align: middle;
  }
  .v-btn {
    letter-spacing: 0; 
  }
  .dropdown-list {
    background-color: #191C21
  }
  .down-icon {
    transform: rotate(90deg);}

</style>
