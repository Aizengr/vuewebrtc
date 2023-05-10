<template>
  <div class="video-section">
    <video class="main-video"></video>
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

<script></script>

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
