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
    <v-container grid-list-md>
      <h2 style="color: #D8DADE; font-size: 28px;" class="mb-4">Accommodation</h2>
      <v-layout row wrap justify-space-between>
        <v-flex xs12 sm6 md4 lg4 v-for="accommodation in accommodations" v-bind:key="accommodation.id">
          <v-card dark height="270px" color="#191C21" class="mb-4" :to="'/listing/'+ accommodation.slug" flat style="box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
            <router-link :to="'/listing/'+ accommodation.slug">
              <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="accommodation.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="accommodation.images.length > 0" :src="accommodation.images[0].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="accommodation.images.length > 0" :src="accommodation.images[1].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="accommodation.images.length > 0" :src="accommodation.images[2].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="accommodation.images.length > 0" :src="accommodation.images[3].url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="accommodation.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <p>
                  <!-- <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{accommodation.title}}</span> -->
                  <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{accommodation.title}}</h3></span>
                  <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;" v-if="accommodation.ctaText>0"> {{accommodation.ctaText}}$ per night</span>
                </p>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn block large outline dark to="/search/accommodations" style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider class="hidden-md-and-up mt-3" style="background-color:#3D424E;"></v-divider>
      <v-card hover dark color="#191C21" style="border-radius: 3px;" width="100%" to="/listing/Corporate-Retreat">
        <v-img height="300px" position="center" class="mt-4 pa-1 mb-4" width="100%" src="https://res.cloudinary.com/die9ji2vn/image/upload/dpr_auto/w_auto/q_auto:low/f_auto/v1561438684/Experiences/Invigorating%20Company%20Retreats/10_fotos/1_large_group_ndqlgo.jpg">
          <v-layout row wrap justify-end hidden-sm-and-down>
            <v-flex xs12 md6 sm6 lg6 class="ma-4" align-end>
              <h2 style="color: #FFFFFF; font-family: 'Oswald', sans-serif; font-size: 36px;">Your next corporate retreat.</h2>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center hidden-md-and-up text-xs-center>
            <v-flex xs12 align-center >
              <h2 style="color: #FFFFFF; font-family: 'Oswald', sans-serif; font-size: 36px; text-align: center; margin-top:30px;">
                Your next corporate retreat.
              </h2>
            </v-flex>
          </v-layout>
          <v-layout column align-center justify-center fill-height>
            <v-flex xs12 md6 sm4 lg6>
              <v-btn to="/listing/Corporate-Retreat" dark large depressed style="background: #F7B947; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize" color="#4B7F52">
                Book Now <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-img>
      </v-card>
    <v-divider class="hidden-md-and-up mt-3" style="background-color:#3D424E;"></v-divider>
    <h2 style="color: #D8DADE; font-size: 28px;" class="mt-2 mb-4">Experience</h2>
      <v-layout row wrap justify-space-between justify-center>
        <v-flex xs12 sm6 md4 lg4 v-for="experience in experiences" v-bind:key="experience.id">
          <v-card width="100%" height="270px" color="#191C21" class="mb-4" dark :to="'/listing/'+ experience.slug" flat style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
            <router-link :to="'/listing/'+ experience.slug">
              <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="experience.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="experience.images.length > 0" :src="experience.images[0].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="experience.images.length > 0" :src="experience.images[1].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="experience.images.length > 0" :src="experience.images[2].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="experience.images.length > 0" :src="experience.images[3].url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="experience.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <p>
                  <!-- <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{experience.title}}</span> -->
                  <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{experience.title}}</h3></span>
                  <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;" v-if="experience.ctaText>0"> {{experience.ctaText}}$ per night</span>
                </p>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn to="/search/experiences/" block large outline dark style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-card to="/search/food" xs12 color="#191C21" width="100%" class="mt-4 mb-4" dark style="border-radius: 3px;" hover>
      <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1560151624/Healthy_eyfk5v.jpg" height="300px" position="top" class="pt-3 pl-2">
      <v-layout row wrap justify-start class="mt-4 ml-4 mb-2">
        <v-flex xs12 md4 sm4 lg4>
          <h2 style="color: #FFFFFF; font-family: 'Oswald', sans-serif; font-size: 34px;">
            “Best lunch stop in Kirirom.”
          </h2>
        </v-flex>
      </v-layout>
      <v-layout column align-content-space-around align-content-start fill-height class="ml-4">
        <v-flex xs12 md4 sm4 lg4>
          <v-btn dark large to="/search/food" depressed style="background: #F7B947; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize">
            Menu <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      </v-img>
      </v-card>
      <h2 style="color: #D8DADE; font-size: 28px;" class="mb-4">Events</h2>
      <v-layout row wrap justify-space-between justify-center>
        <v-flex xs12 sm6 md4 lg4 v-for="event in events" v-bind:key="event.id">
          <v-card width="100%" height="270px" color="#191C21" class="mb-4" dark :to="'/listing/'+ event.slug" flat style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
            <router-link :to="'/listing/'+ event.slug">
              <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="event.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="event.images.length > 0" :src="event.images[0].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="event.images.length > 0" :src="event.images[1].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="event.images.length > 0" :src="event.images[2].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if="event.images.length > 0" :src="event.images[3].url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="event.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <p>
                  <!-- <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{event.title}}</span> -->
                  <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{event.title}}</h3></span>
                  <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;" v-if="event.ctaText>0"> {{event.ctaText}}$ per night</span>
                </p>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn to="/search/events" block large outline dark style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <video style="object-fit:cover;" controls width="100%" class="mt-4" poster="https://res.cloudinary.com/die9ji2vn/image/upload/dpr_auto/w_auto/q_auto:low/f_auto/v1561607608/Thumbnail/JPEG/thumbnail_zjzji4.jpg">
          <source src="https://res.cloudinary.com/die9ji2vn/video/upload/v1560320692/10000000_143443766812356_671027213277999975_n_1_hm0gxb.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </v-flex>
    </v-container>
    <v-container grid-list-md align-content-space-around>
      <h2 style="color: #D8DADE; font-size: 28px;" class="mb-4">Ecotourism</h2>
      <v-layout row wrap justify-space-between justify-center>
        <v-flex xs12 sm6 md4 lg4 v-for="blog in blogs" v-bind:key="blog.id">
          <v-card width="100%" height="270px" class="mb-4" dark color="#191C21" :to="'/listing/'+ blog.slug" flat style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
            <router-link :to="'/listing/'+ blog.slug">
              <v-carousel hide-controls :cycle="false" dark width="100%" height="150px" class="hidden-md-and-up" v-if="blog.images.length > 0" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="  blog.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if=" blog.images.length > 0" :src=" blog.images[0].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if=" blog.images.length > 1" :src=" blog.images[1].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if=" blog.images.length > 2" :src=" blog.images[2].url" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-if=" blog.images.length > 3" :src=" blog.images[3].url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="blog.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <p>
                  <!-- <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{ blog.title}}</span> -->
                  <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{blog.title}}</h3></span>
                  <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;" v-if="blog.ctaText>0"> {{blog.ctaText}}$ per night</span>
                </p>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4 class="mt-3">
          <v-btn to="/search/blog/" block large outline dark style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Learn More <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <Footer></Footer>
  </v-container-fluid>
