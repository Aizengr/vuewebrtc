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
      username: null,
      roomID: null,
    };
  },
  getters: {
    optionSelected(state) {
      return state.optionSelected;
    },
    getUsername(state) {
      return state.username;
    },
    getRoomID(state) {
      return state.roomID;
    },
  },
  mutations: {
    setRoomOption(state, option) {
      state.optionSelected = option;
    },
    optionReset(state) {
      state.optionSelected = null;
    },
    setUsername(state, username) {
      state.username = username;
      console.log("store " + state.username);
    },
    setRoomID(state, roomID) {
      state.roomID = roomID;
    },
  },
  actions: {
    setRoomOption(context, option) {
      context.commit("setRoomOption", option);
    },
    optionReset(context) {
      context.commit("optionReset");
    },
    setUsername(context, username) {
      context.commit("setUsername", username);
    },
    setRoomID(context, roomID) {
      context.commit("setRoomID", roomID);
    },
  },
});

app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
