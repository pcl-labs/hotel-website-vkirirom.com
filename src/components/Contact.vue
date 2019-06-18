<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <h1 style="font-size: 36px; line-height: 49px; color: #FFFFFF;" class="mt-4 mb-4">
          Contact
        </h1>
        <v-form name="Contact" method="post" netlify ref="form" action="/thanks" data-netlify="true">
          <input type="hidden" name="form-name" value="Contact"/>
          <v-flex xs12 class="mt-4 mb-4">
            <h2 style="font-size: 20px; line-height: 27px; color: #D8DADE;" class="mt-3 mb-3">
              Name
            </h2>
            <input 
              style="border: 1px solid #3D424E; box-sizing: border-box; border-radius: 3px; height:50px; max-width:341px; width:100%; font-size: 16px; line-height: 22px; color: #B9BCC1; padding:17px;"
              v-model="name"
              placeholder="Full Name"
              name="name"
            >
          </v-flex>
          <v-flex xs12 class="mt-4 mb-4">
            <h2 style="font-size: 20px; line-height: 27px; color: #D8DADE;" class="mt-3 mb-3">
              Phone Number
            </h2>
            <input 
              style="border: 1px solid #3D424E; box-sizing: border-box; border-radius: 3px; height:50px; max-width:341px; width:100%; font-size: 16px; line-height: 22px; color: #B9BCC1; padding:17px;"
              v-model="phone"
              placeholder="Full Name"
              name="phone"
            >
          </v-flex>
          <v-flex xs12 class="mt-4 mb-4">
            <h2 style="font-size: 20px; line-height: 27px; color: #D8DADE;" class="mt-3 mb-3">
              E-Mail
            </h2>
            <input 
              style="border: 1px solid #3D424E; box-sizing: border-box; border-radius: 3px; height:50px; max-width:341px; width:100%; font-size: 16px; line-height: 22px; color: #B9BCC1; padding:17px;"
              v-model="email"
              placeholder="Full Name"
              name="email"
            >
          </v-flex>
          <v-flex xs12 class="mt-4 mb-4">
            <h2 style="font-size: 20px; line-height: 27px; color: #D8DADE;" class="mt-3 mb-3">
              Message
            </h2>
            <textarea 
              style="border: 1px solid #E9EDF1; box-sizing: border-box; border-radius: 3px; height:128px; max-width:500px; width:100%; font-size: 16px; line-height: 22px; color: #B9BCC1; padding:17px;"
              v-model="message"
              placeholder="Full Name"
              name="message"
            ></textarea>
          </v-flex>
          <v-flex xs12 class="mt-4 mb-4">
            <v-btn 
              dark 
              block 
              large 
              depressed 
              style="padding:0; margin:0; background: #AC3931; box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 4px; text-transform:capitalize; max-width:270px; font-size: 16px; height:50px;" 
              color="#4B7F52"
              type="submit"
            >
              Send<v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card 
          width="300px" 
          color="#191C21" 
          dark
          class="hidden-sm-and-down"
          style="position:absolute; top:10%; left:59%; border: 1px solid #E1E7ED; box-sizing: border-box; border-radius: 3px;">
          <v-card-text style="margin:10px; margin-right:15px;">
            <v-flex xs12>
              <h1 style="font-size: 28px; color: #D8DADE;">
                Contact
              </h1>
              <p style="font-size: 14px; color: #B9BCC1;">
                Kirirom Institute of Technology
              </p>
              <h2 style="font-size: 20px; color: #D8DADE;">
                Address
              </h2>
              <p style="font-size: 14px; color: #B9BCC1;">
                #253, 255 E0, 
                <br> 
                Borey BipupThmey-Boeung Chhouk Road 2011 (Ouknhar Tri Heng Road), 
                <br>
                Street E; Khan Sen Sok, 
                <br>
                Phnom Penh, Cambodia
              </p>
              <h2 style="font-size: 20px; color: #D8DADE;">
                E-Mail
              </h2>
              <p style="font-size: 14px; color: #B9BCC1;">
                <a href="mailto:leo@asiato.asia" style="text-decoration:none; color: #B9BCC1;">leo@asiato.asia</a>
              </p>
              <h2 style="font-size: 20px; color: #D8DADE;">
                Phone Number
              </h2>
              <p style="font-size: 14px; color: #B9BCC1;">
                <a href="tel:+85578777348" style="text-decoration:none; color: #B9BCC1;">+(855) 78 777 348</a>
              </p>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card 
          width="100%" 
          color="#191C21" 
          dark
          class="hidden-md-and-up mb-4 mt-4"
          style="border: 1px solid #E1E7ED; box-sizing: border-box; border-radius: 3px;">
          <v-card-text>
            <v-flex xs12>
              <h1 style="font-size: 28px; color: #D8DADE;">
                Contact
              </h1>
              <p style="font-size: 14px; color: #B9BCC1;">
                Kirirom Institute of Technology
              </p>
              <h2 style="font-size: 20px; color: #D8DADE;">
                Address
              </h2>
              <p style="font-size: 14px; color: #B9BCC1;">
                #253, 255 E0, 
                <br> 
                Borey BipupThmey-Boeung Chhouk Road 2011 (Ouknhar Tri Heng Road), 
                <br>
                Street E; Khan Sen Sok, 
                <br>
                Phnom Penh, Cambodia
              </p>
              <h2 style="font-size: 20px; color: #D8DADE;">
                E-Mail
              </h2>
              <p style="font-size: 14px; color: #B9BCC1;">
                <a href="mailto:leo@asiato.asia" style="text-decoration:none; color: #B9BCC1;">leo@asiato.asia</a>
              </p>
              <h2 style="font-size: 20px; color: #D8DADE;">
                Phone Number
              </h2>
              <p style="font-size: 14px; color: #B9BCC1;">
                <a href="tel:+85578777348" style="text-decoration:none; color: #B9BCC1;">+(855) 78 777 348</a>
              </p>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      name: '',
      email: '',
      phone: '',
      message: '',
    }
  }
}
</script>

<style>
  input:focus, textarea:focus { 
    border-color: 1px solid #3D424E !important;
  }
  input:focus, textarea:focus{
  outline-offset: 0px !important;
  outline: none !important;
  }
  @-webkit-keyframes autofill {
      to {
          color: #B9BCC1;
          background: transparent;
      }
  }

  input:-webkit-autofill {
      -webkit-animation-name: autofill;
      -webkit-animation-fill-mode: both;
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
