import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

function Viewer() {
  const socketRef = useRef();
  useEffect(() => {
    // Create a new WebSocket connection
    socketRef.current = io.connect("http://localhost:7000");
    socketRef.current.emit("join", "room1");
  }, []);

  return <div>Viewer</div>;
}

export default Viewer;
