import ChatMessage from "../../chatMessage/index";

function ChatBody({ messageList, showTime }) {
  return (
    <div className="chat__body">
      {messageList.slice().reverse().map((messageContent, index) => {
        return (
          <ChatMessage
            key={index}
            sender={messageContent.author}
            content={messageContent.message}
            timestamp={messageContent.time}
            showTime={showTime}
          />
        );
      })}
    </div>
  );
}

export default ChatBody;
