"use client";

import React, { useRef } from "react";

import io from "socket.io-client";

const SIGNAL_SERVER_URL = "http://localhost:7000";

const socket = io.connect(SIGNAL_SERVER_URL);

import initializeStream from "../utils/broadcastUtils";

import "../style/style.css";

function Broadcast() {
  const localStream = useRef();

  

  return (
    <div className="dashboard__streamer__broadcast__wrapper">
      <video
        className="dashboard__streamer__broadcast__player"
        ref={localStream}
        autoPlay
        playsInline
      />
      <div className="dashboard__stream__broadcast__options__wrapper">
        <button onClick={() => initializeStream(localStream, socket)}>
          START BROADCAST
        </button>
        {/* <button onClick={disconnectBroadcast}>DISCONNECT BROADCAST</button> */}
      </div>
    </div>
  );
}

export default Broadcast;
