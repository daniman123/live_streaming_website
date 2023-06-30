const handleConnection = (socket) => {
  console.log("New client connected");
  socket.emit("me", socket.id);

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    socket.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    socket.to(data.to).emit("callAccepted", data.signal);
  });

  // Cleanup on client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // Handle disconnection logic here
  });
};

module.exports = {
  handleConnection,
};
