<template>
  <v-card
    class="card"
    dark
    width="100%"
    max-width="330px"
  >
    <v-layout row wrap>
      <v-flex xs12 md6>
        <h2>
          {{resort.title}}
        </h2>
        <p>Entire {{resort.title}}</p>
      </v-flex>
      <v-flex xs12 md6>
        <v-img :src="resort.featuredImage"></v-img>
      </v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs12>
      </v-flex>
      <v-flex xs6 text-xs-right>
      </v-flex>
      <v-flex>
      </v-flex>
      <v-flex xs6 text-xs-right>
      </v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>        
      <v-flex xs12>
      </v-flex>
      <v-flex xs12>
      </v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs6>
      </v-flex>
      <v-flex xs6 text-xs-right>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  computed:{
    resort() {
      return this.$store.getters["resort/getResort"];
    },
  }
}
</script>

<style lang="scss" scoped>
  .card{
    border: 1px solid #E1E7ED;
    border-radius: 3px; 
    margin:0;
    padding:30px;
    background-color: #191C21;
    h2{
      color: #B9BCC1;
      font-size: 20px;
      line-height: 24px;
    }
    p{
      font-size: 14px;
      line-height: 19px;
      color: #B9BCC1;
    }
  }
</style>
