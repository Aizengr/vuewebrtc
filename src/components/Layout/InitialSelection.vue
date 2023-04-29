<template>
  <div class="v-sep">
    <p class="flex-item border">New Room</p>
    <p class="flex-item">Existing Room</p>
  </div>
</template>

<style scoped>
.v-sep {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.flex-item {
  margin: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  place-items: center;
  justify-content: center;
}

.border {
  border-bottom: 1px solid black;
}
</style>
