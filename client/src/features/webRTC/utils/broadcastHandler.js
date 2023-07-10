import io from "socket.io-client";
import { config, SIGNAL_SERVER_URL } from "../utils/config";

class BroadcastHandler {
  constructor() {
    this.socketConnection = io.connect(SIGNAL_SERVER_URL);
    this.peerConnection = new RTCPeerConnection(config);
  }

  async start(stream, roomName, isMediaConfig, setOnAir) {
    if (!this.peerConnection || !isMediaConfig) return;

    this.peerConnection.onnegotiationneeded =
      this.handleNegotiationNeededEvent.bind(this, roomName);

    if (stream) {
      stream
        .getTracks()
        .forEach((track) => this.peerConnection.addTrack(track, stream));
    }

    setOnAir(true);
  }

  async terminate(setOnAir, roomName) {
    this.peerConnection.close();
    setOnAir(false);
    await this.socketConnection.emit("terminateBroadcast", roomName);
    this.socketConnection.disconnect();
    window.location.reload();
  }

  async handleNegotiationNeededEvent(roomName) {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    const payload = {
      sdp: this.peerConnection.localDescription,
    };

    this.socketConnection.emit("broadcast", {
      room: roomName,
      data: payload,
    });

    this.socketConnection.on("returnPayload", (data) => {
      const desc = new RTCSessionDescription(data.sdp);
      this.peerConnection
        .setRemoteDescription(desc)
        .catch((error) => console.log(error));
    });
  }

  getViewCount(room, setViewCount) {
    this.socketConnection.emit("getViewCount", room);
    this.socketConnection.on("concurrentViewers", (data) => {
      console.log(
        "🚀 ~ file: broadcastUtils.js:77 ~ socketConnection.on ~ data:",
        data
      );
      setViewCount((prevState) => (prevState = data));
    });
  }
}

export default BroadcastHandler;
