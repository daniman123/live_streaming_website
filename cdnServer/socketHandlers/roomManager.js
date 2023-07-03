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
        if (this.getRoomUserCount(room) === 0) {
          this.rooms.delete(room);
        }
      }
    }
  
    getRoomUserCount(room) {
      return this.rooms.get(room)?.size || 0;
    }
  }
  
  module.exports = RoomManager;
  