<template>
  <form class="form-flex">
    <label for="username" class="form-flex-item">Username:</label>
    <input type="text" class="form-flex-item" />
    <base-button class="form-flex-item" button-text="Create"></base-button>
  </form>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";

export default {
  components: {
    BaseButton,
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
  margin-bottom: -2em;
}

input {
  border-radius: 2rem;
  width: 70%;
  background-color: var(--main-btn-bg-color);
  color: white;
  text-align: center;
}

input:focus {
  background-color: var(--main-btn-hover-color);
}
.form-flex {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  place-items: center;
  justify-content: space-evenly;
}
</style>
