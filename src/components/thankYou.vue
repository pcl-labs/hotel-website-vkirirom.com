<template>
  <div>
    <v-container>
      <v-row class="justify-center text-center" style="min-height: 100vh;">
      <v-flex xs12 class="d-none d-md-flex justify-center">
        <v-card class="pa-4" dark color="#191C21" style="color:#B9BCC1; margin:auto;">
          <v-card-text class="headline font-weight-bold display-4 text-center">
            <span style="color:#B9BCC1; margin:20px;">Congratulations, your booking has been successfully made.</span>
          </v-card-text>
          <v-card-text class="headline font-weight-bold display-4 text-center">
            <span style="color:#B9BCC1; margin:20px;"> Thank you for booking with us. We look forward to hosting you.</span>
          </v-card-text>
            <v-btn text to="/" class="mb-4" outlined style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
              Go Back Home
            </v-btn>
        </v-card>
      </v-flex>
      <v-flex xs12 class="d-md-none">
        <v-card class="pt-4" dark color="#191C21" style="color:#B9BCC1; min-height: 90%;">
          <v-card-text class="headline font-weight-bold display-4 text-center">
            <span style="color:#B9BCC1; margin:20px;">Congratulations, your booking has been successfully made.</span>
          </v-card-text>
          <v-card-text class="headline font-weight-bold display-4 text-center">
            <span style="color:#B9BCC1; margin:20px;"> Thank you for booking with us. We look forward to hosting you.</span>
          </v-card-text>
            <v-btn text to="/" class="mb-4" outlined style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
              Go Back Home
            </v-btn>
        </v-card>
      </v-flex>
      </v-row>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './Footer.vue'

export default {
  name: "thankYou",
  components:{
    Footer
  }
}
</script>

<style>
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
