import { createApp } from "vue";
import { createStore } from "vuex";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faXmark);

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
    optionReset(state) {
      state.optionSelected = null;
    },
  },
  actions: {
    setRoomOption(context, option) {
      context.commit("setRoomOption", option);
    },
    optionReset(context) {
      context.commit("optionReset");
    },
  },
});

app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
