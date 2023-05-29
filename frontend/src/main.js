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
      localStream: null,
      connected: null,
      currAudioTracks: null,
      rtcPeerConnections: new Map(),
      remoteStreams: [],
      roomNotFoundError: false,
      usernameTakenError: false,
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
    getRTCPeerConnections(state) {
      return state.rtcPeerConnections;
    },
    getRemoteStreams(state) {
      return state.remoteStreams;
    },
    hasRemoteUsername(state, remoteUsername) {
      return state.rtcPeerConnections.has(remoteUsername);
    },
    getRTCPeerConnection(state, remoteUsername) {
      return state.rtcPeerConnections.get(remoteUsername);
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
    addRTCPeerConnection(state, username, connection) {
      state.rtcPeerConnections.set(username, connection);
    },
    addRemoteStreams(state, remoteStream) {
      state.remoteStreams.push(remoteStream);
    },
    setRoomNotFoundError(state, status) {
      state.roomNotFoundError = status;
    },
    closeRemoteConnection(state, username) {
      state.rtcPeerConnections.get(username).close();
      state.rtcPeerConnections.delete(username);
    },
    setUsernameTakenError(state, status) {
      state.usernameTakenError = status;
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
    addRTCPeerConnection(context, username, connection) {
      context.commit("addRTCPeerConnection", username, connection);
    },
    addRemoteStreams(context, remoteStream) {
      context.commit("setRemoteStreams", remoteStream);
    },
    setRoomNotFoundError(context, status) {
      context.commit("setRoomNotFoundError", status);
    },
    closeRemoteConnection(context, username) {
      context.commit("closeRemoteConnection", username);
    },
    setUsernameTakenError(context, status) {
      context.commit("setUsernameTakenError", status);
    },
  },
});

app.use(store);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");

export default store;
