<template>
  <the-homepage class="init-background"></the-homepage>
</template>

<script>
import TheHomepage from "./components/Layout/TheHomepage.vue";
export default {
  name: "App",
  components: {
    TheHomepage,
  },
};
</script>

<style>
:root {
  --main-btn-bg-color: #161616;
  --main-btn-hover-color: rgb(82, 7, 33);
}

html,
body {
  margin: 0px !important;
  padding: 0px !important;
  background: url(./assets/background.jpg);
  /* background: linear-gradient(180deg, #0e0d0d, #312d2f, #615c5c, #2e0412); */
  background-size: 120% 120%;
  animation: gradient 30s ease infinite;
  height: 100vh;
  font-weight: 400;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
