const handleConnection = (socket, answerers) => {
  socket.emit("me", socket.id);

  socket.on("joinRoom", (room) => {
    console.log(`User: ${socket.id}, joined room: ${room}`);
    answerers.push(socket);
    if (answerers.length > 1) {
      socket.to(room).emit("joins", socket.id);
    }
    socket.join(room, (error) => {
      console.log("🚀 ~ file: socketHandlers.js:7 ~ socket.join ~ room:", room);
      if (error) {
        console.error("Error joining room:", error);
      }
    });
  });

  socket.on("answer", ({ room, answer }) => {
    socket.to(room).emit("answerOffer", answer);
  });

  socket.on("broadcast", ({ room: roomName, offer: offer }) => {
    socket.to(roomName).emit("broadcastMessage", offer);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    answerers = answerers.filter((answerer) => answerer.id !== socket.id);
  });
};

module.exports = {
  handleConnection,
};
