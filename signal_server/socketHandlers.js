const {
  createRoom,
  deleteRoom,
  getUsersInRoom,
  broadcastToRoom,
} = require("./roomManager");

function handleJoin(socket) {
  socket.on("join", (room) => {
    socket.join(room);
    createRoom(room);
  });
}

function handleOffer(socket) {
  socket.on("offer", (room, offer) => {
    socket.to(room).emit("offer", room, offer);
    console.log("Offer sent to room:", room);
  });
}

function handleAnswer(socket) {
  socket.on("answer", (room, answer) => {
    socket.to(room).emit("answer", room, answer);
    console.log("Answer sent to room:", room);
  });
}

function handleIceCandidate(socket) {
  socket.on("ice-candidate", (room, candidate) => {
    socket.to(room).emit("ice-candidate", room, candidate);
    console.log("ICE candidate sent to room:", room);
  });
}

function handleSignal(socket) {
  socket.on("signal", (room, signal) => {
    socket.to(room).emit("signal", room, signal);
    console.log("Signal sent to room:", room);
  });
}

function handleStream(socket) {
  socket.on("stream", (room, stream) => {
    socket.to(room).emit("stream", room, stream);
    console.log("Stream sent to room:", room);
  });
}

module.exports = {
  handleJoin,
  handleOffer,
  handleAnswer,
  handleIceCandidate,
  handleSignal,
  handleStream,
};
