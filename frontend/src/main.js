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
      currentAudioTracks: null,
      rtcPeerConnections: new Map(),
      remoteStreams: [],
      roomNotFoundError: false,
      usernameTakenError: false,
      activeInputDevice: null,
      activeVideoDevice: null,
      activeOutputDevice: null,
      isLocalStreamVideoEnabled: true,
      isLocalStreamAudioEnabled: true,
      isShareScreenEnabled: false,
      previousStream: null,
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
      return state.currentAudioTracks;
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
      return state.rtcPeerConnections.get(remoteUsername);
    },
    getActiveInputDevice: (state) => {
      return state.activeInputDevice;
    },
    getActiveVideoDevice: (state) => {
      return state.activeVideoDevice;
    },
    getActiveOutputDevice: (state) => {
      return state.activeOutputDevice;
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
    setLocalStreamAudio(state, value) {
      state.localStream.getAudioTracks()[0].enabled = value;
      state.isLocalStreamAudioEnabled = value;
    },
    setLocalStreamVideo(state, value) {
      state.localStream.getVideoTracks()[0].enabled = value;
      state.isLocalStreamVideoEnabled = value;
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
      state.remoteStreams.filter((element, index, arr) => {
        if (element.username === username) {
          arr.splice(index, 1);
        }
      });
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
    setActiveInputDevice(state, inputDevice) {
      state.activeInputDevice = inputDevice;
    },
    setActiveVideoDevice(state, videoDevice) {
      state.activeVideoDevice = videoDevice;
    },
    setActiveOutputDevice(state, outputDevice) {
      state.activeOutputDevice = outputDevice;
    },
    updateStreamOnDeviceChange(state, stream) {
      state.localStream = stream;
      const [videoTrack] = stream.getVideoTracks();
      const [audioTrack] = stream.getAudioTracks();

      state.rtcPeerConnections.forEach((pc) => {
        const senderV = pc
          .getSenders()
          .find((s) => s.track.kind === videoTrack.kind);
        senderV.replaceTrack(videoTrack);
        const senderA = pc
          .getSenders()
          .find((s) => s.track.kind === audioTrack.kind);
        senderA.replaceTrack(audioTrack);
      });
    },
    updateStreamOnScreenShare(state, stream) {
      state.previousStream = state.localStream;
      let [screen] = stream.getVideoTracks();
      [state.currentAudioTracks] = state.localStream.getAudioTracks();
      stream.addTrack(state.currentAudioTracks);
      state.localStream = stream;

      state.rtcPeerConnections.forEach((pc) => {
        const senderV = pc
          .getSenders()
          .find((s) => s.track.kind === screen.kind);
        senderV.replaceTrack(screen);
      });
      state.isShareScreenEnabled = true;
    },
    resetStreamAfterShareScreen(state) {
      state.localStream = state.previousStream;
      const [videoTrack] = state.localStream.getVideoTracks();
      const [audioTrack] = state.localStream.getAudioTracks();

      //sending audio and video tracks to every rtc connection
      state.rtcPeerConnections.forEach((pc) => {
        const senderV = pc
          .getSenders()
          .find((s) => s.track.kind === videoTrack.kind);
        senderV.replaceTrack(videoTrack);
        const senderA = pc
          .getSenders()
          .find((s) => s.track.kind === audioTrack.kind);
        senderA.replaceTrack(audioTrack);
      });
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
    setLocalStreamAudio(context, value) {
      context.commit("setLocalStreamAudio", value);
    },
    setLocalStreamVideo(context, value) {
      context.commit("setLocalStreamVideo", value);
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
    setActiveInputDevice(context, inputDevice) {
      context.commit("setActiveInputDevice", inputDevice);
    },
    setActiveVideoDevice(context, videoDevice) {
      context.commit("setActiveVideoDevice", videoDevice);
    },
    setActiveOutputDevice(context, outputDevice) {
      context.commit("setActiveOutputDevice", outputDevice);
    },
    updateStreamOnDeviceChange(context, stream) {
      context.commit("updateStreamOnDeviceChange", stream);
    },
    updateStreamOnScreenShare(context, stream) {
      context.commit("updateStreamOnScreenShare", stream);
    },
    resetStreamAfterShareScreen(context) {
      context.commit("resetStreamAfterShareScreen");
    },
  },
});

app.use(store);
app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");

export default store;
