<template>
  <v-container-fluid>
    <v-card dark>
      <div id="header">
        <v-container grid-list-md>
          <v-layout row wrap align-end justify-start hidden-sm-and-down>
            <v-flex xs12 sm6 md3 lg3>
              <h1 class="headerh1">Book your nature retreat at vKirirom Pine Resort</h1>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-end justify-start hidden-md-and-up>
            <v-flex xs12 sm6 md3 lg3>
              <h1 class="headerh1mob">Book your nature retreat at vKirirom Pine Resort</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-card>
    <v-container grid-list-md>
      <h2 class="mb-4 listTitle">Accommodation</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 v-for="accommodation in accommodations.slice(0,4)" v-bind:key="accommodation.id">
          <v-card dark height="270px" color="#191C21" class="mb-4 card" :to="'/listing/'+ accommodation.slug" flat>
            <router-link :to="'/listing/'+ accommodation.slug">
              <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up" v-if="accommodation.images && accommodation.images.length > 0" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="accommodation.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-for="image in accommodation.images.slice(0,4)" v-bind:key="image.url" :src="image.url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="accommodation.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <span class="cardTitle"><h3>{{accommodation.title}}</h3></span>
                <span class="cardSubtitle" v-if="accommodation.ctaText>0">Starting from {{accommodation.ctaText}}$ per night</span>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn block large outline dark to="/search/accommodations" class="showAllbtn">
            Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider class="hidden-md-and-up mt-3" style="background-color:#3D424E;"></v-divider>
      <v-card hover dark color="#191C21" style="border-radius: 3px;" width="100%" to="/listing/Large-Company-Retreats-in-Nature-and-Team-Building">
        <v-img height="300px" position="center" class="mt-4 pa-1 mb-4" width="100%" src="https://res.cloudinary.com/die9ji2vn/image/upload/dpr_auto/w_auto/q_auto:low/f_auto/v1562223032/group/group-retreat_s3ksth.jpg">
          <v-layout row wrap justify-center text-xs-center>
            <v-flex xs12 align-center >
              <h2 style="color: #FFFFFF; font-family: 'Oswald', sans-serif; font-size: 36px; text-align: center; margin-top:30px;">
                Your next corporate retreat.
              </h2>
            </v-flex>
          </v-layout>
          <v-layout column align-center justify-center fill-height>
            <v-flex xs12 md6 sm4 lg6>
              <v-btn to="/listing/Large-Company-Retreats-in-Nature-and-Team-Building" dark large depressed class="menubtn" color="#F7B947">
                Book Now <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-img>
      </v-card>
    <v-divider class="hidden-md-and-up mt-3" style="background-color:#3D424E;"></v-divider>
    <h2 class="mt-2 mb-4 listTitle">Experience</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 v-for="experience in experiences.slice(0,4)" v-bind:key="experience.id">
          <v-card width="100%" height="270px" color="#191C21" class="mb-4 card" dark :to="'/listing/'+ experience.slug" flat style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
            <router-link :to="'/listing/'+ experience.slug">
              <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up" v-if="experience.images && experience.images.length > 0" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="experience.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-for="image in experience.images.slice(0,4)" v-bind:key="image.url" :src="image.url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="experience.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <span class="cardTitle"><h3>{{experience.title}}</h3></span>
                <span class="cardSubtitle" v-if="experience.ctaText>0">Starting from {{experience.ctaText}}$ per night</span>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn to="/search/experiences/" block large outline dark class="showAllbtn">
            Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-card to="/search/food" xs12 color="#191C21" width="100%" class="mt-4 mb-4" dark style="border-radius: 3px;" hover>
      <v-img  height="300px" class="pt-3 pl-2" src="https://res.cloudinary.com/die9ji2vn/image/upload/dpr_auto/w_auto/q_auto:low/f_auto/v1562224268/food/Indian_bi8dn7-Original_ueby7h.jpg">
      <v-layout row wrap justify-start class="mt-4 mb-2 ml-4">
        <v-flex xs12 md4 sm4 lg4>
          <h2 style="color: #FFFFFF; font-family: 'Oswald', sans-serif; font-size: 34px;">
            “Best lunch stop in Kirirom.”
          </h2>
        </v-flex>
      </v-layout>
      <v-layout column align-content-space-around align-content-start fill-height>
        <v-flex xs12 md4 sm4 lg4>
          <v-btn dark large to="/search/food" depressed class="menubtn ml-4" color="#F7B947">
            Menu <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      </v-img>
      </v-card>
      <h2 class="mb-4 listTitle">Events</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 v-for="event in events.slice(0,4)" v-bind:key="event.id">
          <v-card width="100%" height="270px" color="#191C21" class="mb-4 card" dark :to="'/listing/'+ event.slug" flat style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
            <router-link :to="'/listing/'+ event.slug">
              <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up" v-if="event.images && event.images.length > 0" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="event.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-for="image in event.images.slice(0,4)" v-bind:key="image.url" :src="image.url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="event.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <span class="cardTitle"><h3>{{event.title}}</h3></span>
                <span class="cardSubtitle" v-if="event.ctaText>0">Starting from {{event.ctaText}}$ per night</span>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn to="/search/events" block large outline dark class="showAllbtn">
            Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <video style="object-fit:cover;" onclick="this.controls=true; this.play()" width="100%" class="mt-4" poster="https://res.cloudinary.com/die9ji2vn/image/upload/dpr_auto/w_auto/q_auto:low/f_auto/v1561607608/Thumbnail/JPEG/thumbnail_zjzji4.jpg">
          <source src="https://res.cloudinary.com/die9ji2vn/video/upload/v1560320692/10000000_143443766812356_671027213277999975_n_1_hm0gxb.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </v-flex>
      <h2 class="mt-2 mb-4 listTitle">Lease</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 v-for="lease in leases.slice(0,4)" v-bind:key="lease.id">
          <v-card width="100%" height="270px" color="#191C21" class="mb-4 card" dark :to="'/listing/'+ lease.slug" flat style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
            <router-link :to="'/listing/'+ lease.slug">
              <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="hidden-md-and-up" v-if="lease.images && lease.images.length > 0" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="lease.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-for="image in lease.images.slice(0,4)" v-bind:key="image.url" :src="image.url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="lease.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <span class="cardTitle"><h3>{{lease.title}}</h3></span>
                <span class="cardSubtitle" v-if="lease.ctaText>0">Starting from {{lease.ctaText}}$ per night</span>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4>
          <v-btn to="/search/lease/" block large outline dark class="showAllbtn">
            Show all <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <h2 class="mb-4 mt-3 listTitle">Ecotourism</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 v-for="ecotourism in ecotourisms.slice(0,4)" v-bind:key="ecotourism.id">
          <v-card width="100%" height="270px" class="mb-4 card" dark color="#191C21" :to="'/listing/'+ ecotourism.slug" flat style="box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
            <router-link :to="'/listing/'+ ecotourism.slug">
              <v-carousel hide-controls :cycle="false" dark width="100%" height="150px" class="hidden-md-and-up" v-if="ecotourism.images && ecotourism.images.length > 0" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="ecotourism.featuredImage" style="background-size:contain;">
                </v-carousel-item>
                <v-carousel-item v-for="image in ecotourism.images.slice(0,4)" v-bind:key="image.url" :src="image.url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img :src="ecotourism.featuredImage" height="150px" class="hidden-sm-and-down" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-layout align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <span class="cardTitle"><h3>{{ecotourism.title}}</h3></span>
                <span class="cardSubtitle" v-if="ecotourism.ctaText>0">Starting from {{ecotourism.ctaText}}$ per night</span>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-around justify-center>
        <v-flex xs12 sm4 md4 lg4 class="mt-3">
          <v-btn to="/search/ecotourism/" block large outline dark class="showAllbtn">
            Learn More <v-spacer></v-spacer> <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <Footer></Footer>
  </v-container-fluid>
