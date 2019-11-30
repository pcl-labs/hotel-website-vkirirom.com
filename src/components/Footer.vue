<template>
  <footer>
    <div style="background: #191C21; box-shadow: 0px -1px 0px #121416; color: #D8DADE;">
      <v-container class="is-limited" grid-list-md align-start id="footer">
        <v-row no-gutters justify-space-between>
          <v-col cols="6" sm="4" class="mb-4">
            <h3>Engage</h3>
            <br>
            <ul style="list-style:none; padding:0; margin:0;">
              <li class="mb-2">
                <router-link to="/Contact" class="link">
                  Contact
                </router-link>
              </li>
              <li class="mb-2"><a href="http://asiato.asia/" target="_blank" class="link">About</a></li>
              <!-- <li class="mb-2">Book Now</li> -->
              <li class="mb-2">
                <router-link to="/listing/in-the-press" class="link">
                  In the press
                </router-link>
              </li>
            </ul>
          </v-col>
          <v-col cols="6" sm="4" class="mb-4">
            <h3>Invest</h3>
            <br>
            <ul style="list-style:none; padding:0; margin:0;">
              <li class="mb-2">
                <router-link to="/listing/nature-city-investment-cambodia-property" class="link">
                  Lease a Property
                </router-link>
              </li>
              <!-- <li class="mb-2">Collaborate</li> -->
              <li class="mb-2">
                <router-link to="/listing/partner" class="link">
                  Partner
                </router-link>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" sm="4" class="mb-4">
            <h3>Learn</h3>
            <br>
            <ul style="list-style:none; padding:0; margin:0;">
              <!-- <li class="mb-2">Community Outreach</li> -->
              <li class="mb-2">
                <router-link to="/listing/our-scholarship-program" class="link">
                  Our Scholarship Program
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/listing/Proudly-Powered-by-KIT-Students" class="link">
                  Proudly Powered by KIT
                </router-link>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .link{
    text-decoration:none; 
    color:#D8DADE;
  }
</style>
