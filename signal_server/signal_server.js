const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 7000; // Choose a port for the signaling server

// Handle socket connection
io.on("connection", (socket) => {
  // Handle "join" event
  socket.on("join", (room) => {
    socket.join(room);
  });

  // Handle "offer" event
  socket.on("offer", (room, offer) => {
    socket.to(room).emit("offer", offer);
    console.log("Offer sent to room:", room);
  });

  // Handle "answer" event
  socket.on("answer", (room, answer) => {
    socket.to(room).emit("answer", answer);
    console.log("Answer sent to room:", room);
  });

  // Handle "ice-candidate" event
  socket.on("ice-candidate", (room, candidate) => {
    socket.to(room).emit("ice-candidate", candidate);
    console.log("ICE candidate sent to room:", room);
  });
});

// Start the signaling server
http.listen(PORT, () => {
  console.log(`Signaling server listening on port ${PORT}`);
});
