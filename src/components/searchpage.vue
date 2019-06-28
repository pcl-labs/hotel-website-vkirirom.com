<template>
<v-container-fluid>
  <v-container grid-list-md>
    <ListCover title="Search Results" style="color: #D8DADE;" class="mb-2"></ListCover>
    <v-layout row wrap justify-space-between justify-center>
      <v-flex xs12 sm6 md4 lg4>
        <router-link to="/listing/Bell-Tent">
          <v-carousel height="150px" hide-controls dark width="100%" class="hidden-md-and-up">
            <!-- v-if="belltent.images.length > 0" is required to avoid the error "cannot read property 'url' of undefined. 
            It is needed only when we want to iterate through an array of images, or nested elements.-->
            <v-carousel-item :src="belltent.featuredImage" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="belltent.images.length > 0" :src="belltent.images[0].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="belltent.images.length > 0" :src="belltent.images[1].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="belltent.images.length > 0" :src="belltent.images[2].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="belltent.images.length > 0" :src="belltent.images[3].url" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </router-link>
        <v-card width="100%" dark color="transparent" to="/listing/Bell-Tent" flat >
          <v-img v-if="belltent.images.length > 0" :src="belltent.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Khmer Cottage</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{belltent.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{belltent.ctaText}}$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <router-link to="/listing/Bungalow">
          <v-carousel height="150px" hide-controls dark width="100%" class="hidden-md-and-up">
            <v-carousel-item :src="bungalow.featuredImage" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="bungalow.images.length > 0" :src="bungalow.images[0].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="bungalow.images.length > 0" :src="bungalow.images[1].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="bungalow.images.length > 0" :src="bungalow.images[2].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="bungalow.images.length > 0" :src="bungalow.images[3].url" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </router-link>
        <v-card width="100%" dark color="transparent" to="/listing/Bungalow" flat>
          <v-img v-if="bungalow.images.length > 0" :src="bungalow.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Bungalow</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{bungalow.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{bungalow.ctaText}}$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <router-link to="/listing/Luxury-Tent">
          <v-carousel height="150px" hide-controls dark width="100%" class="hidden-md-and-up">
            <v-carousel-item :src="luxurytent.featuredImage" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="luxurytent.images.length > 0" :src="luxurytent.images[0].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="luxurytent.images.length > 0" :src="luxurytent.images[1].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="luxurytent.images.length > 0" :src="luxurytent.images[2].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="luxurytent.images.length > 0" :src="luxurytent.images[3].url" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </router-link>
        <v-card width="100%" dark color="transparent" to="/listing/Luxury-Tent" flat >
          <v-img v-if="luxurytent.images.length > 0" :src="luxurytent.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{luxurytent.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{luxurytent.ctaText}}$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <router-link to="/listing/Khmer-Cottage">
          <v-carousel height="150px" hide-controls dark width="100%" class="hidden-md-and-up">
            <v-carousel-item :src="khmer.featuredImage" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="khmer.images.length > 0" :src="khmer.images[0].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="khmer.images.length > 0" :src="khmer.images[1].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="khmer.images.length > 0" :src="khmer.images[2].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="khmer.images.length > 0" :src="khmer.images[3].url" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </router-link>
        <v-card width="100%" dark color="transparent" to="/listing/Khmer-Cottage" flat >
          <v-img v-if="khmer.images.length > 0" :src="khmer.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{khmer.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{khmer.ctaText}}$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <router-link to="/listing/Pipe-Room">
          <v-carousel height="150px" hide-controls dark width="100%" class="hidden-md-and-up">
            <v-carousel-item :src="piperoom.featuredImage" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="piperoom.images.length > 0" :src="piperoom.images[0].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="piperoom.images.length > 0" :src="piperoom.images[1].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="piperoom.images.length > 0" :src="piperoom.images[2].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="piperoom.images.length > 0" :src="piperoom.images[3].url" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </router-link>
        <v-card width="100%" dark color="transparent" to="/listing/Pipe-Room" flat >
          <v-img v-if="piperoom.images.length > 0" :src="piperoom.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{piperoom.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{piperoom.ctaText}}$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <router-link to="/listing/Villa-Suite">
          <v-carousel height="150px" hide-controls dark width="100%" class="hidden-md-and-up">
            <v-carousel-item :src="suite.featuredImage" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="suite.images.length > 0" :src="suite.images[0].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="suite.images.length > 0" :src="suite.images[1].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="suite.images.length > 0" :src="suite.images[2].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="suite.images.length > 0" :src="suite.images[3].url" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </router-link>
        <v-card width="100%" dark color="transparent" to="/listing/Villa-Suite" flat >
          <v-img v-if="suite.images.length > 0" :src="suite.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{suite.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{suite.ctaText}}$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <router-link to="/listing/Villa-Jasmine">
          <v-carousel height="150px" hide-controls dark width="100%" class="hidden-md-and-up">
            <v-carousel-item :src="jasmine.featuredImage" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="jasmine.images.length > 0" :src="jasmine.images[0].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="jasmine.images.length > 0" :src="jasmine.images[1].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="jasmine.images.length > 0" :src="jasmine.images[2].url" style="background-size:contain;">
            </v-carousel-item>
            <v-carousel-item v-if="jasmine.images.length > 0" :src="jasmine.images[3].url" style="background-size:contain;">
            </v-carousel-item>
          </v-carousel>
        </router-link>
        <v-card width="100%" dark color="transparent" to="/listing/Villa-Jasmine" flat >
          <v-img v-if="jasmine.images.length > 0" :src="jasmine.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{jasmine.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{jasmine.ctaText}}$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container>
    <v-card width="100%" v-for="resort in resorts" v-bind:key="resort.id" dark color="transparent" to="/listing/" flat >
      <v-img v-if="resort.images.length > 0" :src="resort.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
    <v-layout align-start>
      <v-card-text class="pa-1">
        <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{resort.title}}</span>
        <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{resort.title}}</h3></span>
        <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{resort.ctaText}}$ per night</span>
        </p>
      </v-card-text>
    </v-layout>
    </v-card>
  </v-container>
  <Footer></Footer>
</v-container-fluid>
</template>

<script>
import ListCover from './Home/ListCover.vue'
import Footer from './Footer.vue'

export default {
  components: {
    ListCover,
    Footer
  },
  data(){
    return{
      bungalow: {
        images: []
      },
      luxurytent: {
        images: []
      },
      khmer: {
        images: []
      },
      jasmine: {
        images: []
      },
      suite: {
        images: []
      },
      belltent: {
        images: []
      },
      piperoom: {
        images: []
      },
      resorts: []
    }
  },
  created() {
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Bungalow').then(function(data){
      this.bungalow=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Pipe-Room').then(function(data){
      this.piperoom=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Khmer-Cottage').then(function(data){
      this.khmer=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Villa-Suite').then(function(data){
      this.suite=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Bell-Tent').then(function(data){
      this.belltent=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Villa-Jasmine').then(function(data){
      this.jasmine=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Luxury-Tent').then(function(data){
      this.luxurytent=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/').then(function(data){
      this.resorts=data.body;
    });
  },
}
</script>

<style lang="scss">
  html {
    scroll-behavior: smooth;
  }
  .v-carousel__controls{
  background: linear-gradient(0deg, #191C21 0%, rgba(25, 28, 33, 0) 50%);
    .v-btn__content{
      margin: 0;
      padding: 0;
    }
    .v-icon{
      font-size: 7px !important;
      color: white !important;
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
