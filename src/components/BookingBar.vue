<template>
  <v-container
    fluid
    class="booking-bar pa-0"
    :class="{ 'is-fixed': shouldStick }"
  >
    <div class="booking-bar--sticker w-100">
      <section class="wrapper">
        <v-container class="xs-no-limit is-limited py-0 px-3 px-sm-2">
          <div class="d-flex wrapper-2">
            <!-- mobile content -->
            <div class="d-sm-none flex-grow-1">
              <h2
                class="booking-bar--title subtitle-1 light--text mb-0"
                v-text="title"
              ></h2>
              <div class="pricing light--text subtitle-2 mr-5">
                <span class="currency">$</span>
                <span class="price" v-text="price"></span>
                <span class="postfix">/night</span>
              </div>
            </div>
            <!-- tablet content -->
            <div class="d-none d-sm-flex d-md-none flex-grow-1 align-center">
              <h2
                class="d-none d-sm-block booking-bar--title headline light--text mb-0"
                v-text="title"
              ></h2>
              <v-spacer></v-spacer>
              <div class="pricing light--text subtitle-1 mr-5">
                <span class="currency">$</span>
                <span class="price" v-text="price"></span>
                <span class="postfix">/night</span>
              </div>
            </div>
            <!-- desktop content -->
            <div class="d-none d-md-flex flex-grow-1 align-center">
              <h2
                class="d-none d-md-block booking-bar--title display-2 light--text mb-0"
                v-text="title"
              ></h2>
              <v-spacer></v-spacer>
              <div class="pricing light--text title mr-5 font-weight-black">
                <span class="currency">$</span>
                <span class="price" v-text="price"></span>
                <span class="postfix">/night</span>
              </div>
            </div>
            <div class="d-flex align-center">
              <v-container class="d-flex pa-0">
                <booking-dialog>
                  <!-- mobile -->
                  <v-btn
                    @click="startBooking()"
                    block
                    medium
                    color="primary"
                    dark
                    class="d-sm-none text-capitalize font-weight-bold dark--text"
                  >
                    Book Now
                    <v-icon class="d-none d-sm-inline"
                      >keyboard_arrow_right</v-icon
                    >
                  </v-btn>
                  <!-- desktop -->
                  <v-btn
                    @click="startBooking()"
                    block
                    x-large
                    color="primary"
                    dark
                    class="hidden-xs-only text-capitalize font-weight-black dark--text title"
                  >
                    Book Now
                    <v-icon class="d-none d-sm-inline"
                      >keyboard_arrow_right</v-icon
                    >
                  </v-btn>
                </booking-dialog>
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
    document.removeEventListener('scroll', this.onScrollPage)
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
      this.onScrollPage()
    },
    positionListener() {
      document.addEventListener(
        'scroll',
        this.onScrollPage,
        getPassiveEventConfig()
      )
    },
    onScrollPage(event = null) {
      var scrollPosition = window.pageYOffset
      var windowSize = window.innerHeight
      var bodyHeight = document.body.offsetHeight

      this.bottomDistance = Math.max(
        bodyHeight - (scrollPosition + windowSize),
        0
      )
    },
    startBooking() {
      store.dispatch('booking/startBooking')
    }
  }
}
</script>

<style lang="scss" scoped>
$bar-height-xs: rem(50px);
$bar-height-sm: rem(80px);
.booking-bar {
  z-index: $booking-bar-zindex;
  position: relative;
  opacity: 1;
  transition: opacity $loading-transition-time ease;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  background-color: $dark;
  box-shadow: $box-shadow-sm;
}
.booking-bar,
.wrapper-2 {
  height: $bar-height-xs;
  @include media-breakpoint-up(sm) {
    height: $bar-height-sm;
  }
}
.xs-no-limit {
  @include media-breakpoint-down(xs) {
    max-width: none;
  }
}
</style>
