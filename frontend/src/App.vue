<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
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
  height: 100vh;
  background: linear-gradient(
    180deg,
    #181818,
    #131313,
    #000000,
    rgb(22, 2, 9),
    rgb(41, 4, 17)
  );
  animation: gradient 15s ease infinite;
  font-weight: 400;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
