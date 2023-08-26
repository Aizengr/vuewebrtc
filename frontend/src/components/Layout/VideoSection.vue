<template>
  <div class="video-section">
    <div class="top-padding">
      <the-video
        muted
        :videoClass="'main-video'"
        :username="myUsername"
        ref="mainVideo"
        :stream="localStream"
      ></the-video>
    </div>
    <div class="video-flex">
      <the-video
        v-for="streamObject in remoteStreams"
        :key="streamObject.username"
        :videoClass="'sec-video'"
        :stream="streamObject.stream"
        :username="streamObject.username"
      ></the-video>
    </div>
  </div>
</template>

<script>
import TheVideo from "./TheVideo.vue";

export default {
  components: {
    TheVideo,
  },
  computed: {
    localStream() {
      return this.$store.state.localStream;
    },
    remoteStreams() {
      return this.$store.state.remoteStreams;
    },
    myUsername() {
      return this.$store.state.username;
    },
  },
};
</script>

<style scoped?>
.video-section {
  overflow: hidden;
}

.video-flex {
  display: flex;
  width: calc(100vw - 3rem);
  gap: 1.5rem;
  padding: 1rem;
}

.top-padding {
  padding-top: 1rem;
}
</style>
