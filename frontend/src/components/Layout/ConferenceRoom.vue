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
          @click="toggleChat"
          class="centered"
          ref="chatButton"
          :icon="['fas', 'message']"
        />
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
    <base-card v-if="chatOnScreen" class="chat"
      ><the-chat></the-chat>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../UI/BaseCard.vue";
import BaseButton from "../UI/BaseButton.vue";
import VideoSection from "../Layout/VideoSection.vue";
import TheSettings from "./TheSettings.vue";
import TheChat from "./TheChat.vue";

export default {
  data() {
    return {
      buttonText: "Copy RoomID",
      settingsOpen: false,
      screenShare: false,
      audioMuted: false,
      videoMuted: false,
      chatOnScreen: false,
    };
  },
  components: {
    BaseCard,
    BaseButton,
    VideoSection,
    TheSettings,
    TheChat,
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
    isScreenSharing() {
      return this.$store.state.isShareScreenEnabled;
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
    toggleChat() {
      this.chatOnScreen = !this.chatOnScreen;
      this.$refs.chatButton.$el.classList.toggle("font-icon-active");
    },
    shareScreen() {
      if (!this.isScreenSharing) {
        const sharescreenConstraints = {
          video: {
            cursor: "always",
          },
          audio: false,
        };

        navigator.mediaDevices
          .getDisplayMedia(sharescreenConstraints)
          .then((stream) => {
            this.$store.dispatch("updateStreamOnScreenShare", stream);
          })
          .catch((err) => {
            console.log("An error occured when accessing media devices " + err);
          });
      } else {
        this.$store.dispatch("resetStreamAfterShareScreen");
      }
      this.shareScreenButton.classList.toggle("font-icon-active");
    },
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
  cursor: pointer;
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
  width: 12vw;
}
.room-grid {
  display: grid;
  height: 99vh;
  padding: 0.2rem;
  grid-template-columns: 5fr auto;
  grid-template-rows: 7% 93%;
  gap: 0.2rem;
  grid-template-areas:
    "topbar topbar"
    "video chat";
}

.settings-enter-from {
  opacity: 0%;
  transform: translateY(-100%);
}
.settings-enter-active {
  transition: all 0.4s ease-in-out;
}

.settings-leave-active {
  transition: all 0.4s ease-in-out;
}
.settings-leave-to {
  opacity: 0%;
  transform: translateY(-100%);
}
.hidden {
  display: none;
}
</style>
