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
}

module.exports = { sendMessage };
