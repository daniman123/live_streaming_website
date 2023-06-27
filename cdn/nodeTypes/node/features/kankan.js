// Import required dependencies
const wrtc = require("wrtc");
const { RTCPeerConnection, RTCSessionDescription } = wrtc;
const { v4: uuidv4 } = require("uuid");

// Create a Kankan class
class Kankan {
  constructor() {
    this.connections = new Map(); // Track active connections
    this.connectionId = null; // Connection identifier
  }

  // Initialize peer discovery
  async discover() {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const constraints = { optional: [{ RtpDataChannels: true }] };

    // Create a new peer connection
    const connection = new RTCPeerConnection(configuration, constraints);
    this.connectionId = uuidv4(); // Generate connection identifier
    console.log("Connection ID:", this.connectionId);
    this.connections.set(this.connectionId, []);

    // Handle incoming data channel
    connection.ondatachannel = ({ channel }) => {
      // Store the incoming data channel
      this.connections.get(this.connectionId).push(channel);

      // Handle received data
      channel.onmessage = ({ data }) => {
        console.log(`Received data: ${data}`);
      };
    };

    // Create a new data channel
    const channel = connection.createDataChannel("kankan");

    // Handle peer connection establishment
    connection.onicecandidate = ({ candidate }) => {
      if (candidate === null) {
        // Peer connection established
        console.log("Peer connection established");

        // Announce own presence to other peers
        this.connections.get(this.connectionId).forEach((channel) => {
          channel.send("Hello, peers!");
        });
      }
    };

    // Generate an SDP offer
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);

    // Return the generated offer
    return {
      connection,
      offer: connection.localDescription,
    };
  }

  // Connect to a discovered peer
  async connect(offer) {
    const connection = new RTCPeerConnection();

    // Handle incoming data channel
    connection.ondatachannel = ({ channel }) => {
      // Store the incoming data channel
      this.connections.get(this.connectionId).push(channel);

      // Handle received data
      channel.onmessage = ({ data }) => {
        console.log(`Received data: ${data}`);
      };
    };

    // Handle peer connection establishment
    connection.onicecandidate = async ({ candidate }) => {
      if (candidate === null) {
        // Peer connection established
        console.log("Peer connection established");

        // Announce own presence to other peers
        this.connections.get(this.connectionId).forEach((channel) => {
          channel.send("Hello, peers!");
          console.log(222222);
        });
      }
    };

    // Set remote offer description
    await connection.setRemoteDescription(new RTCSessionDescription(offer));

    // Generate an SDP answer
    const answer = await connection.createAnswer();
    await connection.setLocalDescription(answer);

    // Return the generated answer
    return connection.localDescription;
  }
}

const kankan1 = new Kankan();
const kankan2 = new Kankan();

// Discover peers in parallel
Promise.all([kankan1.discover(), kankan2.discover()])
  .then(([offer1, offer2]) => {
    // Connect to discovered peers in parallel
    Promise.all([kankan1.connect(offer2.offer), kankan2.connect(offer1.offer)])
      .then(([answer1, answer2]) => {
        // Complete the connection for each instance
        kankan1.connections.forEach((channels) => {
          channels.forEach((channel) => {
            channel.send(JSON.stringify(answer1));
          });
        });

        kankan2.connections.forEach((channels) => {
          channels.forEach((channel) => {
            channel.send(JSON.stringify(answer2));
          });
        });
      })
      .catch((error) => {
        console.error("Error connecting to peers:", error);
      });
  })
  .catch((error) => {
    console.error("Error discovering peers:", error);
  });
