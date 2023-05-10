<template>
  <div class="room-grid">
    <base-card class="top-bar">
      <div class="roomIDText">
        <h2>RoomID: {{ this.$route.params.id }}</h2>
        <base-button class="button-small" buttonText="Copy"></base-button>
      </div>
      <div class="setting-icons">
        <font-awesome-icon :icon="['fas', 'display']" class="font-icon" />
        <font-awesome-icon :icon="['fas', 'video-slash']" class="font-icon" />
        <font-awesome-icon
          :icon="['fas', 'microphone-slash']"
          class="font-icon"
        />
        <font-awesome-icon :icon="['fas', 'gear']" class="font-icon" />
      </div>
    </base-card>
    <base-card class="video-area">Video Section</base-card>
    <base-card class="chat hidden">Chat</base-card>
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

.roomIDText {
  display: flex;
  margin-left: 1rem;
  justify-content: center;
}

.button-small {
  padding: 0.3rem;
  margin: 1rem;
}

.setting-icons {
  color: white;
  font-size: 1.8rem;
  display: flex;
  gap: 1rem;
  margin-right: 1rem;
}

.font-icon:hover {
  color: var(--main-btn-hover-color);
  cursor: pointer;
}

.video-area {
  grid-area: video;
}

.chat {
  grid-area: chat;
}
.room-grid {
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 0.5rem;
  grid-template-areas:
    "topbar chat"
    "video chat";
}
</style>
