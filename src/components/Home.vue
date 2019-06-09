<template>
<v-container-fluid>
  <v-img id="header" :src="headerImg">
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
        <p class="header-text">Book your nature retreat.</p>
    </v-layout>
  </v-container>
  </v-img>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
    <!-- <ListCover title="Accommodation">
    <template v-slot:content>
      <v-flex xs3>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
            Hello
          </p>
        </v-layout>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
            Hello
          </p>
        </v-layout>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
            Hello
          </p>
        </v-layout>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-img src="https://res.cloudinary.com/die9ji2vn/image/upload/v1559801041/Bungalow_1_ledef7.jpg"></v-img>
        </v-card>
        <v-layout align-start>
          <p style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">
            Hello
          </p>
        </v-layout>
      </v-flex>
    </template>
    </ListCover> -->
    <ListCover title="Accommodation" id="accommodation">
          <template v-slot:content>
                <IntroCard
                  v-for="(post, index) in places"
                  :key="index"
                  :place="post"
                />
            </template>
        </ListCover>
    </v-layout>
  </v-container>
</v-container-fluid>
</template>

<script>
import FrontendImg from '../assets/FrontImage.png';
import headerImg from '../assets/freedom-camping-4m-bell-tent-5_copy_3_6e7cf404-7d2f-4cac-8bf7-fd04c9dd8854_1024x1024.jpeg'
import ListCover from '@/components/Home/ListCover.vue';
import IntroCard from '@/components/Home/Cards/IntroCard.vue'

export default {
  components:{
    ListCover,
    IntroCard
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
      headerImg
    }
  },

}
</script>

<style>
#header{
  background-size: contain;
  height: 300px;
}
.gradient{
    background-image: linear-gradient(128.38deg, #121416 0%, #313A4F 100%, transparent) ;
}
.header-text{
  position: absolute;
  left: 0%;
  right: -4.35%;
  top: 0%;
  bottom: -16.28%;

  font-size: 36px;
  line-height: 49px;

  color: #FFFFFF;
}


</style>
