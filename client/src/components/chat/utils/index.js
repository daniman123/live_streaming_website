async function sendMessage(
  socket,
  room,
  username,
  currentMessage,
  setMessageList,
  chatInputRef,
  setCurrentMessage
) {
  if (currentMessage !== "") {
    const messageData = {
      room_name: room,
      author: username,
      message: currentMessage,
    };
    const strPayload = JSON.stringify(messageData);

    socket.send(strPayload);
    // await socket.emit("sendMessage", messageData);
    setMessageList((prevState) => [...prevState, messageData]);
    chatInputRef.current.value = "";
    setCurrentMessage("");
  }
}

module.exports = { sendMessage };

// time:
//         new Date(Date.now()).getHours() +
//         ":" +
//         new Date(Date.now()).getMinutes(),
