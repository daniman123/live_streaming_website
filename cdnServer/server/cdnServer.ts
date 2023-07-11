import express from "express";
import compression from "compression";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";
import SocketHandlers from "../socketHandlers/socketEvents";

class CdnServer {
  private app: express.Application;
  private server: http.Server;
  private io: Server;
  private socketHandlers: SocketHandlers;
  private PORT: number;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    this.PORT = Number(process.env.PORT) || 7000;

    this.socketHandlers = new SocketHandlers(); // Create an instance of SocketHandlers

    this.configureMiddlewares();
    this.setupSocketHandlers();
  }

  private configureMiddlewares(): void {
    this.app.use(cors());
    this.app.use(compression());
  }

  private setupSocketHandlers(): void {
    this.io.on("connection", (socket: Socket) => {
      this.socketHandlers.initHandlers(socket);
    });
  }

  public startServer(): void {
    this.server.listen(this.PORT, () => {
      console.log("Server running on port:", this.PORT);
    });
  }

  public start(): void {
    this.startServer();
  }
}

export default CdnServer;
