import config from "./config";

export default async function initializeStream(remoteStream, socket) {
  const peer = createPeer(socket, remoteStream);
  peer.addTransceiver("video", { direction: "recvonly" });
  peer.addTransceiver("audio", { direction: "recvonly" });
}

function createPeer(socket, remoteStream) {
  const peer = new RTCPeerConnection(config);
  peer.ontrack = (e) => handleTrackEvent(remoteStream, e);
  peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer, socket);

  return peer;
}

async function handleNegotiationNeededEvent(peer, socket) {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = {
    sdp: peer.localDescription,
  };

  socket.emit("viewer", payload);
  socket.on("answerViewer", (data) => {
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  });
}

function handleTrackEvent(remoteStream, e) {
  if (remoteStream) {
    remoteStream.current.srcObject = e.streams[0];
  }
}
