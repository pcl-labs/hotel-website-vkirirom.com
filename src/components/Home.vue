<template>
<v-container-fluid>
<div class="gradient fill-height">
  <v-img id="header" :src="headerImg" height="300px">
    <v-container grid-list-md>
      <v-layout row wrap align-end justify-start fill-height>
        <v-flex sm6 md3>
        <p class="header-text">Book your <br> nature retreat.</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</div>
  <v-container grid-list-md>
    <v-layout row wrap justify-space-between class="pb-4">
    <ListCover title="Accommodation" style="font-size: 16px;line-height: 19px; color: #D8DADE;"></ListCover>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p>
            <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
              Entire 
            </span>
            <br>
            <span ></span>
          </p>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p>
            <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
              Entire 
            </span>
            <br>
            <span ></span>
          </p>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p>
            <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
              Entire 
            </span>
            <br>
            <span ></span>
          </p>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-img :src="corporateRetreat" height="300px" position="top" class="pt-3">
      <v-layout row wrap justify-end align-end >
        <v-flex xs6 class="pt-4">
          <p style="font-size: 36px; color: #FFFFFF;">Your next corporate retreat</p>
        </v-flex>
      </v-layout>
      <v-layout column align-center justify-center fill-height>
        <v-flex xs6>
          <v-btn dark large depressed style="border-radius: 4px;" color="#4B7F52">
            Book Now
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>
  <v-layout row wrap justify-space-between>
    <ListCover title="Experiences" class="pt-3" style="font-size: 16px;line-height: 19px; color: #D8DADE;"></ListCover>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p>
            <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
              Entire 
            </span>
            <br>
            <span ></span>
          </p>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p>
            <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
              Entire 
            </span>
            <br>
            <span ></span>
          </p>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p>
            <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
              Entire 
            </span>
            <br>
            <span ></span>
          </p>
        </v-layout>
      </v-flex>
    </v-layout>
    <Card v-for="place in places" :key="place"></Card>
  </v-container>
<footer>
  <div style="background: #191C21; box-shadow: 0px -1px 0px #121416; color: #D8DADE;">
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 sm6 md3>
        <p>Vkirirom
        <br>
        <ul style="list-style:none;">
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
        </ul>
        </p>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <p>Discover
        <br>
        <ul style="list-style:none;">
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
        </ul>
        </p>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <p>Hosting
        <br>
        <ul style="list-style:none;">
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
          <li>Lorem Ipsum</li>
        </ul>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</footer>
</v-container-fluid>
</template>

<script>
import FrontendImg from '../assets/FrontImage.png'
import corporateRetreat from '../assets/951820009082492817.jpg'
import headerImg from '../assets/freedom-camping-4m-bell-tent-5_copy_3_6e7cf404-7d2f-4cac-8bf7-fd04c9dd8854_1024x1024.jpeg'
import ListCover from './Home/ListCover.vue'
import introCard from './Home/IntroCard.vue'
import Card from './Card.vue'

export default {
  components:{
    ListCover,
    introCard,
    Card
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
      corporateRetreat
    }
  },

}
</script>

<style>
#header{
  background-size: contain;
  object-fit: cover;
}
.gradient{  
    background: linear-gradient(128.38deg, #121416 0%, #313A4F 100%, transparent 72px) 
}
.header-text{

  font-size: 36px;
  color: #FFFFFF;
  margin-top: 50%;
}


</style>
