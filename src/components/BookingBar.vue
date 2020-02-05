<template>
  <v-container fluid class="booking-bar pa-0" :class="{ 'is-fixed': shouldStick }">
    <div class="booking-bar--sticker w-100">
      <section class="wrapper">
        <v-container class="xs-no-limit is-limited py-0 px-4 px-sm-2">
          <div class="d-flex wrapper-2">
            <!-- mobile content -->
            <div class="booking-bar--content is-mobile d-sm-none flex-grow-1 my-2">
              <h2 class="booking-bar--title subtitle-1 white--text mb-0 font-weight-medium" v-text="title"></h2>
              <div class="booking-bar--pricing white--text subtitle-2 mr-5 font-weight-light">
                <span class="currency">$</span>
                <span class="price" v-text="price"></span>
                <span class="postfix">/night</span>
              </div>
            </div>
            <!-- tablet content -->
            <div class="d-none d-sm-flex d-md-none flex-grow-1 align-center">
              <h2
                class="d-none d-sm-block booking-bar--title headline white--text mb-0 font-weight-bold"
                v-text="title"
              ></h2>
              <v-spacer></v-spacer>
              <div class="booking-bar--pricing white--text subtitle-1 mr-5 font-weight-semibold">
                <span class="currency">$</span>
                <span class="price" v-text="price"></span>
                <span class="postfix">/night</span>
              </div>
            </div>
            <!-- desktop content -->
            <div class="d-none d-md-flex flex-grow-1 align-center">
              <h2
                class="d-none d-md-block booking-bar--title display-2 white--text mb-0 font-weight-bold"
                v-text="title"
              ></h2>
              <v-spacer></v-spacer>
              <div class="booking-bar--pricing white--text title mr-5 font-weight-semibold">
                <span class="currency">$</span>
                <span class="price" v-text="price"></span>
                <span class="postfix">/night</span>
              </div>
            </div>
            <div class="d-flex align-center">
              <v-container class="d-flex pa-0">
                <booking-dialog ref="bookingDialog"></booking-dialog>
                <!-- mobile -->
                <v-btn
                  height="40"
                  @click="startBooking()"
                  block
                  medium
                  color="primary"
                  dark
                  class="d-sm-none text-capitalize dark--text"
                >
                  Book Now
                  <v-icon class="d-none d-sm-inline">keyboard_arrow_right</v-icon>
                </v-btn>
                <!-- desktop -->
                <v-btn
                  @click="startBooking()"
                  block
                  x-large
                  color="primary"
                  dark
                  class="hidden-xs-only text-capitalize dark--text title"
                >
                  Book Now
                  <v-icon class="d-none d-sm-inline">keyboard_arrow_right</v-icon>
                </v-btn>
              </v-container>
            </div>
          </div>
        </v-container>
      </section>
    </div>
  </v-container>
</template>

<script>
import BookingDialog from '@/components/BookingDialog.vue'
import store from '@/store'
import { getPassiveEventConfig } from '@/helpers'
export default {
  name: 'booking-bar',
  props: {
    title: String,
    price: Number
  },
  components: { BookingDialog },
  data() {
    return {
      bottomDistance: 0
    }
  },
  mounted() {
    this.setInitialDistance()
    this.positionListener()
  },
  destroyed() {
    document.removeEventListener('scroll', event => this.onScrollPage(event))
  },
  computed: {
    footerHeight() {
      return store.getters['layout/getSizing'].footerHeight
    },
    shouldStick() {
      return this.bottomDistance > this.footerHeight
    }
  },
  methods: {
    setInitialDistance() {
      this.onScrollPage(null)
    },
    positionListener() {
      document.addEventListener('scroll', event => this.onScrollPage(event), getPassiveEventConfig())
    },
    onScrollPage(event) {
      var scrollPosition = window.pageYOffset
      var windowSize = window.innerHeight
      var bodyHeight = document.body.offsetHeight

      this.bottomDistance = Math.max(bodyHeight - (scrollPosition + windowSize), 0)
    },
    startBooking() {
      this.$refs.bookingDialog.openDialog()
      this.$emit('on-start-booking')
    }
  }
}
</script>

<style lang="scss" scoped>
$bar-height-xs: rem(56px);
$bar-height-sm: rem(80px);
.booking-bar {
  z-index: $booking-bar-zindex;
  position: relative;
  opacity: 1;
  transition: opacity $loading-transition-time ease;
  &.is-fixed {
    .booking-bar--sticker {
      position: fixed;
      bottom: 0;
    }
  }
}
[page-is-loading] {
  .booking-bar {
    opacity: 0;
  }
}

.wrapper {
  background-color: map-get($grey, 'darken-4');
}
.booking-bar,
.wrapper-2 {
  height: $bar-height-xs;
  @include media-breakpoint-up(sm, $my-breakpoints) {
    height: $bar-height-sm;
  }
}
.xs-no-limit {
  @include media-breakpoint-down(xs, $my-breakpoints) {
    max-width: none;
  }
}
.is-mobile {
  .booking-bar--title,
  .booking-bar--pricing {
    line-height: rem(20px);
  }
}
</style>
