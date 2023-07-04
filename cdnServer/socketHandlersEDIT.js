/**
 * @typedef {import('socket.io').Socket} Socket
 * @typedef {import('wrtc').RTCPeerConnection} RTCPeerConnection
 * @typedef {import('wrtc').RTCSessionDescription} RTCSessionDescription
 */

const { RTCPeerConnection, RTCSessionDescription } = require("wrtc");
const RoomManager = require("./socketHandlers/roomManager");
const {
  handleViewer,
  handleBroadcast,
} = require("./socketHandlers/eventHandlers");

/**
 * Class representing socket handlers.
 */
class SocketHandlers {
  constructor() {
    /**
     * Instance of RoomManager.
     * @type {RoomManager}
     */
    this.roomManager = new RoomManager();

    /**
     * Configuration for RTCPeerConnection.
     * @type {Object}
     */
    this.configuration = {
      iceServers: [
        {
          urls: [
            "stun:stun1.1.google.com:19302",
            "stun:stun2.1.google.com:19302",
          ],
        },
      ],
    };
  }

  /**
   * Handles the connection event for a socket.
   * @param {Socket} socket - The socket object.
   */
  handleConnection(socket) {
    socket.emit("me", socket.id);

    socket.on("joinRoom", (room) => {
      /**
       * Adds a user to a room.
       * @param {string} userId - The user ID.
       * @param {string} room - The room name.
       */
      this.roomManager.addUserToRoom(socket.id, room);
    });

    socket.on("viewer", async ({ room, data }) => {
      /**
       * Handles viewer event.
       * @param {Socket} socket - The socket object.
       * @param {Object} configuration - The RTC configuration.
       * @param {Room} room - The room object.
       * @param {any} data - The viewer data.
       */
      await handleViewer(
        socket,
        this.configuration,
        this.roomManager.getRoom(room),
        data
      );
    });

    socket.on("broadcast", async ({ room, data }) => {
      /**
       * Handles broadcast event.
       * @param {Socket} socket - The socket object.
       * @param {Object} configuration - The RTC configuration.
       * @param {string} room - The room name.
       * @param {any} data - The broadcast data.
       * @param {Function} addStreamToRoom - The function to add a stream to a room.
       */
      await handleBroadcast(
        socket,
        this.configuration,
        room,
        data,
        this.roomManager.addStreamToRoom
      );
    });

    socket.on("leaveRoom", async (room) => {
      /**
       * Removes a user from a room.
       * @param {string} userId - The user ID.
       * @param {string} room - The room name.
       */
      this.roomManager.removeUserFromRoom(socket.id, room);
    });
  }
}

module.exports = SocketHandlers;
