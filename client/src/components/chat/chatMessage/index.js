import React from 'react';
import PropTypes from 'prop-types';

const ChatMessage = ({ sender, content, timestamp }) => {
  return (
    <div className="chat-message">
      <div className="chat-message-sender">{sender}</div>
      <div className="chat-message-content">{content}</div>
      <div className="chat-message-timestamp">{timestamp}</div>
    </div>
  );
};

ChatMessage.propTypes = {
  sender: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default ChatMessage;
