<template>
  <div>
    <v-container class="is-limited" grid-list-md style="min-height:100vh;">
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
      <v-row dense>
        <v-col cols="12" sm="6" md="4" v-for="resort in resorts" v-bind:key="resort.id">
          <v-card :ripple="false" color="#191C21" class="mb-6 card" width="100%" dark :to="'/listing/'+ resort.slug" flat>
          <router-link :to="'/listing/'+ resort.slug">
            <v-carousel height="150px" :cycle="false" hide-controls dark width="100%" class="d-md-none" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <v-carousel-item :src="resort.featuredImage">
                </v-carousel-item>
                <v-carousel-item v-for="image in resort.images.slice(0,4)" v-bind:key="image.url" :src="image.url" style="background-size:contain;">
                </v-carousel-item>
              </v-carousel>
            </router-link>
            <v-img class="d-none d-md-block" :src="resort.featuredImage" height="150px" style="border-top-left-radius: 10px; border-top-right-radius: 10px;"></v-img>
            <v-row no-gutters align-start>
              <v-card-text style="margin:10px; padding: 0;">
                <p>
                  <!-- <span style="font-size: 12px; line-height: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #B9BCC1;">Entire {{resort.title}}</span> -->
                  <span style="color: #FFFFFF; font-size: 17px; line-height: 27px;"><h3>{{resort.title}}</h3></span>
                  <span style="font-size: 16px; line-height: 22px; color: #B9BCC1;" v-if="resort.ctaText>0">Starting from {{resort.ctaText}}$ per night</span>
                </p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>
import { PageService } from "@/connection/resources.js"
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
  .card{
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 270px;
  }
  .v-card--link:before {
    border-radius: inherit;
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
</style>
