<template>
  <div :class="videoClass">
    <div class="videoSettings">
      <div class="settingsIcons">
        <font-awesome-icon
          @click="setVideoToFullScreen"
          :icon="['fas', 'expand']"
        />
      </div>
    </div>
    <p>{{ username }}</p>
    <video
      autoplay="true"
      :class="videoClass"
      ref="currentVideo"
      :srcObject="stream"
    ></video>
  </div>
</template>

<script>
export default {
  props: ["username", "stream", "videoClass"],
  methods: {
    setVideoToFullScreen() {
      this.$refs.currentVideo
        .requestFullscreen({ navigationUI: "show" })
        .catch((err) => {
          alert(
            `An error occurred while trying to switch into fullscreen mode: ${err.message} (${err.name})`
          );
        });
    },
  },
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
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  width: 100%;
  margin: 0;
  z-index: 1;
  text-align: center;
  padding: 0;
  background: rgba(201, 195, 195, 0.11);
  box-shadow: 0 0px 50px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
}

.videoSettings {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: end;
  left: -0.2rem;
  top: 0.05rem;
  opacity: 0;
  transition: opacity ease-in 0.5s;
}

.videoSettings:hover {
  opacity: 100;
}

.settingsIcons {
  cursor: pointer;
  transition: font-size 0.1s;
}

.settingsIcons:hover {
  font-size: 1.5rem;
}

.videoSettings {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
}

video {
  position: relative;
  object-fit: fill;
  border-radius: 0.5rem;
  box-shadow: 1.5px 1.5px 5px rgba(0, 0, 0, 0.7);
}
</style>
