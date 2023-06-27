"use client";

import React, { useState } from "react";
import io from "socket.io-client";

import Chat from "@/components/chat/index";

const socket = io.connect("http://localhost:3001");

function Streamer() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>

      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default Streamer;
