import React, { useEffect, useRef, useState } from "react";
import { sendMessage } from "./utils/index";
import ChatHeader from "./chatLayout/chatHeader/index";
import ChatBody from "./chatLayout/chatBody/index";
import ChatFooter from "./chatLayout/chatFooter/index";

import "./style/style.css";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function Chat({ username, enableChat, room }) {
  const chatInputRef = useRef();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (room !== "") {
      socket.emit("joinRoom", room);
    }
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
    setMessageList((prevState) => [...prevState, data].flat());
    });
  }, [socket]);

  const handleSendMessage = () => {
    sendMessage(
      socket,
      room,
      username,
      currentMessage,
      setMessageList,
      chatInputRef,
      setCurrentMessage
    );
  };

  return (
    <div className="chat__wrapper">
      <ChatHeader />
      <ChatBody messageList={messageList} showTime={false} />
      <ChatFooter
        chatInputRef={chatInputRef}
        enableChat={enableChat}
        setCurrentMessage={setCurrentMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Chat;
