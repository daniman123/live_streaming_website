const express = require("express");
const compression = require("compression");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { handleConnection } = require("./socketHandlers");

class ChatServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    this.PORT = process.env.PORT || 3001;
  }

  configureMiddlewares() {
    this.app.use(cors());
    this.app.use(compression());
  }

  setupSocketHandlers() {
    this.io.on("connection", handleConnection);
  }

  startServer() {
    this.server.listen(this.PORT, () => {
      console.log("Server running on port:", this.PORT);
    });
  }

  start() {
    this.configureMiddlewares();
    this.setupSocketHandlers();
    this.startServer();
  }
}

module.exports = ChatServer;
