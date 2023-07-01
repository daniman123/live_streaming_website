const webrtc = require("wrtc");

let senderStream; // Define the senderStream variable

const handleConnection = (socket, answerers) => {
  socket.emit("me", socket.id);

  socket.on("joinRoom", (room) => {
    console.log(`User: ${socket.id}, joined room: ${room}`);
    answerers.push(socket);
    if (answerers.length > 1) {
      socket.to(room).emit("joins", socket.id);
    }
    socket.join(room, (error) => {
      console.log("🚀 ~ file: socketHandlers.js:7 ~ socket.join ~ room:", room);
      if (error) {
        console.error("Error joining room:", error);
      }
    });
  });

  socket.on("viewer", async (data) => {
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun1.1.google.com:19302",
            "stun:stun2.1.google.com:19302",
          ],
        },
      ],
    });
    const desc = new webrtc.RTCSessionDescription(data.sdp);
    await peer.setRemoteDescription(desc);

    if (!senderStream) return;
    
    senderStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, senderStream));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription,
    };

    socket.emit("answerViewer", payload);
  });

  socket.on("broadcast", async (data) => {
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun1.1.google.com:19302",
            "stun:stun2.1.google.com:19302",
          ],
        },
      ],
    });
    peer.ontrack = (e) => handleTrackEvent(e, peer);

    const desc = new webrtc.RTCSessionDescription(data.sdp);
    await peer.setRemoteDescription(desc);

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    const payload = {
      sdp: peer.localDescription,
    };

    socket.emit("returnPayload", payload);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    answerers = answerers.filter((answerer) => answerer.id !== socket.id);
  });
};

function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
}

module.exports = {
  handleConnection,
};
