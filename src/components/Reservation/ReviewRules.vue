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
  margin: 0;
}
</style>
