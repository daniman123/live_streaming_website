import React, { useEffect, useRef, useState } from "react";
import { sendMessage } from "./utils/index";
import ChatHeader from "./chatLayout/chatHeader/index";
import ChatBody from "./chatLayout/chatBody/index";
import ChatFooter from "./chatLayout/chatFooter/index";

import "./style/style.css";

function Chat({ username, enableChat, room }) {
  const socketUrl = "ws://localhost:12345";
  const socketRef = useRef(null);
  const chatInputRef = useRef();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl);

    const handleOpen = () => {
      const payload = { join_room: room };
      const strPayload = JSON.stringify(payload);
      socketRef.current.send(strPayload);
    };

    socketRef.current.addEventListener("open", handleOpen);

    const handleMessage = (event) => {
      const message = event.data;
      console.log("🚀 ~ file: index.js:21 ~ handleMessage ~ message:", message);
      const payload = JSON.parse(message);
      setMessageList((prevMessages) => [...prevMessages, payload]);
    };

    socketRef.current.addEventListener("message", handleMessage);

    return () => {
      socketRef.current.removeEventListener("message", handleMessage);
      socketRef.current.close();
    };
  }, []);

  const handleSendMessage = () => {
    sendMessage(
      socketRef.current,
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
