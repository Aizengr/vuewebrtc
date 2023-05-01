<template>
  <div class="wrapper glass">
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  width: 20%;
  height: 30%;
  border-radius: 2rem;
  margin: auto;
}

.glass {
  background: rgba(11, 2, 2, 0.11);
  box-shadow: 0 0px 50px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  border: 1px solid rgba(255, 255, 255, 0.36);
}
</style>
