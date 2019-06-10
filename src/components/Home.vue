<template>
<v-container-fluid>
<v-card>
  <div id="header" height="45vh">
    <v-container grid-list-md>
      <v-layout row wrap align-end justify-start>
        <v-flex xs12 sm6 md3 lg3>
        <h1 style="margin-left:30px; color: #FFFFFF; margin-top: 23vh;">Book your <br> nature retreat.</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</v-card>
  <v-container grid-list-md>
    <div style="margin:30px; margin-top:0;">
    <ListCover title="Accommodation" style="color: #D8DADE;" class="mb-2"></ListCover>
    <v-layout row wrap justify-space-between justify-center>
      <v-flex xs12 sm6 md4 lg4>
        <v-card hover height="150px" width="99%">
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg" height="150px"></v-img>
        </v-card>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Bungalow</span>
            <span style="color: #FFFFFF; font-size: 20px; line-height: 27px;"><h3>Bungalow</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 113$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-card hover height="150px"  width="99%">
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801013/Luxury_Tent_1_e755jg.jpg" height="150px"></v-img>
        </v-card>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Luxury Tent</span>
            <span style="color: #FFFFFF; font-size: 20px; line-height: 27px;"><h3>Luxury Tent</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 68$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-card hover height="150px"  width="99%">
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801023/Khmer_Cottage_1_g5efqp.jpg" height="150px"></v-img>
        </v-card>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire Khmer Cottage</span>
            <span style="color: #FFFFFF; font-size: 20px; line-height: 27px;"><h3>Khmer Cottage</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 50$ per night</span>
            </p>
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-btn block large outline dark style="border-radius: 4px;" class="ma-2 mb-4 hidden-md-and-up">Show all (8)</v-btn>
    </v-layout>
    <v-card hover>
    <v-img :src="corporateRetreat" height="300px" position="top" class="mt-3 pa-1" width="100%">
      <v-layout row wrap justify-end hidden-sm-and-down>
        <v-flex xs12 md4 sm4 lg4 class="ma-4" align-end>
          <h1 style="color: #FFFFFF;">Your next corporate retreat.</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center hidden-md-and-up text-xs-center>
        <v-flex xs12 align-center >
          <h1 style="color: #FFFFFF; font-size: 36px; line-height: 49px; text-align: center; margin-top:30px;">Your next corporate retreat.</h1>
        </v-flex>
      </v-layout>
      <v-layout column align-center justify-center fill-height>
        <v-flex xs12 md6 sm4 lg6>
          <v-btn dark large depressed style="border-radius: 4px;" color="#4B7F52">
            Book Now
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>
    </v-card>
  <v-layout row wrap justify-space-between>
    <ListCover title="Experiences" class="pt-3 pa-1 mb-3" style="font-size: 16px; line-height: 19px; color: #D8DADE;"></ListCover>
      <v-flex xs12 sm6 md4 lg4>
        <v-card hover height="150px" width="99%">
          <v-img :src="experience1" height="150px"></v-img>
        </v-card>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Experience</span>
            <span style="color: #FFFFFF; font-size: 20px; line-height: 27px;"><h3>Rock Climbing</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 50$ per person</span>
            </p>
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-card hover height="150px" width="99%">
          <v-img :src="experience1" height="150px"></v-img>
        </v-card>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Experience</span>
            <span style="color: #FFFFFF; font-size: 20px; line-height: 27px;"><h3>Rock Climbing</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 50$ per person</span>
            </p>
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-card hover height="150px" width="99%">
          <v-img :src="experience1" height="150px"></v-img>
        </v-card>
        <v-layout align-start>
          <v-card-text class="pa-1">
            <p><span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Experience</span>
            <span style="color: #FFFFFF; font-size: 20px; line-height: 27px;"><h3>Rock Climbing</h3></span>
            <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;"> 50$ per person</span>
            </p>
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-card xs12 width="100%" class="mt-4">
      <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1560151624/Healthy_eyfk5v.jpg" height="300px" position="top" class="pt-3">
      <v-layout row wrap justify-start class="ma-4">
        <v-flex xs6 md4 sm4 lg4>
          <h1 style="color: #FFFFFF;">Mouth Watering</h1>
        </v-flex>
      </v-layout>
      <v-layout column align-content-space-around align-content-start fill-height class="ma-4">
        <v-flex xs6 md6 sm4 lg6>
          <v-btn dark large depressed style="border-radius: 4px;" outline>
            Menu
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>
    </v-card>
    </v-layout>
    </div>
  </v-container>
