import React from "react";
import PropTypes from "prop-types";

const ChatMessage = ({ sender, content, timestamp, showTime }) => {
  return (
    <div className="chat__message">
      <div className={`optional__chat__data ${showTime}`}>
        <div className="chat__message__timestamp">{timestamp}</div>
      </div>
      <div className="chat__message__sender">{sender}:</div>
      <div className="chat__message__content">{content}</div>
    </div>
  );
};

ChatMessage.propTypes = {
  sender: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default ChatMessage;
