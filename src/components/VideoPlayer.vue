<template>
  <div
    @click.stop="onClickVideo()"
    :class="{ 'has-inner-shadow': !isStarted}"
    class="video-player mh-inherit position-relative cursor-pointer"
  >
    <transition name="fade">
      <div
        v-if="isErrored || shouldShowPoster"
        class="video-poster position-absolute h-100 w-100"
        :style="{'background-image': `url(${getPosterImage(source, `so_${posterFrameSecond},q_auto:good,w_1920,ar_${heroVideoRatio},c_fill`)})`}"
      >
        <picture>
          <source
            v-for="size in gridBreakpointsArray"
            :key="size"
            :media="`(max-width: ${size}px)`"
            :srcset="getPosterImage(source, `so_${posterFrameSecond},q_auto:good,w_${size},ar_${heroVideoRatio},c_fill`)"
          />
          <img
            class="h-100"
            :src="getPosterImage(source, `so_${posterFrameSecond},q_auto:good,w_1920,ar_${heroVideoRatio},c_fill`)"
            alt="Shinta Mani Wild"
          />
        </picture>
      </div>
    </transition>

    <video
      ref="video"
      class="video-player--video d-block w-100 mh-inherit"
      muted
      playsinline
      @play="onPlay"
      @playing="onPlaying"
      @ended="onEnd"
      @error="onError"
      @waiting="onWaiting"
      v-bind="rest"
    >
      <source :src="transformCloudinaryUrl(source, videoTransformations)" type="video/mp4" />
    </video>

    <transition name="fade-fast">
      <div
        v-if="isPaused"
        :class="{'is-paused': isStarted && !isEnded && isPaused, 'is-ended': isEnded}"
        class="video-player--overlay position-absolute"
      ></div>
    </transition>

    <transition name="fade-fast">
      <div
        v-if="(isWaiting && !isEnded && !isErrored) || !isStarted"
        class="video-player--overlay position-absolute d-flex justify-content-center align-items-center"
      >
        <base-loading-spinner />
      </div>
    </transition>

    <div class="video-player--tools position-absolute">
      <a
        v-if="isStarted && !this.videoElement.controls"
        aria-label="Toggle Sound"
        @click.stop.prevent="toggleMute"
        class="mute-toggle d-block cursor-pointer hover-button-bg ml-2 mb-2"
        :class="{'is-mute': isMute, 'has-sound': !isMute}"
      ></a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import BaseLoadingSpinner from '@./BaseLoadingSpinner.vue'
import BaseLoadingSpinner from './BaseLoadingSpinner.vue'
export default Vue.extend({
  components: { BaseLoadingSpinner },
  data() {
    return {
      videoElement: {},
      isStarted: false,
      isWaiting: false,
      isEnded: false,
      isPaused: false,
      isMute: true,
      shouldShowPoster: false,
      isErrored: false
    }
  },
  mounted() {
    this.videoElement = this.$refs.video
    this.restoreSettings()
    this.updateShowPoster()
  },
  methods: {
    updateShowPoster() {
      const waitForPlayingTimeout = 4000
      setTimeout(() => {
        if (!this.isStarted) {
          this.shouldShowPoster = true
        }
      }, waitForPlayingTimeout)
    },
    restoreSettings() {
      const isMute = localStorage.getItem('video-player-muted')
      if (isMute !== null) {
        this.setSound(JSON.parse(isMute))
      }
    },
    setSound(isMute) {
      this.isMute = isMute
      this.videoElement.muted = isMute
      localStorage.setItem('video-player-muted', String(isMute))
    },
    toggleMute() {
      this.setSound(!this.isMute)
    },
    onClickVideo() {
      if (this.isEnded) {
        this.replay()
      } else {
        this.togglePlay()
      }
      this.isPaused = this.videoElement.paused
    },
    replay() {
      this.isEnded = false
      this.videoElement.currentTime = 0
      this.videoElement.play()
    },
    togglePlay() {
      if (this.videoElement.paused) {
        this.videoElement.play()
      } else {
        this.videoElement.pause()
      }
    },
    onPlay() {
      this.isEnded = false
    },
    onPlaying() {
      this.$emit('videoplayer-played')
      this.isErrored = false
      this.shouldShowPoster = false
      this.isWaiting = false
      this.isStarted = true
    },
    onWaiting($event, index) {
      this.isWaiting = true
    },
    onEnd() {
      this.isEnded = true
      this.isPaused = this.videoElement.paused
      this.shouldShowPoster = true
    },
    onError() {
      this.isErrored = true
    }
  },
  props: {
    source: {
      type: String
    },
    rest: {
      default: {},
      type: Object
    },
    posterFrameSecond: {
      default: 0,
      type: Number
    },
    videoTransformations: {
      default: 'q_auto',
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
.video-player {
  background-color: #000;
}
.video-player--video:focus {
  outline: none;
}
.video-poster {
  // @include stick-around;

  // older browsers
  background: no-repeat center;
  background-size: cover;
  img {
    display: none;
  }

  // modern browsers
  @supports (object-fit: cover) {
    background: none !important;
    img {
      display: block;
      object-fit: cover;
      width: 100%;
    }
  }
}
.video-player--overlay {
  &.is-paused {
    background-image: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570978871/Shinta%20Mani%20Wild/general/play_aphyj3.svg');
  }
  &.is-ended {
    background-image: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570978871/Shinta%20Mani%20Wild/general/play_aphyj3.svg');
  }
  background: center no-repeat rgba(#000, 0.2);
  background-size: rem(48px);
  // @include stick-around;
  // @include media-breakpoint-up(md) {
  //   background-size: rem(96px);
  // }
}
.video-player--tools {
  height: rem(56px);
  bottom: 0;
}
.mute-toggle {
  width: rem(48px);
  height: rem(48px);
  &.is-mute {
    background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570887492/Shinta%20Mani%20Wild/general/sound-muted_sxxwst.svg')
      no-repeat center;
  }
  &.has-sound {
    background: url('https://res.cloudinary.com/ddwsbpkzk/image/upload/v1570887492/Shinta%20Mani%20Wild/general/sound-enabled_dwwxaq.svg')
      no-repeat center;
  }
}
.hover-button-bg {
  &:hover {
    background-color: rgba(#000, 0.4);
    border-radius: rem(100px);
    transition: all 200ms ease;
  }
}
</style>