<footer>
  <div style="background: #191C21; box-shadow: 0px -1px 0px #121416; color: #D8DADE;">
  <v-container grid-list-md align-start id="footer" style="margin-right:10px;">
    <v-layout row wrap justify-space-between>
      <v-flex xs12 sm6 md4 lg4>
        <h3>Vkirirom</h3>
        <br>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
        </ul>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <h3>Discover</h3>
        <br>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
        </ul>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <h3>Hosting</h3>
        <br>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</footer>
</v-container-fluid>
</template>

<script>
import FrontendImg from '../assets/FrontImage.png'
import experience1 from '../assets/experience1.jpg'
import corporateRetreat from '../assets/951820009082492817.jpg'
import headerImg from '../assets/freedom-camping-4m-bell-tent-5_copy_3_6e7cf404-7d2f-4cac-8bf7-fd04c9dd8854_1024x1024.jpeg'
import food from '../assets/istockphoto-614420320-612x612.jpg'
import ListCover from './Home/ListCover.vue'
import introCard from './Home/IntroCard.vue'
import Card from './Card.vue'

export default {
  components:{
    ListCover,
    introCard,
    Card,
    
  },
  data: () => ({
    slickComp: '',
    slickOptions: {
      dots: true,
      infinite: false,
      slidesToScroll: 5,
      variableWidth: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToScroll: 5,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToScroll: 1
          }
        }
      ]
    },
    posts: [
      {
        category: 'Accommodation',
        image:
          'https://www.vkirirom.com/images/detailsimage/bungalow/bungalow2.jpg',
        href: '#accommodation',
        title: 'Auto Camping',
        price: '45',
        per: 'night',
        refName: 'accommodation',
      },
    ],
    places: [
      {
        category: 'Accommodation',
        title: 'Bungalow',
        image:
          'https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg',
        price: '113',
        href: '#',
        per: 'night',
        slug: 'Bungalow'
      },
      {
        category: 'Accommodation',
        title: 'Luxury Tent',
        image:
          'https://res.cloudinary.com/die9ji2vn/image/upload/v1559801013/Luxury_Tent_1_e755jg.jpg',
        price: '68',
        href: '#',
        per: 'night',
        slug: 'Luxury-Tent'
      },
      {
        category: 'Accommodation',
        title: 'Khmer Cottage',
        image:
          'https://www.vkirirom.com/images/detailsimage/khmercottage/khmercottage1.JPG',
        price: '50',
        href: '#',
        per: 'night',
        slug: 'Khmer-Cottage'
      },
      {
        category: 'Accommodation',
        title: 'Camping',
        image:
          'https://res.cloudinary.com/die9ji2vn/image/upload/v1559801033/Camping_1_mqqhyf.jpg',
        price: '20',
        href: '#',
        per: 'night',
        slug: 'Camping'
      },
      {
        category: 'Accommodation',
        title: 'Pipe Room',
        image:
          'https://res.cloudinary.com/die9ji2vn/image/upload/v1559800987/Pipe_Room_1_lheut2.jpg',
        price: '50',
        href: '#',
        per: 'night',
        slug: 'Pipe-Room'
      },
      {
        category: 'Accommodation',
        title: 'Villa Suite',
        image:
          'https://res.cloudinary.com/die9ji2vn/image/upload/v1559800960/Villa_Suite_1_tsmo2b.jpg',
        price: '241',
        href: '#',
        per: 'night',
        slug: 'Villa-Suite'
      },
      {
        category: 'Accommodation',
        title: 'Villa Jasmine',
        image:
          'https://res.cloudinary.com/die9ji2vn/image/upload/v1559800971/Villa_Jasmine_1_tqe47i.jpg',
        price: '113',
        href: '#',
        per: 'night',
        slug: 'Villa-Jasmine'
      },
    ],
  }),
  data() {
    return {
      FrontendImg,
      headerImg,
      corporateRetreat,
      food,
      experience1
    }
  },

}
</script>

<style>
#header{
  background-size: contain;
  object-fit: cover;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(0deg, #191C21 0%, rgba(25, 28, 33, 0) 50%), url('https://res.cloudinary.com/die9ji2vn/image/upload/v1559800987/Pipe_Room_1_lheut2.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
@media only screen and (max-width: 600px) {
  #footer{
    padding-left: 42px;
  }
}
</style>
