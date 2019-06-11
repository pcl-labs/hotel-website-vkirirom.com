<template>
  <div class="flex-center">
    <img :src="imgURL" class="mr-3"/>
    <span class="subheading">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: ['imgURL', 'name'],
};
</script>

<style lang="scss">
.flex-center {
  display: flex;
  align-items: center;
}
</style>
