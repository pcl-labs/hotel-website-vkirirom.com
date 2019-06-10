<template>
  <v-flex xs12 class="pb-2 px-0">
    <h1 class="headline font-weight-bold py-3 mr-2" style="color: #D8DADE;">{{ title }}</h1>
    <v-layout row wrap>
      <slot name="content"></slot>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style>

</style>
