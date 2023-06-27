import React from "react";

function ChatFooter({ chatInputRef, setCurrentMessage, handleSendMessage }) {
  return (
    <div className="chat__footer">
      <input
        className="chat__message__input"
        ref={chatInputRef}
        type="text"
        placeholder="Hey..."
        onKeyDown={(event) => {
          event.key === "Enter" ? handleSendMessage() : "";
        }}
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
      />
      <button
        className="send__chat__message__button"
        onClick={handleSendMessage}
      >
        &#9658;
      </button>
    </div>
  );
}

export default ChatFooter;
