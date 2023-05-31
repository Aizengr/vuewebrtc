<template>
  <button type="button">{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    buttonText: String,
  },
};
</script>

<style scoped>
button {
  border: 0.1px solid rgba(255, 255, 255, 0.36);
  border-radius: 2rem;
  color: #fff;
  background: none;
  font-family: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s;
  background-color: #161616;
  backdrop-filter: blur(10px);
  padding: 0.3rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 5rem 35rem rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(15%);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
}

button:focus {
  outline: none;
}

button:hover {
  background-color: var(--main-btn-hover-color);
}
</style>
