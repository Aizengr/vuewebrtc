<template>
  <div class="v-sep">
    <p>Server unavailable! Please try again later.</p>
  </div>
  <base-button
    @click="refreshPage"
    class="centered"
    buttonText="OK"
  ></base-button>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: {
    BaseButton,
  },
  methods: {
    refreshPage() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.v-sep {
  color: white;
  font-size: x-large;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}

p {
  margin: auto;
  padding: 2rem;
}

.centered {
  margin: auto;
  display: flex;
}
</style>
