const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const {
  handleJoin,
  handleOffer,
  handleAnswer,
  handleIceCandidate,
  handleSignal,
  handleStream,
} = require("./socketHandlers");

class SignalingServer {
  constructor(port) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    this.PORT = port;
    this.initializeSocketEvents();
  }

  initializeSocketEvents() {
    this.io.on("connection", (socket) => {
      socket.emit("userId", socket.id);
      handleJoin(socket);
      handleOffer(socket);
      handleAnswer(socket);
      handleIceCandidate(socket);
      handleSignal(socket);
      handleStream(socket);
    });
  }

  start() {
    this.server.listen(this.PORT, () => {
      console.log("Signaling server listening on port", this.PORT);
    });
  }
}

module.exports = { SignalingServer };
