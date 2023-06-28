const handleConnection = (socket) => {
  let messageQueue = []; // Array to store incoming messages
  let isProcessing = false; // Flag to track if messages are being processed

  socket.on("joinRoom", (data) => {
    socket.join(data, (error) => {
      if (error) {
        console.error("Error joining room:", error);
      }
    });
  });

  socket.on("sendMessage", (data) => {
    messageQueue.push(data); // Add incoming message to the queue

    if (!isProcessing) {
      processMessages(); // Start processing messages if not already started
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
      isProcessing = false; // Reset the flag as there are no pending messages
    }
  };
};

module.exports = {
  handleConnection,
};
