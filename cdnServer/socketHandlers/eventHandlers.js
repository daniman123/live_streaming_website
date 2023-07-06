const { RTCSessionDescription, MediaStream } = require("wrtc");

const PeerConnectionManager = require("../managers/peerConnectionManager");

async function handleViewer(socket, room, data) {
  console.log("🚀 ~ file: eventHandlers.js:9 ~ handleViewer ~ room:", room);
  const mediaStream = [...room].find((item) => item instanceof MediaStream);

  const conn = new PeerConnectionManager();
  const peer = conn.createPeerConnection();

  console.log(
    "🚀 ~ file: eventHandlers.js:18 ~ handleViewer ~ peer.connectionState:",
    peer.connectionState
  );
  peer.onconnectionstatechange = () => {
    const connectionStatus = peer.connectionState;
    console.log(
      "🚀 ~ file: eventHandlers.js:18 ~ connectionStatus:",
      connectionStatus
    );
  };

  const desc = new RTCSessionDescription(data.sdp);
  await peer.setRemoteDescription(desc);

  if (!mediaStream) return;
  mediaStream.getTracks().forEach((track) => peer.addTrack(track, mediaStream));

  const answer = await peer.createAnswer();

  await peer.setLocalDescription(answer);

  const payload = {
    sdp: peer.localDescription,
  };

  socket.emit("answerViewer", payload);
}

async function handleBroadcast(socket, room, data, handleTrackEvent) {
  const conn = new PeerConnectionManager();
  const broadcastPeer = conn.createPeerConnection();

  broadcastPeer.ontrack = (e) =>
    handleTrackEvents(e, broadcastPeer, room, handleTrackEvent);
  if (!data) return;
  const desc = new RTCSessionDescription(data.sdp);
  await broadcastPeer.setRemoteDescription(desc);

  const answer = await broadcastPeer.createAnswer();
  await broadcastPeer.setLocalDescription(answer);

  const payload = {
    sdp: broadcastPeer.localDescription,
  };

  socket.emit("returnPayload", payload);
}

function handleTrackEvents(e, peer, room, handleTrackEvent) {
  handleTrackEvent(room, e.streams[0]);
}

module.exports = { handleViewer, handleBroadcast };
