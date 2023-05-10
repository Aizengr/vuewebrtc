import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  localStream: null,
  currAudioTrack: null,
  isScreenSharing: false,
  rtcPeerConnections: null,
  roomID: null,
  remoteStreams: [],
  messages: [],
  roomNotFoundError: false,
  usernameTakenError: false,
});

//STUN SERVERS
const iceServers = {
  iceServers: [
    { url: "stun:stun.services.mozzila.com" },
    { url: "stun:stun.l.google.com:19302" },
    { url: "stun:stun1.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun3.l.google.com:19302" },
    { url: "stun:stun4.l.google.com:19302" },
  ],
};

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "https://localhost:3000";

export const socket = io(URL, {
  autoConnect: true,
});

state.rtcPeerConnections = new Map();

//Stream constraints, having min ideal and max values for better performance
const streamConstraints = {
  audio: true,
  video: {
    facingMode: "user",
    width: { min: 1024, ideal: 1280, max: 1280 },
    height: { min: 576, ideal: 720, max: 720 },
  },
};
////-------------------------SIGNALING

export async function createRoom(username) {
  socket.emit("create", username);
  state.connected = true;
  state.username = username;
}

//server emits created
socket.on("created", (room) => {
  console.log(room);

  state.roomID = room;
  navigator.mediaDevices
    .getUserMedia(streamConstraints) //getting media devices
    .then((stream) => {
      [state.currAudioTrack] = stream.getAudioTracks();
    })
    .catch((err) => {
      console.log("An error occured when accessing media devices " + err);
    });
});

//server emits joined
socket.on("joined", () => {
  navigator.mediaDevices
    .getUserMedia(streamConstraints)
    .then((stream) => {
      [state.currAudioTrack] = stream.getAudioTracks();
      state.localStream = stream;
      socket.emit("ready", state.roomID, state.username); //sends ready to the server
    })
    .catch((err) => {
      console.log("An error occured when accessing media devices " + err);
    });
});

//server emits ready
socket.on("ready", (remoteUsername) => {
  //if client hasnt established peer connection yet
  if (!state.rtcPeerConnections.has(remoteUsername)) {
    //creates an RTCPeerConnectoin object
    let rtcPeerConnection = new RTCPeerConnection(iceServers);

    //adds current local stream to the object
    state.localStream.getTracks().forEach((track) => {
      rtcPeerConnection.addTrack(track, state.localStream);
    });

    // //adding data channel for data exchange and chat implementation
    // let newDataChannel = rtcPeerConnection.createDataChannel("Chat channel");
    // newDataChannel.addEventListener("open", (event) => {
    //   console.log(event);
    // });
    // newDataChannel.addEventListener("message", (event) => {
    //   handleMessage(event.data);
    // });

    //adds event listeners to the newly created object above
    rtcPeerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", {
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
          room: state.roomID,
          from: state.username,
          to: remoteUsername,
        });
      }
    };

    //adding track event listener to get stream
    rtcPeerConnection.addEventListener("track", (event) => {
      const [remoteStream] = event.streams;
      state.remoteStreams.push(remoteStream);
    });

    //prepares an offer and sends it
    rtcPeerConnection
      .createOffer()
      .then((sessionDesc) => {
        rtcPeerConnection.setLocalDescription(sessionDesc);
        socket.emit("offer", {
          type: "offer",
          sdp: sessionDesc,
          room: state.roomID,
          from: state.username,
          to: remoteUsername,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    state.rtcPeerConnections.set(remoteUsername, rtcPeerConnection);
    // dataChannels.set(remoteUsername, newDataChannel);
  }
});

//server emits offer
socket.on("offer", (sessionDesc, remoteUsername) => {
  //if client hasnt yet established peer connection
  if (!state.rtcPeerConnections.has(remoteUsername)) {
    //creates an RTCPeerConnectoin object
    let rtcPeerConnection = new RTCPeerConnection(iceServers);

    //adds current local stream to the object
    state.localStream.getTracks().forEach((track) => {
      rtcPeerConnection.addTrack(track, state.localStream);
    });

    // //adding data channel for data exchange and chat implementation
    // let newDataChannel;
    // rtcPeerConnection.addEventListener("datachannel", (event) => {
    //   newDataChannel = event.channel;
    //   //need this for both Chrome and Mozilla
    //   newDataChannel.binaryType = "arraybuffer";
    //   console.log("Data channel created");
    //   dataChannels.set(remoteUsername, newDataChannel);
    //   newDataChannel.addEventListener("message", (event) => {
    //     handleMessage(event.data);
    //   });
    // });
    //adds event listeners to the newly created object above
    rtcPeerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", {
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
          room: state.roomID,
          from: state.username,
          to: remoteUsername,
        });
      }
    };

    rtcPeerConnection.addEventListener("track", async (event) => {
      const [remoteStream] = event.streams;
      state.remoteStreams.push(remoteStream);
    });

    //stores the offer as a remote description
    rtcPeerConnection.setRemoteDescription(
      new RTCSessionDescription(sessionDesc)
    );

    //prepares an Answer
    rtcPeerConnection
      .createAnswer()
      .then((sessionDesc) => {
        rtcPeerConnection.setLocalDescription(sessionDesc);
        socket.emit("answer", {
          type: "answer",
          sdp: sessionDesc,
          room: state.roomID,
          from: state.username,
          to: remoteUsername,
        });
      })
      .catch((err) => {
        console.log("Error occured when creating answer" + err);
      });
    state.rtcPeerConnections.set(remoteUsername, rtcPeerConnection);
  }
});

//server emits answer
socket.on("answer", (sessionDesc, remoteUsername) => {
  //stores it as remote desc
  let connection = state.rtcPeerConnections.get(remoteUsername);
  if (!connection.currentRemoteDescription) {
    //ignores answer if peer connection is established already
    connection
      .setRemoteDescription(new RTCSessionDescription(sessionDesc))
      .catch(() => {
        console.log(remoteUsername);
      });
  }
});

//server emits candidate
socket.on("candidate", (event, remoteUsername) => {
  //creates canditate object

  //setting candidate is the last step for connection
  //we set candidate only if we haven't already
  let connection = state.rtcPeerConnections.get(remoteUsername);
  let candidate = new RTCIceCandidate({
    sdpMLineIndex: event.label,
    candidate: event.candidate,
  });
  //stores candidate
  connection
    .addIceCandidate(candidate)
    .then(() => {
      console.log("Added candidate for " + remoteUsername);
    })
    .catch((err) => {
      console.log(err);
    });
});

//server emits room not found
socket.on("roomnotfound", () => {
  state.roomNotFoundError = true;
});

//handing peer disconnection
socket.on("peerDisconnected", (remoteUsername) => {
  try {
    state.rtcPeerConnections.get(remoteUsername).close();
    //removing rtcPeerConnection
    state.rtcPeerConnections.delete(remoteUsername);
    state.dataChannels.delete(remoteUsername);
    //need to close the connection instantly
    //to avoid delays when disconnecting
  } catch (e) {
    console.log(remoteUsername);
    console.log(e);
  }
});

socket.on("usernametaken", () => {
  state.usernameTakenError = true;
});
