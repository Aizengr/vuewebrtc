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
html,
body {
  margin: 0px !important;
  padding: 0px !important;
  background: linear-gradient(to top, #353434, #1e1d1d, #000000);
}
</style>