</template>

<script>
import FrontendImg from '../assets/FrontImage.png'
import example4 from '../assets/example4.png'
import experience1 from '../assets/experience1.jpg'
import headerImg from '../assets/freedom-camping-4m-bell-tent-5_copy_3_6e7cf404-7d2f-4cac-8bf7-fd04c9dd8854_1024x1024.jpeg'
import food from '../assets/istockphoto-614420320-612x612.jpg'
import Footer from './Footer.vue'
import VueMarkdown from 'vue-markdown'

export default {
  components:{
    Footer,
    VueMarkdown
  },
  data() {
    return {
      FrontendImg,
      headerImg,
      food,
      experience1,
      example4,

      accommodations: {
        title:'',
        description: '',
        h2: '',
        slug: '',
        backgroundImage: '',
        featuredImage: '',
        images: [{
          order: '',
          url: '',
        }],
        ctaText: '',
        custom: '',
        modules: {
          hotel: {
            capacity: '',
            gettingAround: '',
            location: '',
            amenities: '',
            beds: [
              {
                count: '',
                type: '',
              }
            ],
            rules: '',
            spaces: []
          }
        }
      },
      experiences: {
        title:'',
        description: '',
        h2: '',
        slug: '',
        backgroundImage: '',
        featuredImage: '',
        images: [{
          order: '',
          url: '',
        }],
        ctaText: '',
        custom: '',
        modules: {
          hotel: {
            capacity: '',
            gettingAround: '',
            location: '',
            amenities: '',
            beds: [
              {
                count: '',
                type: '',
              }
            ],
            rules: '',
            spaces: []
          }
        }
      },
      events: {
        title:'',
        description: '',
        h2: '',
        slug: '',
        backgroundImage: '',
        featuredImage: '',
        images: [{
          order: '',
          url: '',
        }],
        ctaText: '',
        custom: '',
        modules: {
          hotel: {
            capacity: '',
            gettingAround: '',
            location: '',
            amenities: '',
            beds: [
              {
                count: '',
                type: '',
              }
            ],
            rules: '',
            spaces: []
          }
        }
      },
      blogs: {
        title:'',
        description: '',
        h2: '',
        slug: '',
        backgroundImage: '',
        featuredImage: '',
        images: [{
          order: '',
          url: '',
        }],
        ctaText: '',
        custom: '',
        modules: {
          hotel: {
            capacity: '',
            gettingAround: '',
            location: '',
            amenities: '',
            beds: [
              {
                count: '',
                type: '',
              }
            ],
            rules: '',
            spaces: []
          }
        }
      },
    }
  },
  created() {
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/accommodations').then(function(data){
      this.accommodations=data.body.slice(0,3);
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/experiences').then(function(data){
      this.experiences=data.body.slice(0,3);
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/events').then(function(data){
      this.events=data.body.slice(0,3);
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/blog').then(function(data){
      this.blogs=data.body.slice(0,3);
    });
  },
}
</script>

<style lang="scss">
#header{
  object-fit: cover;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(0deg, #000A0E 0%, rgba(25, 28, 33, 0) 50%), url('https://res.cloudinary.com/die9ji2vn/image/upload/v1560155423/top_image_kyv74r.jpg');
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
}
.v-carousel__controls{
  background: transparent;
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

#header{
  height: 300px;
}

html {
  scroll-behavior: smooth;
}
</style>
