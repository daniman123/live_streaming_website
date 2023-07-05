const { RTCPeerConnection, RTCSessionDescription } = require("wrtc");

class PeerConnectionManager {
  constructor() {
    const { configuration } = require("../constants/configuration");
    this.config = configuration;
  }
  createPeerConnection() {
    return new RTCPeerConnection(this.config);
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
