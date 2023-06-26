const rooms = new Map(); // Map to store room data

function createRoom(roomName) {
  if (rooms.has(roomName)) {
    // Room already exists
    return false;
  }

  rooms.set(roomName, new Set());
  return true;
}

function deleteRoom(roomName) {
  if (!rooms.has(roomName)) {
    // Room does not exist
    return false;
  }

  rooms.delete(roomName);
  return true;
}

function getUsersInRoom(roomName) {
  if (!rooms.has(roomName)) {
    // Room does not exist
    return [];
  }

  return Array.from(rooms.get(roomName));
}

function broadcastToRoom(roomName, message) {
  if (!rooms.has(roomName)) {
    // Room does not exist
    return false;
  }

  const users = rooms.get(roomName);
  for (const userSocket of users) {
    userSocket.emit('message', message);
  }

  return true;
}

module.exports = { createRoom, deleteRoom, getUsersInRoom, broadcastToRoom };
