import { Socket } from "socket.io";
import RoomManager from "../managers/roomManager";
import { handleViewer, handleBroadcast } from "./eventHandlers";

/**
 * Class representing socket handlers.
 */
class SocketEvents {
  private roomManager: RoomManager;

  constructor() {
    this.roomManager = new RoomManager();
  }

  /**
   * Initializes the socket event handlers.
   * @param {Socket} socket - The socket object.
   */
  public initHandlers(socket: Socket): void {
    socket.on("joinRoom", (room: string) => this.handleJoinRoom(socket, room));

    socket.on("viewer", ({ room, data }: { room: string; data: any }) =>
      handleViewer(socket, this.roomManager.getRoom(room), data)
    );

    socket.on("broadcast", ({ room, data }: { room: string; data: any }) =>
      handleBroadcast(socket, room, data, this.roomManager.addStreamToRoom)
    );

    socket.on("terminateBroadcast", async (room: string) => {
      this.handleTerminateBroadcast(room);
    });

    socket.on("leaveRoom", async (room: string) =>
      this.handleLeaveRoom(socket, room)
    );

    socket.on("getViewCount", async (room: string) => {
      const vc = this.roomManager.getRoomUserCount(room);
      if (vc <= 0) {
        socket.emit("concurrentViewers", 0);
      } else {
        socket.emit("concurrentViewers", vc - 1);
      }
    });
  }

  /**
   * Handles the "joinRoom" event.
   * @param {Socket} socket - The socket object.
   * @param {string} room - The room name.
   */
  private handleJoinRoom(socket: Socket, room: string): void {
    const userId = socket.id;
    this.addUserToRoom(userId, room);
  }

  private async handleTerminateBroadcast(room: string): Promise<void> {
    this.roomManager.deleteRoom(room);
  }

  /**
   * Handles the "leaveRoom" event.
   * @param {Socket} socket - The socket object.
   * @param {string} room - The room name.
   */
  private handleLeaveRoom(socket: Socket, room: string): void {
    const userId = socket.id;
    this.removeUserFromRoom(userId, room);
  }

  /**
   * Adds a user to a room.
   * @param {string} userId - The user ID.
   * @param {string} room - The room name.
   */
  private addUserToRoom(userId: string, room: string): void {
    this.roomManager.addUserToRoom(userId, room);
  }

  /**
   * Removes a user from a room.
   * @param {string} userId - The user ID.
   * @param {string} room - The room name.
   */
  private removeUserFromRoom(userId: string, room: string): void {
    this.roomManager.removeUserFromRoom(userId, room);
  }
}

export default SocketEvents;
