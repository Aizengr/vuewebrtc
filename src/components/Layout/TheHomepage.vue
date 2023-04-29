<template>
  <div class="full-page">
    <base-card class="centered">
      <initial-selection></initial-selection>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../UI/BaseCard.vue";
import InitialSelection from "./InitialSelection.vue";
export default {
  components: {
    BaseCard,
    InitialSelection,
  },
};
</script>

<style scoped>
.full-page {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
}

.centered {
  justify-self: center;
  place-self: center;
}
</style>
