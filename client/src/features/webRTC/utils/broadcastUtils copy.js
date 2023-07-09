import io from "socket.io-client";
import { config, SIGNAL_SERVER_URL } from "../utils/config";

function initializeStream(setVideo, setAudio) {
  return navigator.mediaDevices.getUserMedia({
    video: {
      width: { exact: 1340 },
      height: { exact: 755 },
    },
    audio: setAudio,
  });
}

export const startBroadcast = async (
  socketConnection,
  setOnAir,
  peerConnection
) => {
  socketConnection.current = io.connect(SIGNAL_SERVER_URL);
  setOnAir(true);
  peerConnection.current = new RTCPeerConnection(config);
};

export const terminateBroadcast = async (
  setOnAir,
  socketConnection,
  roomName,
  setStream,
  localStream,
  peerConnection
) => {
  setOnAir(false);
  await socketConnection.current.emit("terminateBroadcast", roomName);
  setStream(null);
  localStream.current.srcObject = null;
  peerConnection.current.close();
  peerConnection.current = null;
  socketConnection.current.disconnect();
  window.location.reload();
};

module.exports = { initializeStream, startBroadcast, terminateBroadcast };
