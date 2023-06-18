import { useEffect, useRef } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

/**
 * Custom hook for WebRTC functionality.
 * Manages the socket connection, peer connection, and local stream.
 * @returns {Object} An object containing references and functions for WebRTC.
 */
export const useWebRTC = () => {
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    initializeSocketConnection();
    initializeLocalStream();
    socketRef.current.on("offer", handleOfferEvent);

    return endCall;
  }, []);

  /**
   * Establishes the socket connection with the signaling server.
   */
  const initializeSocketConnection = () => {
    socketRef.current = io.connect("http://localhost:7000");
  };

  /**
   * Initializes the local media stream.
   */
  const initializeLocalStream = async () => {
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
   */
  const handleOfferEvent = (offer) => {
    createPeerConnection(false);
    peerRef.current.signal(offer);
  };

  /**
   * Creates a new peer connection.
   * @param {boolean} initiator - Whether the current client is the initiator of the connection.
   */
  const createPeerConnection = (initiator) => {
    peerRef.current = new SimplePeer({
      initiator,
      stream: localStreamRef.current,
    });

    peerRef.current.on("signal", (data) => {
      socketRef.current.emit("offer", data);
    });

    peerRef.current.on("stream", handleRemoteStream);
  };

  /**
   * Handles the remote stream received from the peer connection and updates the video element.
   * @param {MediaStream} remoteStream - The remote stream.
   */
  const handleRemoteStream = (remoteStream) => {
    videoRef.current.srcObject = remoteStream;
  };

  /**
   * Ends the call by destroying the peer connection and stopping the local stream.
   */
  const endCall = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  /**
   * Starts a call by initiating the peer connection.
   */
  const startCall = () => {
    createPeerConnection(true);
  };

  return {
    videoRef,
    startCall,
    endCall,
  };
};
