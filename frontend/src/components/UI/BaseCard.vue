<template>
  <div class="glass">
    <slot></slot>
  </div>
</template>

<style scoped>
.glass {
  background: rgba(11, 2, 2, 0.11);
  box-shadow: 0 0px 50px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  border: 1px solid rgba(255, 255, 255, 0.36);
  border-radius: 2rem;
}
</style>
