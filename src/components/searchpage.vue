<template>
<v-container-fluid>
  <v-container grid-list-md>
    <ListCover title="Search Results" style="color: #D8DADE;" class="mb-2"></ListCover>
    <v-layout row wrap justify-space-between justify-center>
      <v-flex xs12 sm6 md4 lg4>
        <v-card width="100%" dark color="transparent" to="/listing/Bell-Tent" flat >
          <v-img v-if="belltent.images.length > 0" :src="belltent.featuredImage" height="150px"></v-img>
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
        <v-card width="100%" dark color="transparent" to="/listing/Bungalow" flat>
          <v-img v-if="bungalow.images.length > 0" :src="bungalow.featuredImage" height="150px"></v-img>
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
        <v-card width="100%" dark color="transparent" to="/listing/Luxury-Tent" flat >
          <v-img v-if="luxurytent.images.length > 0" :src="luxurytent.featuredImage" height="150px"></v-img>
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
        <v-card width="100%" dark color="transparent" to="/listing/Khmer-Cottage" flat >
          <v-img v-if="khmer.images.length > 0" :src="khmer.featuredImage" height="150px"></v-img>
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
        <v-card width="100%" dark color="transparent" to="/listing/Pipe-Room" flat >
          <v-img v-if="piperoom.images.length > 0" :src="piperoom.featuredImage" height="150px"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{piperoom.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{piperoom.ctaText}}$$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-card width="100%" dark color="transparent" to="/listing/Villa-Suite" flat >
          <v-img v-if="suite.images.length > 0" :src="suite.featuredImage" height="150px"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{suite.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{suite.ctaText}}$$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-card width="100%" dark color="transparent" to="/listing/Villa-Jasmine" flat >
          <v-img v-if="jasmine.images.length > 0" :src="jasmine.featuredImage" height="150px"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{jasmine.title}}</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> {{jasmine.ctaText}}$$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
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
  },
}
</script>

<style>
  html {
    scroll-behavior: smooth;
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
