<template>
  <v-container-fluid>
    <v-container grid-list-md style="min-height:100vh;">
      <v-flex xs12 class="headerText">
        <h1>Results for {{id}}</h1>
        <v-flex xs12 v-if="id=='food'">
          <p>
            “Best lunch spot in Kirirom” (Lonely Planet Guidebook).
            <br>vKirirom’s iconic open-air restaurant serves an array of international dishes to complement its core traditional Khmer food. The restaurant strives to create wonderful healthy food that is locally sourced from local farmers or grown in vKirirom’s own organic garden.
            <p>Book your stay at vKirirom today and enjoy our array of international food!
          </p>
        </v-flex>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 v-for="resort in resorts" v-bind:key="resort.id">
          <v-card color="#191C21" class="mb-4 card" width="100%" dark :to="'/listing/'+ resort.slug" flat>
            <router-link :to="'/listing/'+ resort.slug">
              <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="resort.featuredImage">
                </v-carousel-item>
                <v-carousel-item v-for="image in resort.images.slice(0,4)" v-bind:key="image.url" :src="image.url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="resort.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <p>
                  <!-- <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{resort.title}}</span> -->
                  <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{resort.title}}</h3></span>
                  <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;" v-if="resort.ctaText>0">Starting from {{resort.ctaText}}$ per night</span>
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
const Footer = () => import ('@/components/Footer.vue')

export default {
  components: {
    Footer
  },
  data(){
    return{
      resorts: [],
      id: this.$route.params.id
    }
  },
  created() {
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/'+ this.id).then(function(data){
      this.resorts=data.body;
    });
  },
}
</script>

<style lang="scss" scoped>
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
  .card{
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;
    height: 270px;
  }
  .headerText{
    margin-top:20px; 
    margin-bottom:30px;
    p{
      font-size: 16px;
      line-height: 22px;
      color: #B9BCC1;
    }

    h1{
      color: #FFFFFF;
      margin-bottom: 20px;
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
