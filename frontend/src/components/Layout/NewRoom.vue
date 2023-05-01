<template>
  <form class="form-flex">
    <label for="username" class="form-flex-item">Username:</label>
    <input type="text" class="form-flex-item" />
    <div class="form-flex-item button-flex">
      <base-button button-text="Create"></base-button>
      <base-button @click="optionReset" button-text="Cancel"></base-button>
    </div>
  </form>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import { mapActions } from "vuex";

export default {
  components: {
    BaseButton,
  },
  methods: {
    ...mapActions(["optionReset"]),
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
  width: 60%;
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

.button-flex {
  width: 60%;
  display: flex;
  justify-content: space-evenly;
}
</style>
