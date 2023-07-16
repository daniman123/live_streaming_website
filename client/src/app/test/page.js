"use client";

import React, { useEffect, useState, useRef } from "react";
import withFeedWrapper from "@/hoc/feedWrapper";
import { usePathname } from "next/navigation";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const socketUrl = "ws://localhost:12345";
  const socketRef = useRef(null);
  const authorRef = useRef(null);
  const pathName = usePathname();

  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl);

    const handleMessage = (event) => {
      const message = event.data;
      const payload = JSON.parse(message);
      setMessages((prevMessages) => [...prevMessages, payload.message]);
    };

    const socket = socketRef.current;
    socket.addEventListener("open", () => {
      const payload = { join_room: pathName };
      const strPayload = JSON.stringify(payload);
      socket.send(strPayload);
    });

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
      socketRef.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    const socket = socketRef.current;
    setMessages((prevState) => [...prevState, inputValue]);
    const payload = {
      room_name: pathName,
      author: authorRef.current.value,
      message: inputValue,
    };
    const strPayload = JSON.stringify(payload);

    socket.send(strPayload);
    setInputValue("");
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input type="text" ref={authorRef} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default withFeedWrapper(ChatComponent);
