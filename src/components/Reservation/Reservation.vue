<template>
  <div>
    <v-container>
      <ReviewRules></ReviewRules>
    </v-container>
  </div>
</template>

<script>
const ReviewRules = () => import ('@/components/Reservation/ReviewRules.vue')

export default {
  components:{
    ReviewRules
  }
}
</script>

<style scoped>
  .container{
    padding: 0;
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
