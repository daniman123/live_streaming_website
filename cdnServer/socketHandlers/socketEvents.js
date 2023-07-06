/**
 * @typedef {import('socket.io').Socket} Socket
 */
const RoomManager = require("../managers/roomManager");
const { handleViewer, handleBroadcast } = require("./eventHandlers");

/**
 * Class representing socket handlers.
 */
class SocketEvents {
  constructor() {
    this.roomManager = new RoomManager();
  }

  /**
   * Initializes the socket event handlers.
   * @param {Socket} socket - The socket object.
   */
  initHandlers(socket) {
    socket.on("joinRoom", (room) => this.handleJoinRoom(socket, room));
    socket.on("viewer", async ({ room, data }) =>
      this.handleViewer(socket, room, data)
    );
    socket.on("broadcast", async ({ room, data }) =>
      this.handleBroadcast(socket, room, data)
    );

    socket.on("terminateBroadcast", async (room) => {

      this.handleTerminateBroadcast(room);
    });

    socket.on("leaveRoom", async (room) => this.handleLeaveRoom(socket, room));
  }

  /**
   * Handles the "joinRoom" event.
   * @param {Socket} socket - The socket object.
   * @param {string} room - The room name.
   */
  handleJoinRoom(socket, room) {
    const userId = socket.id;
    this.addUserToRoom(userId, room);
  }

  /**
   * Handles the "viewer" event.
   * @param {Socket} socket - The socket object.
   * @param {string} room - The room name.
   * @param {any} data - The viewer data.
   */
  async handleViewer(socket, room, data) {
    const roomObj = this.roomManager.getRoom(room);
    await handleViewer(socket, roomObj, data);
  }

  /**
   * Handles the "broadcast" event.
   * @param {Socket} socket - The socket object.
   * @param {string} room - The room name.
   * @param {any} data - The broadcast data.
   */
  async handleBroadcast(socket, room, data) {
    const addStreamToRoom = this.roomManager.addStreamToRoom;
    await handleBroadcast(socket, room, data, addStreamToRoom);
  }

  async handleTerminateBroadcast(room) {
    this.roomManager.deleteRoom(room)
  }

  /**
   * Handles the "leaveRoom" event.
   * @param {Socket} socket - The socket object.
   * @param {string} room - The room name.
   */
  handleLeaveRoom(socket, room) {
    const userId = socket.id;
    this.removeUserFromRoom(userId, room);
  }

  /**
   * Adds a user to a room.
   * @param {string} userId - The user ID.
   * @param {string} room - The room name.
   */
  addUserToRoom(userId, room) {
    this.roomManager.addUserToRoom(userId, room);
  }

  /**
   * Removes a user from a room.
   * @param {string} userId - The user ID.
   * @param {string} room - The room name.
   */
  removeUserFromRoom(userId, room) {
    this.roomManager.removeUserFromRoom(userId, room);
  }
}

module.exports = SocketEvents;
