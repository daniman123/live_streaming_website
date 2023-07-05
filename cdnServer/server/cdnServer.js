const express = require("express");
const compression = require("compression");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const SocketHandlers = require("../socketHandlers/socketEvents");

class CdnServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    this.PORT = process.env.PORT || 7000;

    this.socketHandlers = new SocketHandlers(); // Create an instance of SocketHandlers

    this.configureMiddlewares();
    this.setupSocketHandlers();
  }

  configureMiddlewares() {
    this.app.use(cors());
    this.app.use(compression());
  }

  setupSocketHandlers() {
    this.io.on("connection", (socket) => {
      this.socketHandlers.initHandlers(socket);
    });
  }

  startServer() {
    this.server.listen(this.PORT, () => {
      console.log("Server running on port:", this.PORT);
    });
  }

  start() {
    this.startServer();
  }
}

module.exports = CdnServer;
