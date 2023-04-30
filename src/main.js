import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";

const app = createApp(App);
const store = createStore({
  state() {
    return {
      optionSelected: null,
    };
  },
  getters: {
    optionSelected(state) {
      return state.optionSelected;
    },
  },
  mutations: {
    setRoomOption(state, option) {
      state.optionSelected = option;
    },
  },
  actions: {
    setRoomOption(context, option) {
      context.commit("setRoomOption", option);
    },
  },
});

app.use(store);

app.mount("#app");
