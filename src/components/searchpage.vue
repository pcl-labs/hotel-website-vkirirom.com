<template>
  <v-app class="pa-0">
    <v-container>
      <v-flex><h1>Your Search Results are:</h1></v-flex>
      <v-divider></v-divider>
      <div style="margin-bottom:20px;"></div>
      <v-layout justify-space-between justify-space-around align-center wrap>
      <v-flex xs12 sm6 md4 v-for="(post, index) in places" :key="index" :place="post">
        <IntroCard
          :key="index"
          :place="post"
        />
      </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import IntroCard from '@/components/Home/IntroCard';

export default {
  components: {
    IntroCard,
  },
data: () =>  ({
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
}
</script>

<style>

</style>
