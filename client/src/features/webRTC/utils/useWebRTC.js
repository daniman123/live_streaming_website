import { useEffect, useRef } from "react";
import io from "socket.io-client";
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
export const useWebRTC = (roomId) => {
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    initializeSocketConnection(roomId);
    initializeLocalStream(videoRef, localStreamRef);
    socketRef.current.on("offer", handleOfferEvent);

    return endCall;
  }, []);

  /**
   * Establishes the socket connection with the signaling server.
   */
  const initializeSocketConnection = () => {
    socketRef.current = io.connect("http://localhost:7000");
    // Emit the "joinRoom" event with the room ID or name
    socketRef.current.emit("joinRoom", roomId);
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
  const startCall = (roomId) => {
    createPeerConnection(true, peerRef, localStreamRef, socketRef);
    socketRef.current.emit("joinRoom", roomId);
  };

  return {
    videoRef,
    startCall,
    endCall,
  };
};
