<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

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
  background-size: 110% 110%;
  animation: gradient 50s ease infinite;
  height: 100vh;
  font-weight: 400;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

@keyframes gradient {
  0%,
  75% {
    background-size: 110% 110%;
  }
  50%,
  100% {
    background-size: 100% 100%;
  }
}

.fade-enter-from {
  opacity: 0%;
}
.fade-enter-active {
  transition: all 0.2s ease-in;
}
.fade-leave-from {
  display: none;
}
</style>
