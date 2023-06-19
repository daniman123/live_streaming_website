const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

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
    this.io.on("connection", this.handleSocketConnection.bind(this));
  }

  handleSocketConnection(socket) {
    socket.on("join", this.handleJoin.bind(this, socket));
    socket.on("offer", this.handleOffer.bind(this, socket));
    socket.on("answer", this.handleAnswer.bind(this, socket));
    socket.on("ice-candidate", this.handleIceCandidate.bind(this, socket));
    socket.on("signal", this.handleSignal.bind(this, socket));
    socket.on("stream", this.handleStream.bind(this, socket));
  }

  handleJoin(socket, room) {
    socket.join(room);
  }

  handleOffer(socket, room, offer) {
    socket.to(room).emit("offer", offer);
    console.log("Offer sent to room:", room);
  }

  handleAnswer(socket, room, answer) {
    socket.to(room).emit("answer", answer);
    console.log("Answer sent to room:", room);
  }

  handleIceCandidate(socket, room, candidate) {
    socket.to(room).emit("ice-candidate", candidate);
    console.log("ICE candidate sent to room:", room);
  }

  handleSignal(socket, room, signal) {
    socket.to(room).emit("signal", signal);
    console.log("Signal sent to room:", room);
  }

  handleStream(socket, room, streamData) {
    socket.to(room).emit("stream", streamData);
    console.log("Stream sent to room:", room);
  }

  start() {
    this.server.listen(this.PORT, () => {
      console.log("Signaling server listening on port", this.PORT);
    });
  }
}

const signalingServer = new SignalingServer(7000);
signalingServer.start();
