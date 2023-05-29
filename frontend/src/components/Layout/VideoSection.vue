<template>
  <div class="video-section">
    <video autoplay="true" class="main-video" ref="mainVideo"></video>
    <div class="video-flex">
      <video class="sec-video"></video>
      <video class="sec-video"></video>
      <video class="sec-video"></video>
      <video class="sec-video"></video>
      <video class="sec-video"></video>
      <video class="sec-video"></video>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.mainVideo.srcObject = this.$store.getters.getLocalStream;
  },
};
</script>

<style scoped?>
video {
  border: 1px solid red;
  border-radius: 0.5rem;
}

.video-section {
  overflow: hidden;
}

.video-flex {
  display: flex;
  width: calc(100vw - 3rem);
  gap: 1.5rem;
  padding: 1rem;
}

video.main-video {
  display: flex;
  width: 768px;
  height: 432px;
  margin: 1rem auto 1rem auto;
}

video.sec-video {
  width: 384px;
  height: 216px;
}
</style>
