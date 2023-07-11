const { RTCSessionDescription, MediaStream } = require("wrtc");
import PeerConnectionManager from "../managers/peerConnectionManager";

const conn = new PeerConnectionManager();

async function handleViewer(socket: any, room: Set<any>, data: any) {
  const mediaStream = [...room].find(
    (item: MediaStream) => item instanceof MediaStream
  );

  const peer = conn.createPeerConnection();

  const desc = new RTCSessionDescription(data.sdp);
  await peer.setRemoteDescription(desc);

  if (!mediaStream) return;
  mediaStream
    .getTracks()
    .forEach((track: any) => peer.addTrack(track, mediaStream));

  const answer = await peer.createAnswer();

  await peer.setLocalDescription(answer);

  const payload = {
    sdp: peer.localDescription,
  };

  socket.emit("answerViewer", payload);
}

async function handleBroadcast(
  socket: any,
  room: string,
  data: any,
  handleTrackEvent: any
) {
  const broadcastPeer = conn.createPeerConnection();

  broadcastPeer.ontrack = (e: any) =>
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

function handleTrackEvents(
  e: any,
  peer: RTCPeerConnection,
  room: string,
  handleTrackEvent: any
) {
  handleTrackEvent(room, e.streams[0]);
}

export { handleViewer, handleBroadcast };
