"use client"


import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";



const LiveBroadcast = () => {
  const videoRef = useRef(null);
  const socket = io("http://localhost:7000");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        socket.emit("stream", "room2",stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted></video>
    </div>
  );
};

export default LiveBroadcast;
