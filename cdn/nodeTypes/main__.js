// Example usage of the Node class for live streaming

const Node = require("./node/node");

// Create a Node instance with the desired configuration
const maxConnections = 10;
const connectionTimeout = 5000;
const maxConnectionRetries = 3;
const connectionRetryInterval = 2000;
const node = new Node(
  maxConnections,
  connectionTimeout,
  maxConnectionRetries,
  connectionRetryInterval
);

// Set up event listeners
node.on("dataReceived", (peerNode, data) => {
  console.log(`Received data from ${peerNode}:`, data);
});

node.on("connectionEstablished", (peerNode) => {
  console.log(`Connection established with ${peerNode}`);
});

node.on("connectionFailed", (peerNode, error) => {
  console.log(
    `Failed to establish a connection with ${peerNode}. Error:`,
    error
  );
});

// Start peer discovery and listening
node
  .startListening()
  .then(() => {
    console.log("Peer discovery and listening started successfully");

    // Discover peers in the distributed hash table (DHT)
    return node.findPeersInDHT();
  })
  .then((discoveredPeers) => {
    console.log("Peers discovered:", discoveredPeers);

    // Establish connections with the discovered peers
    const peersToConnect = discoveredPeers.slice(0, maxConnections); // Connect with a subset of discovered peers

    return node.establishConnections(peersToConnect);
  })
  .then(() => {
    console.log("Connections established successfully");

    // Simulate data transmission to connected peers
    const connectedPeers = Array.from(node.connectedPeers.keys());
    const dataChunk = { message: "Hello, peers!" };

    connectedPeers.forEach((peerNode) => {
      node.sendChunk(peerNode, dataChunk);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Clean up and stop the live streaming process when finished
setTimeout(() => {
  node.stopListening();
  node.removeAllListeners();
}, 60000); // Stop after 60 seconds
