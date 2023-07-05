const { RTCPeerConnection, RTCSessionDescription } = require("wrtc");
const RoomManager = require("../socketHandlers/roomManager");
const PeerConnectionManager = require("../socketHandlers/peerConnectionManager");

class SocketHandlers {
  constructor() {
    this.rooms = new RoomManager();
    this.senderStream = null;
    this.broadcastPeer = null;
  }

  handleConnection(socket) {
    socket.emit("me", socket.id);

    socket.on("joinRoom", (room) => {
      this.rooms.joinRoom(socket, room);
    });

    socket.on("viewer", (data) => {
      this.handleViewer(socket, data);
    });

    socket.on("broadcast", (data) => {
      this.handleBroadcast(socket, data);
    });

    socket.on("terminateBroadcast", () => {
      this.handleTerminateBroadcast();
    });

    socket.on("disconnect", () => {
      this.handleDisconnect(socket);
    });
  }

  handleViewer(socket, data) {
    const peer = PeerConnectionManager.createPeerConnection();
    const desc = new RTCSessionDescription(data.sdp);

    PeerConnectionManager.setRemoteDescription(peer, desc)
      .then(() => {
        if (!this.senderStream) return;
        PeerConnectionManager.addTracks(peer, this.senderStream);
        return PeerConnectionManager.createAnswer(peer);
      })
      .then((answer) => {
        if (typeof answer !== "object") return;
        return PeerConnectionManager.setLocalDescription(peer, answer);
      })
      .then(() => {
        const payload = { sdp: PeerConnectionManager.getLocalDescription(peer) };
        socket.emit("answerViewer", payload);
      })
      .catch((error) => {
        console.error("Error creating answer:", error);
      });
  }

  handleBroadcast(socket, data) {
    this.broadcastPeer = PeerConnectionManager.createPeerConnection();
    this.broadcastPeer.ontrack = (e) => PeerConnectionManager.handleTrackEvent(e);

    const desc = new RTCSessionDescription(data.sdp);
    PeerConnectionManager.setRemoteDescription(this.broadcastPeer, desc)
      .then(() => PeerConnectionManager.createAnswer(this.broadcastPeer))
      .then((answer) => PeerConnectionManager.setLocalDescription(this.broadcastPeer, answer))
      .then(() => {
        const payload = { sdp: PeerConnectionManager.getLocalDescription(this.broadcastPeer) };
        socket.emit("returnPayload", payload);
      })
      .catch((error) => {
        console.error("Error creating answer:", error);
      });
  }

  handleTerminateBroadcast() {
    if (this.broadcastPeer) {
      PeerConnectionManager.closeConnection(this.broadcastPeer);
      this.broadcastPeer = null;
    }
  }

  handleDisconnect(socket) {
    console.log("Client disconnected");
    const userId = socket.id;
    this.rooms.removeUserFromAllRooms(userId, (room) => {
      socket.to(room).emit("userLeft", userId);
    });
  }
}

module.exports = SocketHandlers;
