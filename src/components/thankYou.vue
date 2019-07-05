<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PMXGLXR');</script>
<!-- End Google Tag Manager -->
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMXGLXR"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<template>
<v-container-fluid>
  <v-container grid-list-md>
    <v-layout column wrap justify-center class="text-xs-center" style="min-height: 100vh;">
    <v-flex xs12 md6 sm6 lg6 class="hidden-sm-and-down">
      <v-card dark color="#191C21" style="color:#B9BCC1;" height="100%">
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
  <Footer></Footer>
</v-container-fluid>
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
