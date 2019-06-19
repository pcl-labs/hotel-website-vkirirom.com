<template>
  <v-container-fluid>
    <v-card dark>
      <div id="header">
        <v-container grid-list-md>
          <v-layout row wrap align-end justify-start hidden-sm-and-down>
            <v-flex xs12 sm6 md3 lg3>
              <h1 style="color: #FFFFFF; bottom:20px; position:absolute; font-family: 'Oswald', sans-serif; font-size: 70px;">Book your nature retreat</h1>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-end justify-start hidden-md-and-up>
            <v-flex xs12 sm6 md3 lg3>
              <h1 style="color: #FFFFFF; bottom:20px; position:absolute; font-family: 'Oswald', sans-serif; font-size: 45px;">Book your nature retreat</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-card>
    <v-container grid-list-md align-content-space-around>
      <div style="margin-top:0;">
      <ListCover title="Accommodation" style="color: #D8DADE;" class="mb-2"></ListCover>
      <v-layout row wrap justify-space-between justify-center>
        <v-flex xs12 sm6 md4 lg4>
        <router-link to="/listing/Bell-Tent">
          <v-carousel height="150px" hide-controls width="100%" class="hidden-md-and-up">
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
          <v-card width="100%" dark color="transparent" to="/listing/Bell-Tent" flat>
            <v-img :src="belltent.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
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
            <v-img :src="bungalow.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
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
            <v-img :src="luxurytent.featuredImage" height="150px" class="hidden-sm-and-down"></v-img>
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
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn block large outline dark to="/search" style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Show all <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider class="hidden-md-and-up mt-3" style="background-color:#3D424E;"></v-divider>
      <v-card hover dark style="border-radius: 3px;" width="100%">
        <v-img :src="corporateRetreat" height="300px" position="top" class="mt-4 pa-1 mb-4" width="100%">
          <v-layout row wrap justify-end hidden-sm-and-down>
            <v-flex xs12 md6 sm6 lg6 class="ma-4" align-end>
              <h1 style="color: #FFFFFF; font-family: 'Oswald', sans-serif; font-size: 36px;">Your next corporate retreat.</h1>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center hidden-md-and-up text-xs-center>
            <v-flex xs12 align-center >
              <h1 style="color: #FFFFFF; font-family: 'Oswald', sans-serif; font-size: 36px; text-align: center; margin-top:30px;">
                Your next corporate retreat.
              </h1>
            </v-flex>
          </v-layout>
          <v-layout column align-center justify-center fill-height>
            <v-flex xs12 md6 sm4 lg6>
              <v-btn dark large depressed style="background: #F7B947; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize" color="#4B7F52">
                Book Now <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-img>
      </v-card>
    <v-divider class="hidden-md-and-up mt-3" style="background-color:#3D424E;"></v-divider>
    <v-layout row wrap justify-space-between>
      <ListCover title="Experiences" class="mb-3 pl-1" style="font-size: 16px; line-height: 19px; color: #D8DADE;"></ListCover>
      <v-flex xs12 sm6 md4 lg4>
        <v-card height="100%" width="100%" dark color="transparent" href="#" flat >
          <v-img :src="experience1" height="150px"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Experience</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>Rock Climbing</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 50$ per person</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-card height="100%" width="100%" dark color="transparent" href="#" flat >
          <v-img :src="experience1" height="150px"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Experience</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>Rock Climbing</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 50$ per person</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-card height="100%" width="100%" dark color="transparent" href="#" flat >
          <v-img :src="experience1" height="150px"></v-img>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Experience</span>
            <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>Rock Climbing</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 50$ per person</span>
            </p>
          </v-card-text>
        </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn block large outline dark style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Show all <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-card xs12 width="100%" class="mt-4 mb-4" dark style="border-radius: 3px;" hover>
      <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1560151624/Healthy_eyfk5v.jpg" height="300px" position="top" class="pt-3 pl-2">
      <v-layout row wrap justify-start class="mt-4 ml-4 mb-2">
        <v-flex xs12 md4 sm4 lg4>
          <h1 style="color: #FFFFFF; font-family: 'Oswald', sans-serif; font-size: 34px;">
            “Best lunch stop in Kirirom.”
          </h1>
        </v-flex>
      </v-layout>
      <v-layout column align-content-space-around align-content-start fill-height class="ml-4">
        <v-flex xs12 md4 sm4 lg4>
          <v-btn dark large depressed style="background: #F7B947; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize">
            Menu <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      </v-img>
      </v-card>
      </div>
      <video controls width="100%" class="mt-4">
        <source src="https://res.cloudinary.com/die9ji2vn/video/upload/v1560320692/10000000_143443766812356_671027213277999975_n_1_hm0gxb.mp4" type="video/mp4">
      </video>
    </v-container>
    <v-container-fluid>
      <!-- <v-card width="100%">
        <v-img :src="example4" width="100%" height="300px">
        </v-img>
      </v-card> -->
    </v-container-fluid>
    <v-container>
      <ListCover title="Ecotourism" class="mb-3" style="font-size: 16px; line-height: 19px; color: #D8DADE;"></ListCover>
      <v-layout row wrap justify-space-between justify-center text-xs-center>
        <v-flex xs12 sm6 md3 lg3 align-center>
          <v-card id="blog" height="240" dark color="#D8DADE" style="border-radius: 3px; position:relative;" class="mb-3">
            <v-card-text><h2 style="color: #FFFFFF; position:absolute; bottom:20px; right:0; left:0;">Protecting Nature</h2></v-card-text>
          </v-card>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 md3 lg3 align-center>
          <v-card id="blog" height="240" dark color="#D8DADE" style="border-radius: 3px; position:relative;" class="mb-3">
            <v-card-text><h2 style="color: #FFFFFF; position:absolute; bottom:20px; right:0; left:0;">Educating Youth</h2></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 lg3 align-center>
          <v-card id="blog" height="240" dark color="#D8DADE" style="border-radius: 3px; position:relative;" class="mb-3">
            <v-card-text><h2 style="color: #FFFFFF; position:absolute; bottom:20px; right:0; left:0;">Growing Organic</h2></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 lg3 align-center>
          <v-card id="blog" height="240" dark color="#D8DADE" style="border-radius: 3px; position:relative;" class="mb-3">
            <v-card-text>
              <h2 style="color: #FFFFFF; position:absolute; bottom:20px; right:0; left:0;">Buying Locally</h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn block large outline dark style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Learn More <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <Footer></Footer>
  </v-container-fluid>
