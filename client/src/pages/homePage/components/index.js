"use client";

import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

const WebRTC = () => {
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    // Connect to signaling server
    socketRef.current = io.connect("http://localhost:7000");

    // Capture and display the local video stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        localStreamRef.current = stream;
      })
      .catch((error) => {
        console.error("Error accessing camera and microphone:", error);
      });

    // Handle "offer" event
    socketRef.current.on("offer", (offer) => {
      // Create a new peer connection
      peerRef.current = new SimplePeer({
        initiator: false,
        stream: localStreamRef.current,
      });

      // Set the remote offer
      peerRef.current.signal(offer);

      // Set the remote video stream
      peerRef.current.on("stream", (remoteStream) => {
        videoRef.current.srcObject = remoteStream;
      });
    });

    // Handle "answer" event
    socketRef.current.on("answer", (answer) => {
      // Set the remote answer
      peerRef.current.signal(answer);
    });

    // Handle "ice-candidate" event
    socketRef.current.on("ice-candidate", (candidate) => {
      // Add the remote ICE candidate
      peerRef.current.signal(candidate);
    });

    // Clean up on component unmount
    return () => {
      if (peerRef.current) {
        socketRef.current.disconnect();
        peerRef.current.destroy();
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCall = () => {
    // Create a new peer connection
    peerRef.current = new SimplePeer({
      initiator: true,
      stream: localStreamRef.current,
    });

    // Set the local video stream
    peerRef.current.on("stream", (stream) => {
      videoRef.current.srcObject = stream;
    });

    // Send the offer to the remote peer
    peerRef.current.on("signal", (offer) => {
      socketRef.current.emit("offer", offer);
    });
  };

  const endCall = () => {
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={startCall}>Start Call</button>
      <button onClick={endCall}>End Call</button>
    </div>
  );
};

export default WebRTC;
