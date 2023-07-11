class RoomManager {
  private rooms: Map<string, Set<any>>;

  constructor() {
    this.rooms = new Map();
  }

  public joinRoom(socket: any, room: string): void {
    socket.join(room, (error: any) => {
      console.log(`User: ${socket.id}, joined room: ${room}`);
      if (error) {
        console.error("Error joining room:", error);
      } else {
        this.addUserToRoom(socket.id, room);
      }
    });
  }

  public getRoom(room: string): Set<any> {
    if (!this.rooms.has(room)) {
      throw new Error("Room not found");
    }
    return this.rooms.get(room)!;
  }

  public addStreamToRoom = (room: string, stream: any): void => {
    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    this.rooms.get(room)!.add(stream);
  };

  public addUserToRoom(userId: any, room: string): void {
    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    this.rooms.get(room)!.add(userId);
  }

  public removeUserFromAllRooms(
    userId: any,
    callback: (room: string) => void
  ): void {
    this.rooms.forEach((users, room) => {
      if (users.has(userId)) {
        this.removeUserFromRoom(userId, room);
        callback(room);
      }
    });
  }

  public removeUserFromRoom(userId: any, room: string): void {
    if (this.rooms.has(room)) {
      this.rooms.get(room)!.delete(userId);
      console.log("User:", userId, "has been removed from room:", room);
      if (this.getRoomUserCount(room) === 0) {
        this.rooms.delete(room);
        console.log("Room:", room, "is empty");
        console.log("Room:", room, "is deleted");
      }
    }
  }

  public getRoomUserCount(room: string): number {
    return this.rooms.get(room)?.size || 0;
  }

  public deleteRoom(room: string): void {
    if (this.rooms.has(room)) {
      this.rooms.delete(room);
      console.log("Room:", room, "is deleted");
    }
  }
}

export default RoomManager;