</template>

<script>
import FrontendImg from '../assets/FrontImage.png'
// import preload from '../assets/preload.png'
import example4 from '../assets/example4.png'
import experience1 from '../assets/experience1.jpg'
import corporateRetreat from '../assets/951820009082492817.jpg'
import headerImg from '../assets/freedom-camping-4m-bell-tent-5_copy_3_6e7cf404-7d2f-4cac-8bf7-fd04c9dd8854_1024x1024.jpeg'
import food from '../assets/istockphoto-614420320-612x612.jpg'
import ListCover from './Home/ListCover.vue'
import Footer from './Footer.vue'
// import { ContentLoader } from 'vue-content-loader'

export default {
  components:{
    ListCover,
    Footer,
    // ContentLoader
  },
  data() {
    return {
      FrontendImg,
      headerImg,
      corporateRetreat,
      food,
      experience1,
      example4,
      // preload,

      bungalow: {
        images: []
      },
      luxurytent: {
        images: []
      },
      belltent: {
        images: []
      }
    }
  },
  created() {
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Bungalow').then(function(data){
      this.bungalow=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Bell-Tent').then(function(data){
      this.belltent=data.body;
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/Luxury-Tent').then(function(data){
      this.luxurytent=data.body;
    });
  },
}
</script>

<style lang="scss">
#header{
  object-fit: cover;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(0deg, #191C21 0%, rgba(25, 28, 33, 0) 50%), url('https://res.cloudinary.com/die9ji2vn/image/upload/v1560155423/top_image_kyv74r.jpg');
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
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
  #blog{
    width: 100%;
    height: 56.25%;
  }
}
@media only screen and (min-width: 768px) {
  .container{
    max-width: 600px;
  }
  #blog{
    width: 100%;
  }
}
@media only screen and (min-width: 1024px) {
  .container{
    max-width: 900px;
  }
  #blog{
    width: 202px;
  }
}

#header{
  height: 300px;
}

html {
  scroll-behavior: smooth;
}
</style>
