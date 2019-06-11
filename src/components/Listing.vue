<template>
  <v-container-fluid>
    <v-card dark>
      <v-img class="header" v-if="resort.images.length > 0" :src="resort.featuredImage">
        <div class="fill-height gradient">
        </div>
      </v-img>
    </v-card>
    <v-container>

    </v-container>
  </v-container-fluid>
</template>

<script>
export default {
  data(){
    return{
      slug: this.$route.params.id,
      resort: {
        images: []
      }
    }
  },
  created() {
    this.$http.get('https://stagingapi.whynot.earth/api/v0/pages/slug/vkirirom/'+this.slug).then(function(data){
      console.log(data);
      this.resort=data.body;
    });
  },
}
</script>

<style>
  html {
    scroll-behavior: smooth;
  }

  .header{
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    height: 464px;
    object-fit: cover;
  }
  .gradient{
    background-image: linear-gradient(0deg, #191C21 0%, rgba(25, 28, 33, 0) 50%);
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
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
