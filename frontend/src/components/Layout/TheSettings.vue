<template>
  <div class="wrap">
    <base-card class="settings">
      <div class="settings-flex">
        <div class="select-cam">
          <span>Video source device:</span>
          <select title="cameras" name="cameras" class="btn cameras"></select>
        </div>
        <div class="select-mic">
          <span>Audio-input device:</span>
          <select name="mics" title="mics" class="btn mics"></select>
        </div>
        <div class="select-speakers">
          <span>Audio-output device:</span>
          <select
            name="speakers"
            title="speakers"
            class="btn speakers"
          ></select>
        </div>
        <div>
          <base-button type="button" buttonText="Apply"></base-button>
          <base-button type="button" buttonText="Save"></base-button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../UI/BaseCard.vue";
import BaseButton from "../UI/BaseButton.vue";

export default {
  components: {
    BaseCard,
    BaseButton,
  },
};
</script>

<style scoped>
.wrap {
  position: absolute;
  display: flex;
  z-index: 2;
  padding: 0;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
}

.settings {
  position: relative;
  border: none;
  border-radius: 0.5rem;
  width: 768px;
  height: 432px;
  margin: 0 auto 0 auto;
}

.settings-flex {
  height: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
