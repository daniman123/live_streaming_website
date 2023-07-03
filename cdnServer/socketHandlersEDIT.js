const { RTCPeerConnection, RTCSessionDescription } = require("wrtc");
const RoomManager = require("./socketHandlers/roomManager");
const {
  handleViewer,
  handleBroadcast,
} = require("./socketHandlers/eventHandlers");

class SocketHandlers {
  constructor() {
    this.roomManager = new RoomManager();

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

  handleConnection(socket) {
    socket.emit("me", socket.id);

    socket.on("joinRoom", (room) => {
      this.roomManager.addUserToRoom(socket.id, room);
    });

    socket.on("viewer", async ({ room, data }) => {
      await handleViewer(
        socket,
        this.configuration,
        this.roomManager.getRoom(room),
        data
      );
    });

    socket.on("broadcast", async ({ room, data }) => {
      await handleBroadcast(
        socket,
        room,
        data,
        this.roomManager.addStreamToRoom
      );
    });

    // socket.on("terminateBroadcast", () => {
    //   this.handleTerminateBroadcast();
    // });

    socket.on("leaveRoom", async (room) => {
      this.roomManager.removeUserFromRoom(socket.id, room);
    });
  }
}

module.exports = SocketHandlers;
