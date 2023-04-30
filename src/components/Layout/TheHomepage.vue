<template>
  <div class="full-page">
    <base-card v-if="optionSelected === null" class="centered">
      <initial-selection></initial-selection>
    </base-card>
    <base-card v-if="optionSelected === 'new'">
      <new-room></new-room>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseCard from "../UI/BaseCard.vue";
import InitialSelection from "./InitialSelection.vue";
import NewRoom from "./NewRoom.vue";

export default {
  computed: {
    ...mapGetters(["optionSelected"]),
  },
  components: {
    BaseCard,
    InitialSelection,
    NewRoom,
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
}
</style>
