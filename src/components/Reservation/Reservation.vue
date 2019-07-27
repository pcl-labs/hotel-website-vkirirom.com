<template>
  <router-view></router-view>
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

</style>
