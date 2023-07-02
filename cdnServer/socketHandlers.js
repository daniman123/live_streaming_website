const { RTCPeerConnection, RTCSessionDescription } = require("wrtc");

class SocketHandlers {
  constructor() {
    this.answerers = new Set();
    this.senderStream = null;
    this.broadcastPeer = null;
  }

  handleTrackEvent(e, peer) {
    this.senderStream = e.streams[0];
  }

  handleJoinRoom(socket, room) {
    console.log(`User: ${socket.id}, joined room: ${room}`);
    socket.join(room, (error) => {
      console.log("🚀 ~ file: socketHandlers.js:7 ~ socket.join ~ room:", room);
      if (error) {
        console.error("Error joining room:", error);
      }
    });
  }

  handleViewer(socket, data) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun1.1.google.com:19302",
            "stun:stun2.1.google.com:19302",
          ],
        },
      ],
    });

    const desc = new RTCSessionDescription(data.sdp);
    peer
      .setRemoteDescription(desc)
      .then(() => {
        if (!this.senderStream) return;
        this.senderStream
          .getTracks()
          .forEach((track) => peer.addTrack(track, this.senderStream));
        return peer.createAnswer();
      })
      .then((answer) => {
        if (answer !== typeof Object) return;
        return peer.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          sdp: peer.localDescription,
        };
        socket.emit("answerViewer", payload);
      })
      .catch((error) => {
        console.error("Error creating answer:", error);
      });
  }

  handleBroadcast(socket, data) {
    this.broadcastPeer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun1.1.google.com:19302",
            "stun:stun2.1.google.com:19302",
          ],
        },
      ],
    });
    this.broadcastPeer.ontrack = (e) => this.handleTrackEvent(e);

    const desc = new RTCSessionDescription(data.sdp);
    this.broadcastPeer
      .setRemoteDescription(desc)
      .then(() => {
        return this.broadcastPeer.createAnswer();
      })
      .then((answer) => {
        return this.broadcastPeer.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          sdp: this.broadcastPeer.localDescription,
        };
        socket.emit("returnPayload", payload);
      })
      .catch((error) => {
        console.error("Error creating answer:", error);
      });
  }

  handleTerminateBroadcast() {
    if (this.broadcastPeer) {
      this.broadcastPeer.close();
      this.broadcastPeer = null;
    }
  }

  handleDisconnect(socket) {
    console.log("Client disconnected");
    this.answerers.delete(socket);
  }

  handleConnection(socket) {
    socket.emit("me", socket.id);

    socket.on("joinRoom", (room) => {
      this.handleJoinRoom(socket, room);
      this.answerers.add(socket);
      console.log(
        "🚀 ~ file: socketHandlers.js:111 ~ SocketHandlers ~ socket.on ~ this.answerers:",
        this.answerers.size
      );

      if (this.answerers.size > 1) {
        socket.to(room).emit("joins", socket.id);
      }
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
}

module.exports = SocketHandlers;
