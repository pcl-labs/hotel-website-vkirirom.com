<template>
  <v-container-fluid>
    <v-card dark>
      <v-img class="header" v-if="resort.images.length > 0" :src="resort.featuredImage">
        <div class="fill-height gradient">
        </div>
      </v-img>
    </v-card>
    <v-container>
      <h1 style="color: #FFFFFF;">{{resort.title}}</h1>
      <p style="font-size: 16px; color: #687C94;">Entire {{resort.title}}</p>
      <div class="text-xs-left">
        <p class="subDescription">
          <img class="mr-2" :src="MultiUsers" />
          <span class="mr-3">{{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.capacity }} guests</span>
          <!-- <span class="mr-5 font-weight-bold">{{ bedRooms.length }} bedrooms</span> -->
          <span class="mr-3">Beds: {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].count }} </span>
          <span> Type: {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].type }} </span>
        </p>
      </div>
      <v-divider style="background-color:white;"></v-divider>
      <v-layout>

      </v-layout>
    </v-container>
  </v-container-fluid>
</template>

<script>
import MultiUsers from '../assets/icons/multiple-users-silhouette.svg';
export default {
  data(){
    return{
      MultiUsers,
      slug: this.$route.params.id,
      resort: {
        images: []
      }
    }
  },
  created() {
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/'+this.slug).then(function(data){
      this.resort=data.body;
    });
  },
}
</script>

<style>
  html {
    scroll-behavior: smooth;
  }

  .header{
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    height: 464px;
    object-fit: cover;
  }
  .gradient{
    background-image: linear-gradient(0deg, #191C21 0%, rgba(25, 28, 33, 0) 50%);
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .subDescription{
    color:#B9BCC1;
    font-size: 16px;
  }
  @media only screen and (max-width: 600px) {
    .container{
      max-width: 292px;
    }
  }
  @media only screen and (min-width: 768px) {
    .container{
      max-width: 600px;
    }
  }
  @media only screen and (min-width: 1024px) {
    .container{
      max-width: 900px;
    }
  }
</style>
