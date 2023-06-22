import SimplePeer from "simple-peer";

/**
 * Initializes the local media stream.
 * @param {Object} videoRef - Reference to the video element.
 * @param {Object} localStreamRef - Reference to the local stream.
 */
export const initializeLocalStream = async (videoRef, localStreamRef) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoRef.current.srcObject = stream;
    localStreamRef.current = stream;
  } catch (error) {
    console.error("Error accessing camera and microphone:", error);
  }
};

/**
 * Handles the "offer" event received from the signaling server.
 * Initiates the peer connection and signals the offer to the remote peer.
 * @param {Object} offer - The offer received from the signaling server.
 * @param {Object} peerRef - Reference to the peer connection.
 * @param {Object} localStreamRef - Reference to the local stream.
 * @param {Object} socketRef - Reference to the socket connection.
 */
export const handleOfferEvent = (offer, peerRef, localStreamRef, socketRef) => {
  createPeerConnection(false, peerRef, localStreamRef, socketRef);
  peerRef.current.signal(offer);
};

/**
 * Creates a new peer connection.
 * @param {boolean} initiator - Whether the current client is the initiator of the connection.
 * @param {Object} peerRef - Reference to the peer connection.
 * @param {Object} localStreamRef - Reference to the local stream.
 * @param {Object} socketRef - Reference to the socket connection.
 */
export const createPeerConnection = (
  initiator,
  peerRef,
  localStreamRef,
  socketRef,
  videoRef // Add videoRef as an argument
) => {
  peerRef.current = new SimplePeer({
    initiator,
    stream: localStreamRef.current,
  });

  peerRef.current.on("signal", (data) => {
    socketRef.current.emit("offer", data);
  });

  peerRef.current.on("stream", (remoteStream) => {
    handleRemoteStream(remoteStream, peerRef, videoRef); // Pass videoRef
  });
};

/**
 * Handles the remote stream received from the peer connection and updates the video element.
 * @param {MediaStream} remoteStream - The remote stream.
 * @param {Object} peerRef - Reference to the peer connection.
 * @param {Object} videoRef - Reference to the video element.
 */
export const handleRemoteStream = (remoteStream, peerRef, videoRef) => {
  videoRef.current.srcObject = remoteStream;
};
