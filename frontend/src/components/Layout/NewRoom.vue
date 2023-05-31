<template>
  <form @submit.prevent="createRoom" class="form-flex">
    <label for="username" class="form-flex-item">Username:</label>
    <input
      type="text"
      id="username"
      v-model.trim.lazy="username"
      class="form-flex-item"
    />
    <div class="form-flex-item button-flex">
      <base-button type="submit" button-text="Create"></base-button>
      <base-button @click="optionReset" button-text="Cancel"></base-button>
    </div>
  </form>
  <Transition name="error-fade">
    <p v-if="inputError != null" class="input-error">{{ inputError }}</p>
  </Transition>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import { mapActions } from "vuex";
// import { state } from "../../socket";
import socketService from "../../socket";

export default {
  data() {
    return {
      username: "",
      inputError: null,
    };
  },
  emits: ["serverDown"],
  components: {
    BaseButton,
  },
  computed: {
    roomCreated() {
      return this.$store.state.connected && this.$store.state.localStream;
    },
  },
  watch: {
    roomCreated: {
      handler(newValue) {
        if (newValue) {
          this.$router.push({
            name: "room",
          });
        }
      },
    },
  },
  methods: {
    ...mapActions(["optionReset"]),
    createRoom() {
      if (this.validateInput()) {
        socketService.setupSocketConnection();
        socketService.createRoom(this.username);
      }
    },
    validateInput() {
      const regex = /^[a-zA-Z0-9_]{4,16}$/;
      if (this.username.length > 0 && regex.test(this.username)) {
        this.inputError = null;
        return true;
      }
      this.inputError = "Invalid username!";
      return false;
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
  /* margin-bottom: -1em; */
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