</template>

<script>
const Footer = () => import ('@/components/Footer.vue')

export default {
  components:{
    Footer,
  },
  data() {
    return {
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
            roomTypes:[
              {
                amenities: '',
                beds: [
                  {
                    id: '',
                    count: '',
                    type: '',
                  }
                ],
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
            roomTypes:[
              {
                amenities: '',
                beds: [
                  {
                    id: '',
                    count: '',
                    type: '',
                  }
                ],
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
            roomTypes:[
              {
                amenities: '',
                beds: [
                  {
                    id: '',
                    count: '',
                    type: '',
                  }
                ],
              }
            ],
            rules: '',
            spaces: []
          }
        }
      },
      ecotourisms: {
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
            roomTypes:[
              {
                amenities: '',
                beds: [
                  {
                    id: '',
                    count: '',
                    type: '',
                  }
                ],
              }
            ],
            rules: '',
            spaces: []
          }
        }
      },
      leases: {
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
            roomTypeS:[
              {
                amenities: '',
                beds: [
                  {
                    id: '',
                    count: '',
                    type: '',
                  }
                ],
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
      this.accommodations=data.body.slice(0,3)
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/experiences').then(function(data){
      this.experiences=data.body.slice(0,3)
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/events').then(function(data){
      this.events=data.body.slice(0,3)
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/ecotourism').then(function(data){
      this.ecotourisms=data.body.slice(0,3)
    });
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/categories/by-name/lease').then(function(data){
      this.leases=data.body.slice(0,3)
    });
  },
}
</script>

<style lang="scss" scoped>
#header{
  object-fit: cover;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(0deg, #000A0E 0%, rgba(25, 28, 33, 0) 50%), url('https://res.cloudinary.com/die9ji2vn/image/upload/c_scale,q_auto:low,w_auto,dpr_auto,f_auto/v1561963925/tree/tree_d39rro.jpg');
  // background-position: bottom;
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
    max-width: 650px;
  }
}
@media only screen and (min-width: 1024px) {
  .container{
    max-width: 950px;
  }
}

#header{
  height: 300px;
}

.menubtn{
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize;
  margin: 0;
}
.showAllbtn{
  border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize;
}
.headerh1{
  color: #FFFFFF; bottom:20px; position:absolute; font-family: 'Oswald', sans-serif; font-size: 45px;
}
.headerh1mob{
  color: #FFFFFF; bottom:20px; position:absolute; font-family: 'Oswald', sans-serif; font-size: 35px;
}
.card{
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;
}
.cardTitle{
  color: #FFFFFF; font-size: 17px; line-height: 27px;
}
.cardSubtitle{
  font-size: 16px; line-height: 22px; color: #B9BCC1;
}
.listTitle{
  color: #D8DADE; font-size: 28px;
}
html {
  scroll-behavior: smooth;
}
</style>