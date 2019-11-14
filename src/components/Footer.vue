<template>
  <footer>
    <div style="background: #191C21; box-shadow: 0px -1px 0px #121416; color: #D8DADE;">
      <v-container grid-list-md align-start id="footer">
        <v-layout row wrap justify-space-between>
          <v-flex xs6 sm6 md3 lg3 class="mb-3">
            <h3>Engage</h3>
            <br>
            <ul style="list-style:none; padding:0; margin:0;">
              <li>
                <router-link to="/Contact" class="link">
                  Contact
                </router-link>
              </li>
              <li><a href="http://asiato.asia/" target="_blank" class="link">About</a></li>
              <!-- <li>Book Now</li> -->
              <li>
                <router-link to="/listing/in-the-press" class="link">
                  In the press
                </router-link>
              </li>
            </ul>
          </v-flex>
          <v-flex xs6 sm6 md3 lg3 class="mb-3">
            <h3>Invest</h3>
            <br>
            <ul style="list-style:none; padding:0; margin:0;">
              <li>
                <router-link to="/listing/nature-city-investment-cambodia-property" class="link">
                  Lease a Property
                </router-link>
              </li>
              <!-- <li>Collaborate</li> -->
              <li>
                <router-link to="/listing/partner" class="link">
                  Partner
                </router-link>
              </li>
            </ul>
          </v-flex>
          <v-flex xs12 sm6 md3 lg3 class="mb-3">
            <h3>Learn</h3>
            <br>
            <ul style="list-style:none; padding:0; margin:0;">
              <!-- <li>Community Outreach</li> -->
              <li>
                <router-link to="/listing/our-scholarship-program" class="link">
                  Our Scholarship Program
                </router-link>
              </li>
              <li>
                <router-link to="/listing/Proudly-Powered-by-KIT-Students" class="link">
                  Proudly Powered by KIT
                </router-link>
              </li>
            </ul>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  footer h3 {
    margin-bottom: 16px;
  }
  footer li {
    line-height: 32px;
  }
  .link {
    text-decoration:none;
    color:#D8DADE;
  }
  .container {
    padding-top: 30px;
    padding-left: 0px;
    padding-right: 0px;
    // doing padding:0px or  0; or padding-bottom:0px or 0; creates an extra overflow scroll which is bad and should be avoided
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
