<template>
  <div>
    <v-container>
      <BookingInfoCard></BookingInfoCard>
    </v-container>
  </div>
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

</style>
