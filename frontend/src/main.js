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

// state = reactive({
//   connected: false,
//   localStream: null,
//   currAudioTrack: null,
//   isScreenSharing: false,
//   rtcPeerConnections: new Map(),
//   roomID: null,
//   remoteStreams: [],
//   messages: [],
//   roomNotFoundError: false,
//   usernameTakenError: false,
// });

const app = createApp(App);
const store = createStore({
  state() {
    return {
      optionSelected: null,
      username: null,
      roomID: null,
      localStream: null,
      connected: null,
      currAudioTracks: null,
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
    getLocalStream(state) {
      return state.localStream;
    },
    isConnected(state) {
      return state.connected;
    },
    getCurrentAudioTracks(state) {
      return state.currAudioTracks;
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
    setLocalStream(state, localstream) {
      state.localStream = localstream;
    },
    setConnectedStatus(state, status) {
      state.connected = status;
    },
    setCurrentAudioTracks(state, audioTracks) {
      state.audioTracks = audioTracks;
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
    setLocalStream(context, localstream) {
      context.commit("setLocalStream", localstream);
    },
    setConnectedStatus(context, status) {
      context.commit("setConnectedStatus", status);
    },
    setCurrentAudioTracks(context, audioTracks) {
      context.commit("setCurrentAudioTracks", audioTracks);
    },
  },
});

app.use(store);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");

export default store;
