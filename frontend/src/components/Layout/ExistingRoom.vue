<template>
  <form @submit.prevent="joinRoom" class="form-flex">
    <label for="username" class="form-flex-item">Username:</label>
    <input
      type="text"
      id="username"
      v-model.trim.lazy="username"
      class="form-flex-item"
    />
    <label for="roomID" class="form-flex-item">RoomID:</label>
    <input
      type="text"
      id="roomID"
      v-model.trim.lazy="roomID"
      class="form-flex-item"
    />
    <div class="form-flex-item button-flex">
      <base-button type="submit" button-text="Join"></base-button>
      <base-button @click="optionReset" button-text="Cancel"></base-button>
    </div>
  </form>
  <Transition name="error-fade">
    <div v-if="inputError != null" class="input-error">{{ inputError }}</div>
  </Transition>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import { mapActions } from "vuex";
import socketService from "./../../socket";

export default {
  data() {
    return {
      username: "",
      roomID: "",
      inputError: null,
      roomNotFound: true,
    };
  },
  computed: {
    joinedRoom() {
      return this.$store.state.connected && this.$store.state.localStream;
    },
  },
  watch: {
    joinedRoom: {
      handler(newValue) {
        if (newValue) {
          this.$router.push({
            name: "room",
          });
        }
      },
    },
  },
  components: {
    BaseButton,
  },
  methods: {
    ...mapActions(["optionReset"]),
    joinRoom() {
      if (this.validateInput()) {
        socketService.setupSocketConnection();
        socketService.joinRoom(this.username, this.roomID);
      }
    },
    validateInput() {
      const regexUsername = /^[a-zA-Z0-9_]{4,16}$/;
      const regexRoomID =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
      if (!(this.username.length > 0) || !regexUsername.test(this.username)) {
        this.inputError = "Invalid username!";
        return false;
      } else if (!(this.roomID.length > 0) || !regexRoomID.test(this.roomID)) {
        this.inputError = "Invalid Room ID!";
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
* {
  font-family: inherit;
  font-size: inherit;
}

label {
  color: white;
  font-size: large;
  margin-bottom: -1em;
}

input {
  border-radius: 2rem;
  width: 60%;
  background-color: var(--main-btn-bg-color);
  color: white;
  text-align: center;
}

input:focus {
  background-color: var(--main-btn-hover-color);
}
.input-error {
  padding-top: 1rem;
  color: red;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s ease-in;
}
.form-flex {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  place-items: center;
  justify-content: space-evenly;
}
.button-flex {
  width: 60%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  column-gap: 1rem;
  row-gap: 1rem;
}

.error-fade-enter-from {
  opacity: 0%;
  transform: translateY(-10px);
}

.error-leave-from {
  display: none;
}
</style>
