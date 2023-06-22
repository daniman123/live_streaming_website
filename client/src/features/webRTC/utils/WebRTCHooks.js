import { useEffect, useRef } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";
import {
  initializeLocalStream,
  handleOfferEvent,
  createPeerConnection,
} from "./WebRTCUtils";

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
    initializeLocalStream(videoRef, localStreamRef);
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
    createPeerConnection(true, peerRef, localStreamRef, socketRef);
  };

  return {
    videoRef,
    startCall,
    endCall,
  };
};
