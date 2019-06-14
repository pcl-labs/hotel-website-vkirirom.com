<template>
  <v-container grid-list-md>
    <v-layout column wrap justify-center class="text-xs-center">
    <v-flex xs12 md6 sm6 lg6 class="hidden-sm-and-down">
      <v-card dark color="#191C21" style="color:#B9BCC1; top:-70px;" height="100%">
        <v-card-text class="headline font-weight-bold display-4 text-xs-center">
          <span style="color:#B9BCC1; margin:20px;">Congratulations, your booking has been successfully made.</span>
        </v-card-text>
        <v-card-text class="headline font-weight-bold display-4 text-xs-center">
          <span style="color:#B9BCC1; margin:20px;"> Thank you for booking with us. We look forward to hosting you.</span>
        </v-card-text>
          <v-btn flat to="/" class="mb-3" outline style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Go Back Home
          </v-btn>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 sm6 lg6 class="hidden-md-and-up">
      <v-card dark color="#191C21" style="color:#B9BCC1; margin-bottom:10px; margin-top:20px;" height="100%">
        <v-card-text class="headline font-weight-bold display-4 text-xs-center">
          <span style="color:#B9BCC1; margin:20px;">Congratulations, your booking has been successfully made.</span>
        </v-card-text>
        <v-card-text class="headline font-weight-bold display-4 text-xs-center">
          <span style="color:#B9BCC1; margin:20px;"> Thank you for booking with us. We look forward to hosting you.</span>
        </v-card-text>
          <v-btn flat to="/" class="mb-3" outline style="border: 1px solid #FFFFFF; box-sizing: border-box; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; max-width:340px; text-transform:capitalize">
            Go Back Home
          </v-btn>
      </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

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
