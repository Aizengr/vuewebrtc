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
  color: white;
  border-radius: 1rem;
  font-size: x-large;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  /* From https://css.glass */
  background: rgba(11, 2, 2, 0.11);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.4px);
  -webkit-backdrop-filter: blur(5.4px);
  border: 1px solid rgba(255, 255, 255, 0.36);
}

.flex-item {
  margin: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  place-items: center;
  justify-content: center;
}

.flex-item:hover {
  background-color: rgb(99, 99, 99);
  border-radius: 1rem;
  color: black;
}

.border {
  border-bottom: 1px solid rgba(255, 255, 255, 0.36);
}
</style>
