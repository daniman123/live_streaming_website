import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./chatMessage";

function Chat({ socket, username, room }) {
  const chatInputRef = useRef();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((prevState) => [...prevState, messageData]);
      chatInputRef.current.value = "";
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((prevState) => [...prevState, data]);
      console.log("🚀 ~ file: index.js:24 ~ socket.on ~ data:", data);
    });
  }, [socket]);

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent, index) => {
          return (
            <ChatMessage
              key={index}
              sender={messageContent.author}
              content={messageContent.message}
              timestamp={messageContent.time}
            />
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          ref={chatInputRef}
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
