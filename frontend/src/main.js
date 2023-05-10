import { createApp } from "vue";
import { createStore } from "vuex";
import router from "./router.js";

import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faDisplay, faVideoSlash, faMicrophoneSlash, faGear);

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
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");

export default store;
