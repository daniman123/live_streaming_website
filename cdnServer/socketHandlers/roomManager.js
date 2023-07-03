class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  joinRoom(socket, room) {
    socket.join(room, (error) => {
      console.log(`User: ${socket.id}, joined room: ${room}`);
      if (error) {
        console.error("Error joining room:", error);
      } else {
        this.addUserToRoom(socket.id, room);
        if (this.getRoomUserCount(room) > 1) {
          socket.to(room).emit("joins", socket.id);
        }
      }
    });
  }

  getRoom(room) {
    if (this.rooms.has(room)) {
      return this.rooms.get(room);
    }
    return new Error("Room not found");
  }

  addStreamToRoom = (room, stream) => {
    console.log(
      "🚀 ~ file: roomManager.js:29 ~ RoomManager ~ addStreamToRoom ~ room:",
      room
    );
    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    this.rooms.get(room).add(stream);
    console.log(
      "🚀 ~ file: roomManager.js:32 ~ RoomManager ~ addStreamToRoom ~ this.rooms.get(room):",
      this.rooms.get(room)
    );
  };

  addUserToRoom(userId, room) {
    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    this.rooms.get(room).add(userId);
  }

  removeUserFromAllRooms(userId, callback) {
    this.rooms.forEach((users, room) => {
      if (users.has(userId)) {
        this.removeUserFromRoom(userId, room);
        callback(room);
      }
    });
  }

  removeUserFromRoom(userId, room) {
    if (this.rooms.has(room)) {
      this.rooms.get(room).delete(userId);
      console.log("User:", userId, "has been removed from room:", room);
      if (this.getRoomUserCount(room) === 0) {
        this.rooms.delete(room);
        console.log("Room:", room, "is empty");
        console.log("Room:", room, "is deleted");
      }
    }
  }

  getRoomUserCount(room) {
    return this.rooms.get(room)?.size || 0;
  }
}

module.exports = RoomManager;
