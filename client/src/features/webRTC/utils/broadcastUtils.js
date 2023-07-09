import io from "socket.io-client";
import { config, SIGNAL_SERVER_URL } from "../utils/config";

function initializeStream(setVideo, setAudio) {
  return navigator.mediaDevices.getUserMedia({
    video: setVideo
      ? {
          width: { exact: 1340 },
          height: { exact: 755 },
        }
      : setVideo,
    audio: setAudio,
  });
}

const socketConnection = io.connect(SIGNAL_SERVER_URL);

export const startBroadcast = async (
  peerConnection,
  stream,
  roomName,
  isMediaConfig,
  setOnAir
) => {
  if (!peerConnection || !isMediaConfig) return;

  peerConnection.onnegotiationneeded = handleNegotiationNeededEvent.bind(
    null,
    peerConnection,
    roomName
  );

  if (stream) {
    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));
  }

  setOnAir(true);
};

export const terminateBroadcast = async (
  peerConnection,
  setOnAir,
  roomName
) => {
  peerConnection.close();
  setOnAir(false);
  await socketConnection.emit("terminateBroadcast", roomName);
  socketConnection.disconnect();
  window.location.reload();
};

const handleNegotiationNeededEvent = async (peerConnection, roomName) => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  const payload = {
    sdp: peerConnection.localDescription,
  };

  socketConnection.emit("broadcast", {
    room: roomName,
    data: payload,
  });

  socketConnection.on("returnPayload", (data) => {
    const desc = new RTCSessionDescription(data.sdp);
    peerConnection
      .setRemoteDescription(desc)
      .catch((error) => console.log(error));
  });
};

export const getViewCount = (room, setViewCount) => {
  socketConnection.emit("getViewCount", room);
  socketConnection.on("concurrentViewers", (data) => {
    console.log("🚀 ~ file: broadcastUtils.js:77 ~ socketConnection.on ~ data:", data)
    setViewCount((prevState) => (prevState = data));
  });
};

module.exports = {
  initializeStream,
  startBroadcast,
  terminateBroadcast,
  getViewCount,
};
