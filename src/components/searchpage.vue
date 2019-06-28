<template>
<v-container-fluid>
  <v-container grid-list-md>
    <h1 style="color: #FFFFFF;" class="mb-4">All Results</h1>
    <h2 style="color: #D8DADE;" class="mb-2">Category</h2>
    <v-layout row wrap justify-space-between justify-center>
      <v-flex xs12 sm6 md4 lg4 v-for="resort in resorts" v-bind:key="resort.id">
        <v-card width="100%" dark color="transparent" to="/listing/" flat >
          <router-link :to="'/'+ resort.title + '/' + resort.slug">
            <v-carousel height="150px" hide-controls dark width="100%" class="hidden-md-and-up">
              <v-carousel-item :src="resort.featuredImage" style="background-size:contain;">
              </v-carousel-item>
              <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[0].url" style="background-size:contain;">
              </v-carousel-item>
              <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[1].url" style="background-size:contain;">
              </v-carousel-item>
              <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[2].url" style="background-size:contain;">
              </v-carousel-item>
              <v-carousel-item v-if="resort.images.length > 0" :src="resort.images[3].url" style="background-size:contain;">
              </v-carousel-item>
            </v-carousel>
          </router-link>
          <v-img :src="resort.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
          <v-layout align-start>
            <v-card-text class="pa-1">
              <p>
                <!-- <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{resort.title}}</span> -->
                <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{resort.title}}</h3></span>
                <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;" v-if="resort.ctaText>0"> {{resort.ctaText}}$ per night</span>
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
      resorts: []
    }
  },
  created() {
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
