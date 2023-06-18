import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const signalingServerURL = 'https://localhost:8000/webrtc'; // Replace with your signaling server URL

const socket = io(signalingServerURL);
let peer;

// Signaling channel events
socket.on('connect', () => {
  console.log('Connected to signaling server');
});

socket.on('signal', (data) => {
  if (peer) {
    peer.signal(data);
  }
});

// Create a new WebRTC peer
function createPeer(initiator) {
  peer = new SimplePeer({ initiator });

  // Data channel events
  peer.on('signal', (data) => {
    socket.emit('signal', data);
  });

  peer.on('connect', () => {
    console.log('Connected to peer');
  });

  peer.on('data', (data) => {
    console.log('Received data:', data);
  });
}

// Connect to a remote peer
function connectToRemotePeer() {
  // Replace with your logic for obtaining signaling data from the remote peer
  const signalingDataFromRemote = {};

  createPeer(false);
  peer.signal(signalingDataFromRemote);
}

// Send data to the remote peer
function sendDataToRemotePeer(data) {
  if (peer && peer.connected) {
    peer.send(data);
  } else {
    console.log('Not connected to a peer');
  }
}

export { connectToRemotePeer, sendDataToRemotePeer };
