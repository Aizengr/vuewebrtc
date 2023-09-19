<template>
  <div class="wrap">
    <base-card class="settings">
      <div class="settings-flex">
        <div class="selection">
          <span>Video-source device: </span>
          <select v-model="selectedVideo" title="cameras" name="cameras">
            <option v-for="item in availableVideoDevices" :key="item.deviceId">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="selection">
          <span>Audio-input device: </span>
          <select v-model="selectedInput" name="mics" title="mics">
            <option
              v-for="item in availableInputDevices"
              :value="item.label"
              :key="item.deviceId"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="selection">
          <span>Audio-output device: </span>
          <select v-model="selectedOutput" name="speakers" title="speakers">
            <option
              selected
              v-for="item in availableOutputDevices"
              :key="item.deviceId"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="button-area">
          <base-button
            type="button"
            buttonText="Apply"
            @click="applySettings"
          ></base-button>
          <base-button
            type="button"
            buttonText="Save"
            @click="saveSettings"
          ></base-button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../UI/BaseCard.vue";
import BaseButton from "../UI/BaseButton.vue";

export default {
  components: {
    BaseCard,
    BaseButton,
  },
  emits: ["closeSettings"],
  beforeMount() {
    this.getDevices();
  },
  data() {
    return {
      availableInputDevices: [],
      availableVideoDevices: [],
      availableOutputDevices: [],
      selectedInput: null,
      selectedVideo: null,
      selectedOutput: null,
      inputDevice: null,
      videoDevice: null,
      outputDevice: null,
    };
  },
  computed: {
    activeInputDevice() {
      return this.$store.getters.getActiveInputDevice;
    },
    activeVideoDevice() {
      return this.$store.getters.getActiveVideoDevice;
    },
    activeOutputDevice() {
      return this.$store.getters.getActiveOutputDevice;
    },
  },
  methods: {
    getDevices() {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            if (device.kind === "audioinput") {
              if (this.activeInputDevice) {
                this.selectedInput = this.activeInputDevice.label;
              } else if (!this.selectedInput) {
                this.selectedInput = device.label;
              }
              this.availableInputDevices.push(device);
            } else if (device.kind === "videoinput") {
              if (this.activeVideoDevice) {
                this.selectedVideo = this.activeVideoDevice.label;
              } else if (!this.selectedVideo) {
                this.selectedVideo = device.label;
              }
              this.availableVideoDevices.push(device);
            } else {
              if (this.activeOutputDevice) {
                this.selectedOutput = this.activeOutputDevice.label;
              } else if (!this.selectedOutput) {
                this.selectedOutput = device.label;
              }
              this.availableOutputDevices.push(device);
            }
          });
        })
        .catch((err) => console.log(err));
    },
    applySettings() {
      this.inputDevice = this.availableInputDevices.find(
        (device) => device.label === this.selectedInput
      );
      this.videoDevice = this.availableVideoDevices.find(
        (device) => device.label === this.selectedVideo
      );
      this.outputDevice = this.availableOutputDevices.find(
        (device) => device.label === this.selectedOutput
      );

      this.$store.dispatch("setActiveInputDevice", this.inputDevice);
      this.$store.dispatch("setActiveVideoDevice", this.videoDevice);
      this.$store.dispatch("setActiveOutputDevice", this.outputDevice);

      this.changeInputDevices();
    },
    changeInputDevices() {
      const newConstraints = {
        audio: {
          deviceId: {
            exact: this.inputDevice.deviceId,
          },
        },
        video: {
          deviceId: {
            exact: this.videoDevice.deviceId,
          },
        },
      };

      navigator.mediaDevices
        .getUserMedia(newConstraints)
        .then((stream) => {
          this.$store.dispatch("updateStreamOnDeviceChange", stream);
        })
        .catch((err) => {
          console.log("An error occured when accessing media devices " + err);
        });
    },
    // findActiveDevice(type) {},
    saveSettings() {
      this.applySettings();
      this.$emit("closeSettings");
    },
  },
};
</script>

<style scoped>
.wrap {
  position: absolute;
  display: flex;
  z-index: 10;
  padding: 0;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
}

.settings {
  position: relative;
  border: none;
  border-radius: 0.5rem;
  width: 768px;
  height: 432px;
  margin: 0 auto 0 auto;
}

.settings-flex {
  height: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.selection {
  width: 80%;
}

select {
  max-width: 80%;
  border: 0.1px solid rgba(255, 255, 255, 0.36);
  border-radius: 2rem;
  color: #fff;
  background: none;
  font-family: inherit;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s;
  font-size: 0.9rem;
  background-color: #161616;
  padding: 0.2rem;
  border-radius: 0.3rem;
  box-shadow: 0 5rem 35rem rgba(0, 0, 0, 0.1);
}

select:active {
  transform: translateY(5%);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
}

select:focus {
  outline: none;
}

select:hover {
  background-color: var(--main-btn-hover-color);
}

.button-area {
  display: flex;
  gap: 1rem;
}
</style>
