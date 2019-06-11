<template>
  <v-container-fluid>
    <v-container-fluid class="pa-0">
      <v-layout row flex class="pa-0 mx-0">
        <v-flex xs12 sm12 md6 class="pa-0 overflow-hidden hidden-sm-and-down">
          <v-img class="image" v-if="resort.images.length > 0" :src="resort.featuredImage" aspect-ratio="1.7"></v-img>
        </v-flex>
        <v-flex xs12 class="hidden-md-and-up">
          <!-- <v-carousel hide-controls>
            <v-carousel-item
              v-for="(item,i) in images"
              :key="i"
              :src="resort.img"
            ></v-carousel-item>
          </v-carousel> -->
          <v-img class="image" v-if="resort.images.length > 0" :src="resort.featuredImage"></v-img>
        </v-flex>
        <v-flex xs12 sm6 class="pa-0 ma-0 overflow-hidden hidden-sm-and-down">
          <v-layout row flex class="pa-0 ma-0 overflow-hidden">
            <v-flex xs12 sm6 class="pa-0 overflow-hidden">
              <v-img class="image ma-0 pa-0" v-if="resort.images.length > 0" :src="resort.images[0].url" aspect-ratio="1.7"></v-img>
            </v-flex>
            <v-flex xs12 sm6 class="pa-0 overflow-hidden">
              <v-img class="image" v-if="resort.images.length > 0" :src="resort.images[1].url" aspect-ratio="1.7"></v-img>
            </v-flex>
          </v-layout>
          <v-layout row flex class="pa-0 ma-0 overflow-hidden">
            <v-flex xs12 sm6 class="pa-0 overflow-hidden">
              <v-img class="image" v-if="resort.images.length > 0" :src="resort.images[2].url" aspect-ratio="1.7"></v-img>
            </v-flex>
            <v-flex xs12 sm6 class="pa-0 overflow-hidden">
              <v-img class="image" v-if="resort.images.length > 0" :src="resort.images[3].url" aspect-ratio="1.7"></v-img>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container-fluid>
    <v-container>
      <h1 style="color: #FFFFFF;" class="mt-2">{{resort.title}}</h1>
      <p style="font-size: 16px; color: #687C94;" class="mt-2">Entire {{resort.title}}</p>
      <div class="text-xs-left mb-5 mt-4 font-weight-regular">
        <p class="subDescription">
          <img class="mr-2" :src="MultiUsers" />
          <span class="mr-3">{{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.capacity }} guests</span>
          <!-- <span class="mr-5 font-weight-bold">{{ bedRooms.length }} bedrooms</span> -->
          <span class="mr-3">{{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].count }} Bed(s)</span>
          <span>Type: {{ resort && resort.modules && resort.modules.hotel && resort.modules.hotel.beds[0] && resort.modules.hotel.beds[0].type }}</span>
        </p>
      </div>
      <div class="text-xs-left font-weight-regular">
        <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
          {{resort.h2}}
        </p>
      </div>
      <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
        Location
      </h2>
      <p>
        <a href="https://goo.gl/maps/NusquSFKVm2SHrDy7" style="text-decoration:none;">Go to Location</a>
      </p>
      <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
        Spaces
      </h2>
      <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
        {{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.spaces[0]}}
      </p>
      <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
        Getting Around
      </h2>
      <p style="font-size: 16px; line-height: 24px; color: #B9BCC1;">
        {{resort && resort.modules && resort.modules.hotel && resort.modules.hotel.gettingAround}}
      </p>
      <h2 style="font-size: 20px; line-height: 23px; color: #D8DADE;" class="mb-3 mt-5">
        Amenities
      </h2>
      <v-layout row wrap>
        <v-flex xs8 md10>
          <v-layout row wrap>
            <v-flex xs6 md3 class="py-3">
              <img :src="wifi">
              <span style="font-size: 16px; color: #B9BCC1;">Wifi</span>
            </v-flex>
            <v-flex xs6 md3 class="py-3">
              <img :src="cutlery">
              <span style="font-size: 16px; color: #B9BCC1;">Cutlery</span>
            </v-flex>
            <v-flex xs6 md3 class="py-3">
              <img :src="HairDryer">
              <span style="font-size: 16px; color: #B9BCC1;">Hair Dryer</span>
            </v-flex>
            <v-flex xs6 md3 class="py-3">
              <img :src="Washer">
              <span style="font-size: 16px; color: #B9BCC1;">Washer</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container-fluid>
</template>

<script>
//components
import Amenity from './Listing/Amenity.vue';

// icons
import wifi from '../assets/icons/wifi.svg';
import HairDryer from '../assets/icons/hair-dryer.svg';
import Washer from '../assets/icons/washing-machine.svg';
import cutlery from '../assets/icons/cutlery.svg';
import MultiUsers from '../assets/icons/multiple-users-silhouette.svg';

export default {
  data(){
    return{
      components:{
        Amenity
      },
      //images
      MultiUsers,
      wifi,
      HairDryer,
      Washer,
      cutlery,

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

<style lang="scss">
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
  .image{
    transition:  0.8s ease;
    -webkit-transition: 0.8s ease;
    &:hover {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
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
