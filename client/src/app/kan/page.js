"use client";

import React, { Component } from "react";

// Import required dependencies
const { RTCPeerConnection, RTCSessionDescription } = window;

// Create a Kankan class
class Kankan {
  constructor() {
    this.connections = {}; // Track active connections
  }

  // Initialize peer discovery
  async discover() {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const constraints = { optional: [{ RtpDataChannels: true }] };

    // Create a new peer connection
    const connection = new RTCPeerConnection(configuration, constraints);
    this.connections[connection] = [];

    // Handle incoming data channel
    connection.ondatachannel = ({ channel }) => {
      // Store the incoming data channel
      this.connections[connection].push(channel);

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
        this.connections[connection].forEach((channel) => {
          channel.send("Hello, peers!");
        });
      }
    };

    // Generate an SDP offer
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);

    // Return the generated offer
    return connection.localDescription;
  }

  // Connect to a discovered peer
  // Connect to a discovered peer
async connect(offer) {
    const connection = new RTCPeerConnection();
  
    // Handle incoming data channel
    connection.ondatachannel = ({ channel }) => {
      // Store the incoming data channel
      this.connections[connection].push(channel);
  
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
        this.connections[connection].forEach((channel) => {
          channel.send("Hello, peers!");
        });
      }
    };
  
    // Add the remote offer description
    await connection.setRemoteDescription(offer);
  
    // Generate an SDP answer
    const answer = await connection.createAnswer();
    await connection.setLocalDescription(answer);
  
    // Return the generated answer
    return connection.localDescription;
  }
  
}

class YourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: null,
      answer: null,
    };

    this.kankan = new Kankan();
  }

  componentDidMount() {
    // Discover peers
    this.kankan
      .discover()
      .then((offer) => {
        // Set the offer in the component state
        this.setState({ offer });

        // Connect to discovered peer
        this.kankan.connect(offer).then((answer) => {
          // Set the answer in the component state
          this.setState({ answer });

          // Receive the answer and complete the connection
          Object.keys(this.kankan.connections).forEach((connectionId) => {
            const connection = this.kankan.connections[connectionId];
            connection.setRemoteDescription(
              new RTCSessionDescription({
                type: "offer",
                sdp: answer.sdp,
              })
            );
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    // Render your component JSX here
    return <div>{/* Your component JSX */}</div>;
  }
}

export default YourComponent;
