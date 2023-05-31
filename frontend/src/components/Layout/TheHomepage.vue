<template>
  <div class="full-page">
    <Transition name="fade">
      <base-card class="centered" v-if="optionSelected === null">
        <initial-selection></initial-selection>
      </base-card>
      <base-card class="centered" v-else-if="optionSelected === 'new'">
        <new-room></new-room>
      </base-card>
      <base-card class="centered" v-else-if="optionSelected === 'existing'">
        <existing-room></existing-room>
      </base-card>
      <base-card v-else class="centered"><server-down></server-down></base-card>
    </Transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseCard from "../UI/BaseCard.vue";
import InitialSelection from "./InitialSelection.vue";
import NewRoom from "./NewRoom.vue";
import ExistingRoom from "./ExistingRoom.vue";
import ServerDown from "./ServerDown.vue";

export default {
  computed: {
    ...mapGetters(["optionSelected"]),
    socketConnected() {
      return this.$store.state.socketConnected;
    },
  },
  watch: {
    socketConnected: {
      handler(newValue) {
        console.log(newValue);
        if (!newValue) {
          this.$store.dispatch("setRoomOption", "none");
        }
      },
    },
  },
  components: {
    BaseCard,
    InitialSelection,
    NewRoom,
    ExistingRoom,
    ServerDown,
  },
};
</script>

<style scoped>
.full-page {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.centered {
  justify-self: center;
  place-self: center;
  width: 330px;
  height: 300px;
  margin: auto;
}

.fade-enter-from {
  opacity: 0%;
  transform: translateY(-10px);
}
.fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.fade-leave-from {
  display: none;
}
</style>
