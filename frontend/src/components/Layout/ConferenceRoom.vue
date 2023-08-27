<template>
  <div class="room-grid">
    <base-card class="top-bar">
      <div class="roomButtons">
        <base-button
          class="button-small"
          :buttonText="buttonText"
          @click="copyRoomIDtoClipboard"
          ref="copyIDbutton"
        ></base-button>
        <base-button buttonText="Disconnect" @click="disconnect"></base-button>
      </div>
      <div class="setting-icons">
        <font-awesome-icon
          :icon="['fas', 'display']"
          ref="shareScreen"
          @click="shareScreen"
        />
        <font-awesome-icon
          :icon="['fas', 'video-slash']"
          ref="videoMute"
          @click="toggleVideoMute"
        />
        <font-awesome-icon
          :icon="['fas', 'microphone-slash']"
          ref="micMute"
          @click="toggleAudioMute"
        />
        <font-awesome-icon
          :icon="['fas', 'gear']"
          ref="settings"
          @click="toggleSettings"
        />
      </div>
    </base-card>
    <base-card class="video-area">
      <Transition name="settings">
        <the-settings
          @closeSettings="closeSettingsEmit"
          v-if="settingsOpen"
        ></the-settings>
      </Transition>
      <video-section></video-section
    ></base-card>
    <base-card class="chat hidden">Chat</base-card>
  </div>
</template>

<script>
import BaseCard from "../UI/BaseCard.vue";
import BaseButton from "../UI/BaseButton.vue";
import VideoSection from "../Layout/VideoSection.vue";
import TheSettings from "./TheSettings.vue";

export default {
  data() {
    return {
      buttonText: "Copy RoomID",
      settingsOpen: false,
      screenShare: false,
      audioMuted: false,
      videoMuted: false,
    };
  },
  components: {
    BaseCard,
    BaseButton,
    VideoSection,
    TheSettings,
  },
  computed: {
    roomID() {
      return this.$store.getters.getRoomID;
    },
    localStream() {
      return this.$store.getters.getLocalStream;
    },
    isLocalStreamAudioEnabled() {
      return this.$store.state.isLocalStreamAudioEnabled;
    },
    isLocalStreamVideoEnabled() {
      return this.$store.state.isLocalStreamVideoEnabled;
    },
    shareScreenButton() {
      return this.$refs.shareScreen.$el;
    },
    muteAudioButton() {
      return this.$refs.micMute.$el;
    },
    muteVideoButton() {
      return this.$refs.videoMute.$el;
    },
    settingsButton() {
      return this.$refs.settings.$el;
    },
  },
  methods: {
    copyRoomIDtoClipboard() {
      this.$refs.copyIDbutton.disabled = true;
      navigator.clipboard.writeText(this.roomID);
      this.buttonText = "Copied☑️";
      this.resetCopyButton();
    },
    resetCopyButton() {
      setTimeout(() => {
        if (this.$refs.copyIDbutton) {
          this.buttonText = "Copy RoomID";
          this.$refs.copyIDbutton.disabled = false;
        }
      }, 1200);
    },
    toggleSettings() {
      this.settingsOpen = this.settingsOpen ? false : true;
      this.settingsButton.classList.toggle("font-icon-active");
    },
    closeSettingsEmit() {
      this.settingsOpen = false;
    },
    shareScreen() {},
    toggleVideoMute() {
      this.isLocalStreamVideoEnabled
        ? this.$store.dispatch("setLocalStreamVideo", false)
        : this.$store.dispatch("setLocalStreamVideo", true);
      this.muteVideoButton.classList.toggle("font-icon-active");
    },
    toggleAudioMute() {
      this.isLocalStreamAudioEnabled
        ? this.$store.dispatch("setLocalStreamAudio", false)
        : this.$store.dispatch("setLocalStreamAudio", true);
      this.muteAudioButton.classList.toggle("font-icon-active");
    },
    disconnect() {
      location.reload("/");
    },
  },
};
</script>

<style scoped>
* {
  font-family: inherit;
  color: white;
  margin: 0;
}

h2 {
  padding-top: 1rem;
}
.top-bar {
  grid-area: topbar;
  display: flex;
  justify-content: space-between;
  place-items: center;
}

.button-small {
  padding: 0.3rem;
  margin: 1rem;
}

.setting-icons {
  font-size: 1.8rem;
  display: flex;
  gap: 1rem;
  margin-right: 1rem;
}

.font-icon-active {
  color: var(--main-btn-hover-color);
  cursor: pointer;
}

.video-area {
  grid-area: video;
  overflow: hidden;
}

.chat {
  grid-area: chat;
}
.room-grid {
  display: grid;
  grid-template-columns: 5fr auto;
  gap: 0.2rem;
  grid-template-areas:
    "topbar chat"
    "video chat";
}

.settings-enter-from {
  opacity: 0%;
  transform: translateY(-100%);
}
.settings-enter-active {
  transition: all 0.2s ease-in-out;
}

.settings-leave-active {
  transition: all 0.2s ease-in-out;
}
.settings-leave-to {
  opacity: 0%;
  transform: translateY(-100%);
}
.hidden {
  display: none;
}
</style>
