<template>
  <div class="v-sep">
    <p @click="selectRoom('new')" class="flex-item clr-change border">
      Create room
    </p>
    <p @click="selectRoom('existing')" class="flex-item rev-clr-change">
      Join room
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    selectRoom(option) {
      this.$store.dispatch("setRoomOption", option);
    },
  },
};
</script>

<style scoped>
.v-sep {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  border-radius: 2rem;
  font-size: x-large;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}

.flex-item {
  margin: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  place-items: center;
  justify-content: center;
  transition: all 1s forwards;
}

.clr-change:hover {
  background-color: rgb(37, 2, 14);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  cursor: pointer;
}

.rev-clr-change:hover {
  background-color: rgb(37, 2, 14);
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  cursor: pointer;
}

.border {
  border-bottom: 1px solid rgba(255, 255, 255, 0.36);
}
</style>
