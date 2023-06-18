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

// Add any additional server configuration or middleware if required

io.on("connection", (socket) => {
  // Handle "join" event
  socket.on("join", (room) => {
    socket.join(room);
  });

  // Handle "offer" event
  socket.on("offer", (room, offer) => {
    socket.to(room).emit("offer", "offer");
    console.log("🚀 ~ file: signal_server.js:24 ~ socket.on ~ offer:", "offer");
  });

  // Handle "answer" event
  socket.on("answer", (room, answer) => {
    socket.to(room).emit("answer", answer);
  });

  // Handle "ice-candidate" event
  socket.on("ice-candidate", (room, candidate) => {
    socket.to(room).emit("ice-candidate", candidate);
  });
});

// Start the signaling server
http.listen(PORT, () => {
  console.log(`Signaling server listening on port ${PORT}`);
});
