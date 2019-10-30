<template>
  <v-container-fluid>
    <video-player
      :source="'https://www.w3schools.com/html/mov_bbb.mp4'"
      :rest="{autoplay: true, loop: true}"
      :video-transformations="'q_auto:best'"
    ></video-player>
    <v-container grid-list-md style="min-height:100vh;">
      <v-flex xs12 class="headerText" style="text-align: center;">
        <h1 style="text-align: center;">{{id}}</h1>
        <v-flex xs12 v-if="id=='food'">
          <p>
            “Best lunch spot in Kirirom” (Lonely Planet Guidebook).
            <br>vKirirom’s iconic open-air restaurant serves an array of international dishes to complement its core traditional Khmer food. The restaurant strives to create wonderful healthy food that is locally sourced from local farmers or grown in vKirirom’s own organic garden.
            <p>Book your stay at vKirirom today and enjoy our array of international food!
          </p>
        </v-flex>
        <v-flex xs12 v-if="id=='accommodations'">
            <p style="text-align: center;">Every vKirirom resort room is thoughtfully designed which make customers enjoy the nature to the fullest and equipped with a standard set of amentities.</p>
        </v-flex>
      </v-flex>
      <v-container v-for="resort in resorts" v-bind:key="resort.id" class="container-fluid card" style="margin-bottom:64px; background: #191C21; overflow: hidden">
        <v-layout row wrap style="">
          <v-flex xs12 sm6 md5 lg5 style="padding:0;">
            <router-link :to="'/listing/'+ resort.slug">
              <v-carousel height="280px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up">
                <v-carousel-item :src="resort.featuredImage">
                </v-carousel-item>
                <v-carousel-item v-for="image in resort.images.slice(0,4)" v-bind:key="image.url" :src="image.url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="resort.featuredImage" height="280px" class="hidden-sm-and-down"></v-img>
          </v-flex>
          <v-flex xs12 sm6 md7 lg7 class="" style="">
            <div class="card-content" >
              <h2>{{resort.title}}</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam recusandae nihil id animi. Iste, ducimus omnis eos aut atque excepturi minima voluptatibus suscipit quaerat non fuga molestias natus earum voluptates.</p>
            </div>
          </v-flex>
        </v-layout>  
      </v-container>
    </v-container>
    <Footer></Footer>

  </v-container-fluid>
</template>

<script>
import { PageService } from "@/connection/resources.js"
const Footer = () => import ('@/components/Footer.vue')
import VideoPlayer from './VideoPlayer.vue'

export default {
  components: {
    Footer,
    VideoPlayer
  },
  data(){
    return{
      resorts: [],
      id: this.$route.params.id
    }
  },
  created() {
    PageService.byCompanyByCategoryName({
      companySlug: 'vkirirom',
      categoryName: this.id
    }).then(data => {
      this.resorts = data;
    });
  },
}
</script>

<style lang="scss" scoped>
  html {
    scroll-behavior: smooth;
  }
  .card{
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    // height: 270px;
  }
  .headerText{
    margin-top:30px; 
    margin-bottom:30px;
    p{
      font-size: 16px;
      line-height: 22px;
      color: #B9BCC1;
    }
    h1{
      color: #D7D9DD;
      font-size: 28px;
      margin-bottom: 20px;
    }
  }
  .container{
    padding:0;
  }

  .card-content{
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 10px;

    h2{
    padding-top: 5px;
    color: rgb(186,188,193);
    }
    p{
      color: hsl(0, 0%, 60%);
    }
  }

  @media only screen and (max-width: 600px) {
    .container{
      max-width: 292px;
    }

    .card-content{
      h2{
        text-align:center;
      }

      p{
        text-align: center;
      }
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
