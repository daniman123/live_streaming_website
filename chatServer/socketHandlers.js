const handleConnection = (socket) => {
  let messageQueue = [];
  let isProcessing = false;

  socket.on("joinRoom", (data) => {
    socket.join(data, (error) => {
      if (error) {
        console.error("Error joining room:", error);
      }
    });
  });

  socket.on("sendMessage", (data) => {
    messageQueue.push(data);

    if (!isProcessing) {
      processMessages();
    }
  });

  const processMessages = () => {
    if (messageQueue.length > 0) {
      isProcessing = true;

      const room = messageQueue[0].room;

      socket.to(room).emit("receiveMessage", messageQueue);

      setTimeout(processMessages, 1000);
      messageQueue = [];
    } else {
      isProcessing = false;
    }
  };
};

module.exports = {
  handleConnection,
};
