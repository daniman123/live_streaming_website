"use client";

import React, { useEffect, useRef, useLayoutEffect } from "react";

import io from "socket.io-client";

const SIGNAL_SERVER_URL = "http://localhost:7000";

const socket = io.connect(SIGNAL_SERVER_URL);

import initializeStream from "../utils/viewerUtils";

function Viewer() {
  const remoteStream = useRef();

  useEffect(() => {
    initializeStream(remoteStream, socket).then();
  }, []);

  return (
    <div>
      <video ref={remoteStream} autoPlay playsInline />
      <button onClick={() => initializeStream(remoteStream, socket)}>
        view
      </button>
    </div>
  );
}

export default Viewer;
