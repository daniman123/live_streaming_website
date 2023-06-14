let socket;

export const connectWebSocket = () => {
  socket = new WebSocket('ws://your-websocket-url'); // Replace with your WebSocket server URL

  socket.onopen = () => {
    console.log('WebSocket connection established.');
    // You can perform any necessary initialization or send an authentication request here
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    // Handle incoming messages here
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed.');
    // Handle any necessary cleanup or reconnection logic here
  };
};

export const sendWebSocketMessage = (message) => {
  socket.send(JSON.stringify(message));
};

export const closeWebSocketConnection = () => {
  socket.close();
};


export { connectWebSocket, sendWebSocketMessage, closeWebSocketConnection };
