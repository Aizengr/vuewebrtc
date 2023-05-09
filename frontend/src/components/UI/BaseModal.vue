<template>
  <div class="overlay">
    <dialog ref="modal" class="modal">
      <slot></slot>
    </dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.modal.showModal();
  },
  methods: {
    closeModal() {
      this.$refs.modal.hide();
    },
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  line-height: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 650px;
  background-color: white;
  padding: 6rem;
  border-radius: 5px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
  z-index: 10;
}
</style>
