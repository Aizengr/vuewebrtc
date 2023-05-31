/* eslint-disable no-unused-vars */
import { createApp } from "vue";
import { createStore } from "vuex";
import router from "./router.js";
import adapter from "webrtc-adapter";

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
      socketConnected: null,
      localStream: null,
      roomConnected: null,
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
    isConnectedToRoom(state) {
      return state.roomConnected;
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
    hasRemoteUsername: (state) => (remoteUsername) => {
      return state.rtcPeerConnections.has(remoteUsername);
    },
    getRTCPeerConnection: (state) => (remoteUsername) => {
      console.log(state.rtcPeerConnections);

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
    setSocketConnected(state, status) {
      state.socketConnected = status;
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
    setConnectedToRoomStatus(state, status) {
      state.connected = status;
    },
    setCurrentAudioTracks(state, audioTracks) {
      state.audioTracks = audioTracks;
    },
    addRTCPeerConnection(state, RTCconnectionObject) {
      state.rtcPeerConnections.set(
        RTCconnectionObject.username,
        RTCconnectionObject.connection
      );
    },
    updateRemoteStream(state, remoteStreamObject) {
      const stream = state.remoteStreams.find((element) => {
        return element.username === remoteStreamObject.username;
      });

      if (stream) {
        stream.stream = remoteStreamObject.stream;
      } else {
        state.remoteStreams.push(remoteStreamObject);
      }
    },
    removeRemoteStream(state, username) {
      const stream = state.remoteStreams.find((element) => {
        return (element.username = username);
      });
      if (stream) {
        const index = state.remoteStreams.indexOf(stream);
        state.remoteStreams.splice(index, 1);
      }
    },
    setRoomNotFoundError(state, status) {
      state.roomNotFoundError = status;
    },
    closeRemoteConnection(state, username) {
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
    setSocketConnected(context, status) {
      context.commit("setSocketConnected", status);
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
    setConnectedToRoomStatus(context, status) {
      context.commit("setConnectedToRoomStatus", status);
    },
    setCurrentAudioTracks(context, audioTracks) {
      context.commit("setCurrentAudioTracks", audioTracks);
    },
    addRTCPeerConnection(context, RTCconnectionObject) {
      context.commit("addRTCPeerConnection", RTCconnectionObject);
    },
    updateRemoteStream(context, remoteStreamObject) {
      context.commit("updateRemoteStream", remoteStreamObject);
    },
    setRoomNotFoundError(context, status) {
      context.commit("setRoomNotFoundError", status);
    },
    closeRemoteConnection(context, username) {
      context.commit("closeRemoteConnection", username);
      context.commit("removeRemoteStream", username);
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
