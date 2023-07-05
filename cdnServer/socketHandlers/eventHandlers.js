const {
  RTCSessionDescription,
  MediaStream,
} = require("wrtc");

const PeerConnectionManager = require("../managers/peerConnectionManager");

async function handleViewer(socket, room, data) {
  const mediaStream = [...room].find((item) => item instanceof MediaStream);

  if (!mediaStream) return;
  const conn = new PeerConnectionManager()
  const peer = conn.createPeerConnection();

  const desc = new RTCSessionDescription(data.sdp);
  await peer.setRemoteDescription(desc);

  mediaStream.getTracks().forEach((track) => peer.addTrack(track, mediaStream));

  const answer = await peer.createAnswer();

  await peer.setLocalDescription(answer);

  const payload = {
    sdp: peer.localDescription,
  };

  socket.emit("answerViewer", payload);
}

async function handleBroadcast(socket, room, data, handleTrackEvent) {
  const conn = new PeerConnectionManager()
  const broadcastPeer = conn.createPeerConnection();

  broadcastPeer.ontrack = (e) =>
    handleTrackEvents(e, broadcastPeer, room, handleTrackEvent);

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
