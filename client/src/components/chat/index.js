import React from "react";
import { connect } from "react-redux";
import { addMessage, receiveMessage, updateUserList } from "../../redux/store/chat";
import ChatMessage from "./chatMessage/index";
import UserList from "./userList/index";
import ChatInput from "./chatInput/index";
import PropTypes from "prop-types";

export const Chat = (props) => {
  // Access messages and users from props
  const { messages, users } = props;

  // Modify event handlers and functions to dispatch actions
  const handleSendMessage = (message) => {
    props.addMessage(message);
    // Additional logic for sending the message to the server
  };

  return (
    <div>
      {/* Render chat UI components */}
      <UserList users={users} />
      <ChatMessage messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

Chat.propTypes = {
  // Define prop types
  messages: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  addMessage: PropTypes.func.isRequired,
  receiveMessage: PropTypes.func.isRequired,
  updateUserList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages,
    users: state.chat.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message) => dispatch(addMessage(message)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    updateUserList: (users) => dispatch(updateUserList(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
