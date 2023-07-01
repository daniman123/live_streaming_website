"use client";

import React, { useRef } from "react";

import io from "socket.io-client";

const SIGNAL_SERVER_URL = "http://localhost:7000";

const socket = io.connect(SIGNAL_SERVER_URL);

import initializeStream from "../utils/broadcastUtils";

function Broadcast() {
  const localStream = useRef();
  return (
    <div>
      <video ref={localStream} autoPlay playsInline />
      <button onClick={() => initializeStream(localStream, socket)}>
        START BROADCAST
      </button>
    </div>
  );
}

export default Broadcast;
