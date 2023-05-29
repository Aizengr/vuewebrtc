import { io } from "socket.io-client";
import store from "./main.js";

class SocketService {
  iceServers = {
    iceServers: [
      { url: "stun:stun.services.mozzila.com" },
      { url: "stun:stun.l.google.com:19302" },
      { url: "stun:stun1.l.google.com:19302" },
      { url: "stun:stun2.l.google.com:19302" },
      { url: "stun:stun3.l.google.com:19302" },
      { url: "stun:stun4.l.google.com:19302" },
    ],
  };

  streamConstraints = {
    audio: true,
    video: {
      facingMode: "user",
      width: { min: 1024, ideal: 1280, max: 1280 },
      height: { min: 576, ideal: 720, max: 720 },
    },
  };

  socket;
  constructor() {}

  setupSocketConnection() {
    const URL =
      process.env.NODE_ENV === "production"
        ? undefined
        : "https://localhost:3000";
    this.socket = io(URL, {
      autoConnect: true,
    });

    this.socket.on("created", (room) => {
      console.log(room + " CREATED RECEIVED");
      store.dispatch("setRoomID", room);
      store.dispatch("setConnectedStatus", true);

      navigator.mediaDevices
        .getUserMedia(this.streamConstraints) //getting media devices
        .then((stream) => {
          store.dispatch("setCurrentAudioTracks", [stream.getAudioTracks()]);
          store.dispatch("setLocalStream", stream);
        })
        .catch((err) => {
          console.log("An error occured when accessing media devices " + err);
        });
    });

    //   //server emits joined
    //   this.socket.on("joined", () => {
    //     navigator.mediaDevices
    //       .getUserMedia(this.streamConstraints)
    //       .then((stream) => {
    //         [this.state.currAudioTrack] = stream.getAudioTracks();
    //         this.state.localStream = stream;
    //         this.socket.emit("ready", this.state.roomID, this.state.username); //sends ready to the server
    //       })
    //       .catch((err) => {
    //         console.log("An error occured when accessing media devices " + err);
    //       });
    //   });

    //   //server emits ready
    //   this.socket.on("ready", (remoteUsername) => {
    //     //if client hasnt established peer connection yet
    //     if (!this.state.rtcPeerConnections.has(remoteUsername)) {
    //       //creates an RTCPeerConnectoin object
    //       let rtcPeerConnection = new RTCPeerConnection(this.iceServers);

    //       //adds current local stream to the object
    //       this.state.localStream.getTracks().forEach((track) => {
    //         rtcPeerConnection.addTrack(track, this.state.localStream);
    //       });

    //       // //adding data channel for data exchange and chat implementation
    //       // let newDataChannel = rtcPeerConnection.createDataChannel("Chat channel");
    //       // newDataChannel.addEventListener("open", (event) => {
    //       //   console.log(event);
    //       // });
    //       // newDataChannel.addEventListener("message", (event) => {
    //       //   handleMessage(event.data);
    //       // });

    //       //adds event listeners to the newly created object above
    //       rtcPeerConnection.onicecandidate = (event) => {
    //         if (event.candidate) {
    //           this.socket.emit("candidate", {
    //             type: "candidate",
    //             label: event.candidate.sdpMLineIndex,
    //             id: event.candidate.sdpMid,
    //             candidate: event.candidate.candidate,
    //             room: this.state.roomID,
    //             from: this.state.username,
    //             to: remoteUsername,
    //           });
    //         }
    //       };

    //       //adding track event listener to get stream
    //       rtcPeerConnection.addEventListener("track", (event) => {
    //         const [remoteStream] = event.streams;
    //         this.state.remoteStreams.push(remoteStream);
    //       });

    //       //prepares an offer and sends it
    //       rtcPeerConnection
    //         .createOffer()
    //         .then((sessionDesc) => {
    //           rtcPeerConnection.setLocalDescription(sessionDesc);
    //           this.socket.emit("offer", {
    //             type: "offer",
    //             sdp: sessionDesc,
    //             room: this.state.roomID,
    //             from: this.state.username,
    //             to: remoteUsername,
    //           });
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //       this.state.rtcPeerConnections.set(remoteUsername, rtcPeerConnection);
    //       // dataChannels.set(remoteUsername, newDataChannel);
    //     }
    //   });

    //   //server emits offer
    //   this.socket.on("offer", (sessionDesc, remoteUsername) => {
    //     //if client hasnt yet established peer connection
    //     if (!this.state.rtcPeerConnections.has(remoteUsername)) {
    //       //creates an RTCPeerConnectoin object
    //       let rtcPeerConnection = new RTCPeerConnection(this.iceServers);

    //       //adds current local stream to the object
    //       this.state.localStream.getTracks().forEach((track) => {
    //         rtcPeerConnection.addTrack(track, this.state.localStream);
    //       });

    //       // //adding data channel for data exchange and chat implementation
    //       // let newDataChannel;
    //       // rtcPeerConnection.addEventListener("datachannel", (event) => {
    //       //   newDataChannel = event.channel;
    //       //   //need this for both Chrome and Mozilla
    //       //   newDataChannel.binaryType = "arraybuffer";
    //       //   console.log("Data channel created");
    //       //   dataChannels.set(remoteUsername, newDataChannel);
    //       //   newDataChannel.addEventListener("message", (event) => {
    //       //     handleMessage(event.data);
    //       //   });
    //       // });
    //       //adds event listeners to the newly created object above
    //       rtcPeerConnection.onicecandidate = (event) => {
    //         if (event.candidate) {
    //           this.socket.emit("candidate", {
    //             type: "candidate",
    //             label: event.candidate.sdpMLineIndex,
    //             id: event.candidate.sdpMid,
    //             candidate: event.candidate.candidate,
    //             room: this.state.roomID,
    //             from: this.state.username,
    //             to: remoteUsername,
    //           });
    //         }
    //       };

    //       rtcPeerConnection.addEventListener("track", async (event) => {
    //         const [remoteStream] = event.streams;
    //         this.state.remoteStreams.push(remoteStream);
    //       });

    //       //stores the offer as a remote description
    //       rtcPeerConnection.setRemoteDescription(
    //         new RTCSessionDescription(sessionDesc)
    //       );

    //       //prepares an Answer
    //       rtcPeerConnection
    //         .createAnswer()
    //         .then((sessionDesc) => {
    //           rtcPeerConnection.setLocalDescription(sessionDesc);
    //           this.socket.emit("answer", {
    //             type: "answer",
    //             sdp: sessionDesc,
    //             room: this.state.roomID,
    //             from: this.state.username,
    //             to: remoteUsername,
    //           });
    //         })
    //         .catch((err) => {
    //           console.log("Error occured when creating answer" + err);
    //         });
    //       this.state.rtcPeerConnections.set(remoteUsername, rtcPeerConnection);
    //     }
    //   });

    //   //server emits answer
    //   this.socket.on("answer", (sessionDesc, remoteUsername) => {
    //     //stores it as remote desc
    //     let connection = this.state.rtcPeerConnections.get(remoteUsername);
    //     if (!connection.currentRemoteDescription) {
    //       //ignores answer if peer connection is established already
    //       connection
    //         .setRemoteDescription(new RTCSessionDescription(sessionDesc))
    //         .catch(() => {
    //           console.log(remoteUsername);
    //         });
    //     }
    //   });

    //   //server emits candidate
    //   this.socket.on("candidate", (event, remoteUsername) => {
    //     //creates canditate object

    //     //setting candidate is the last step for connection
    //     //we set candidate only if we haven't already
    //     let connection = this.state.rtcPeerConnections.get(remoteUsername);
    //     let candidate = new RTCIceCandidate({
    //       sdpMLineIndex: event.label,
    //       candidate: event.candidate,
    //     });
    //     //stores candidate
    //     connection
    //       .addIceCandidate(candidate)
    //       .then(() => {
    //         console.log("Added candidate for " + remoteUsername);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   });

    //   //server emits room not found
    //   this.socket.on("roomnotfound", () => {
    //     this.state.roomNotFoundError = true;
    //   });

    //   //handing peer disconnection
    //   this.socket.on("peerDisconnected", (remoteUsername) => {
    //     try {
    //       this.state.rtcPeerConnections.get(remoteUsername).close();
    //       //removing rtcPeerConnection
    //       this.state.rtcPeerConnections.delete(remoteUsername);
    //       this.state.dataChannels.delete(remoteUsername);
    //       //need to close the connection instantly
    //       //to avoid delays when disconnecting
    //     } catch (e) {
    //       console.log(remoteUsername);
    //       console.log(e);
    //     }
    //   });

    //   this.socket.on("usernametaken", () => {
    //     this.state.usernameTakenError = true;
    //   });
  }

  roomConnect(username) {
    this.socket.emit("create", username);
    store.dispatch("setUsername", username);
  }
}

export default new SocketService();
