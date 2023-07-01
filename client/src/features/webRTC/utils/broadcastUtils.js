import config from "./config";

export default async function initializeStream(localStream, socket) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  localStream.current.srcObject = stream;
  const peer = createPeer(socket);
  stream.getTracks().forEach((track) => peer.addTrack(track, stream));
}

const createPeer = (socket) => {
  const peer = new RTCPeerConnection(config);
  peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer, socket);
  return peer;
};

const handleNegotiationNeededEvent = async (peer, socket) => {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = {
    sdp: peer.localDescription,
  };

  socket.emit("broadcast", payload);
  socket.on("returnPayload", (data) => {
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((error) => console.log(error));
  });
};
