const { RTCPeerConnection, RTCSessionDescription } = require("wrtc");
const { configuration } = require("./configuration");

class PeerConnectionManager {
  static createPeerConnection() {
    console.log("🚀 ~ file: peerConnectionManager.js:7 ~ PeerConnectionManager ~ createPeerConnection ~ configuration:", configuration)
    return new RTCPeerConnection(configuration);
  }

  static setRemoteDescription(peer, desc) {
    return peer.setRemoteDescription(desc);
  }

  static addTracks(peer, stream) {
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  }

  static createAnswer(peer) {
    return peer.createAnswer();
  }

  static setLocalDescription(peer, desc) {
    return peer.setLocalDescription(desc);
  }

  static getLocalDescription(peer) {
    return peer.localDescription;
  }

  static closeConnection(peer) {
    peer.close();
  }

  static handleTrackEvent(e) {
    // Handle track event logic here
  }
}

module.exports = PeerConnectionManager;
