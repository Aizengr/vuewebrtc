<template>
  <div class="full-page">
    <Transition name="fade">
      <base-card class="centered" v-if="optionSelected === null">
        <initial-selection></initial-selection>
      </base-card>
      <base-card class="centered" v-else-if="optionSelected === 'new'">
        <new-room></new-room>
      </base-card>
      <base-card class="centered" v-else>
        <existing-room></existing-room>
      </base-card>
    </Transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseCard from "../UI/BaseCard.vue";
import InitialSelection from "./InitialSelection.vue";
import NewRoom from "./NewRoom.vue";
import ExistingRoom from "./ExistingRoom.vue";

export default {
  computed: {
    ...mapGetters(["optionSelected"]),
  },
  components: {
    BaseCard,
    InitialSelection,
    NewRoom,
    ExistingRoom,
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
  width: 20%;
  height: 30%;
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
