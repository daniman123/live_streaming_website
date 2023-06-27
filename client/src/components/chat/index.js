import React, { useEffect, useRef, useState } from "react";
import { sendMessage } from "./utils/index";
import ChatHeader from "./chatLayout/chatHeader/index";
import ChatBody from "./chatLayout/chatBody/index";
import ChatFooter from "./chatLayout/chatFooter/index";
import "./style/style.css";

function Chat({ socket, username, room }) {
  const chatInputRef = useRef();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((prevState) => [...prevState, data]);
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
        setCurrentMessage={setCurrentMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default Chat;
