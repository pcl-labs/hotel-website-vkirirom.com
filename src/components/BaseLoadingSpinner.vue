<template functional>
  <div class="spinner">
    <div class="rect1 d-inline-block"></div>
    <div class="rect2 d-inline-block"></div>
    <div class="rect3 d-inline-block"></div>
    <div class="rect4 d-inline-block"></div>
    <div class="rect5 d-inline-block"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang='scss' scoped>
$spinner-item-color: #000;
$spinner-item-width: 6px;
$spinner-item-margin: 3px;
$spinner-item-count: 5;
$spinner-width: $spinner-item-count *
  ($spinner-item-width + $spinner-item-margin) - $spinner-item-margin;
$spinner-height: 40px;

.spinner {
  width: rem($spinner-width);
  height: rem($spinner-height);
  text-align: center;
  font-size: rem(16px);
}

.spinner > div {
  background-color: $spinner-item-color;
  height: 100%;
  width: rem(6px);
  animation: sk-stretchdelay 1200ms infinite ease-in-out;
  margin-right: rem(3px);
  &:last-child {
    margin-right: 0;
  }
}

.spinner .rect2 {
  animation-delay: -1100ms;
}

.spinner .rect3 {
  animation-delay: -1000ms;
}

.spinner .rect4 {
  animation-delay: -900ms;
}

.spinner .rect5 {
  animation-delay: -800ms;
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
