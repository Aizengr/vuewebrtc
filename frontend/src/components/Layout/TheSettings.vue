<template>
  <div class="wrap">
    <base-card class="settings">
      <div class="settings-flex">
        <div class="select-cam">
          <span>Video source device: </span>
          <select
            v-model="selectedVideo"
            title="cameras"
            name="cameras"
            class="btn cameras"
          >
            <option v-for="item in availableVideoDevices" :key="item.deviceId">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="select-mic">
          <span>Audio-input device: </span>
          <select
            v-model="selectedInput"
            name="mics"
            title="mics"
            class="btn mics"
          >
            <option
              v-for="item in availableInputDevices"
              :value="item.label"
              :key="item.deviceId"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="select-speakers">
          <span>Audio-output device: </span>
          <select
            v-model="selectedOutput"
            name="speakers"
            title="speakers"
            class="btn speakers"
          >
            <option
              selected
              v-for="item in availableOutputDevices"
              :key="item.deviceId"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <div>
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
            console.log(device);
            if (device.kind === "audioinput") {
              this.availableInputDevices.push(device);
            } else if (device.kind === "videoinput") {
              this.availableVideoDevices.push(device);
            } else this.availableOutputDevices.push(device);
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
  z-index: 2;
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
  gap: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

option {
  max-width: 30%;
}
</style>
