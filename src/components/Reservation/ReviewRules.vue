<template>
  <v-container grid-list-md>
    <v-flex xs12 md6>
    </v-flex>
    <v-flex xs12 md6>
      <BookingInfoCard></BookingInfoCard>      
    </v-flex>
  </v-container>
</template>

<script>
const BookingInfoCard = () => import ('@/components/Reservation/BookingInfoCard.vue')

export default {
  components:{
    BookingInfoCard
  }
}
</script>

<style scoped>
  .container{
    padding: 0;
  }
  .container{
    padding:0;
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
