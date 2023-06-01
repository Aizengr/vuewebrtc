<template>
  <div :class="videoClass">
    <p>{{ username }}</p>
    <video autoplay="true" :class="videoClass" :srcObject="stream"></video>
  </div>
</template>

<script>
export default {
  props: ["username", "stream", "videoClass"],
};
</script>

<style scoped>
.main-video {
  padding: 0;
  position: relative;
  width: 768px;
  height: 432px;
  margin: 0 auto 0 auto;
}

.sec-video {
  position: relative;
  width: 384px;
  height: 216px;
}
video.main-video {
  width: inherit;
  height: inherit;
}

p {
  position: absolute;
  /* top: 15px; */
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  width: 100%;
  margin: 0;
  z-index: 10;
  text-align: center;
  padding: 0;
  background: rgba(201, 195, 195, 0.11);
  box-shadow: 0 0px 50px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
}

video {
  position: relative;
  object-fit: fill;
  border-radius: 0.5rem;
  box-shadow: 1.5px 1.5px 5px rgba(0, 0, 0, 0.7);
}
</style>
