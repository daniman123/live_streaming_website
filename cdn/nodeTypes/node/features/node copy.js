const EventEmitter = require("events");

/**
 * Represents a Node in the peer-to-peer live streaming network.
 */
class Node extends EventEmitter {
  /**
   * Creates a new instance of the Node class.
   * @param {string} nodeId - The unique identifier for the node.
   * @param {object} options - Optional configuration options for the node.
   */
  constructor(nodeId, options = {}) {
    super(); // Call the parent constructor of EventEmitter

    /**
     * The unique identifier for the node.
     * @type {string}
     */
    this.nodeId = nodeId;

    /**
     * An array of peer nodes connected to this node.
     * @type {Array<Node>}
     */
    this.peers = [];

    /**
     * The maximum number of connections to maintain in the connection pool.
     * @type {number}
     */
    this.maxConnections = options.maxConnections || 10;

    /**
     * The timeout duration for connection attempts in milliseconds.
     * @type {number}
     */
    this.connectionTimeout = options.connectionTimeout || 5000;

    /**
     * The maximum number of connection retries.
     * @type {number}
     */
    this.maxConnectionRetries = options.maxConnectionRetries || 3;

    /**
     * The interval between connection retries in milliseconds.
     * @type {number}
     */
    this.connectionRetryInterval = options.connectionRetryInterval || 1000;
  }

  /**
   * Adds a peer node to the list of connected peers.
   * @param {Node} peerNode - The peer node to add.
   */
  addPeer(peerNode) {
    try {
      if (!(peerNode instanceof Node)) {
        throw new Error("Invalid peerNode. Must be an instance of Node class.");
      }

      if (this.peers.includes(peerNode)) {
        throw new Error("Peer node already exists.");
      }

      this.peers.push(peerNode);
      this.emit("peerAdded", peerNode); // Emit 'peerAdded' event

      // Establish connection with the new peer node
      this.establishConnection(peerNode);
    } catch (error) {
      console.error(`Error adding peer: ${error.message}`);
      // You can choose to throw the error further or handle it gracefully.
    }
  }

  /**
   * Removes a peer node from the list of connected peers.
   * @param {Node} peerNode - The peer node to remove.
   */
  removePeer(peerNode) {
    this.peers = this.peers.filter((node) => node !== peerNode);
    this.emit("peerRemoved", peerNode); // Emit 'peerRemoved' event
  }

  /**
   * Establishes a connection with a peer node.
   * @param {Node} peerNode - The peer node to establish a connection with.
   * @param {number} retryCount - The current retry attempt count (internal use only).
   */
  establishConnection(peerNode, retryCount = 0) {
    // Implement the logic to establish a connection with the peer node.
    // Example: initiate connection with `peerNode`

    // Assume connection is established successfully
    this.emit("connectionEstablished", peerNode); // Emit 'connectionEstablished' event

    // Handle disconnection from the peer node
    const handleDisconnect = () => {
      this.emit("connectionLost", peerNode); // Emit 'connectionLost' event

      if (retryCount < this.maxConnectionRetries) {
        // Retry establishing the connection
        setTimeout(() => {
          this.establishConnection(peerNode, retryCount + 1);
        }, this.connectionRetryInterval);
      } else {
        // Max connection retries reached, remove the peer from the connected peers
        this.removePeer(peerNode);
      }
    };

    // Simulate disconnection after a random interval (for demonstration purposes)
    const disconnectTimeout = Math.random() * 5000 + 5000;
    setTimeout(handleDisconnect, disconnectTimeout);
  }

  /**
   * Establishes connections with the peer nodes.
   * This method should be called to initiate the connection process.
   */
  establishConnections() {
    // Connect with known peers in the DHT
    for (const peerNode of this.peers) {
      this.establishConnection(peerNode);
    }

    // Join a DHT network and find new peers
    const discoveredPeers = this.findPeersInDHT(); // Implement DHT peer discovery logic
    for (const peerNode of discoveredPeers) {
      if (!this.peers.includes(peerNode)) {
        this.addPeer(peerNode); // Add new peer to the connected peers
        this.emit("newPeerDiscovered", peerNode); // Emit 'newPeerDiscovered' event
      }
    }
  }

  /**
   * Handles incoming connections from peer nodes.
   * @param {Node} peerNode - The peer node that initiated the incoming connection.
   */
  handleIncomingConnection(peerNode) {
    // Implement the logic to handle incoming connections from peers.
    // Example: accept incoming connection from `peerNode` and perform necessary actions
    this.emit("incomingConnection", peerNode); // Emit 'incomingConnection' event
  }

  /**
   * Finds peers in the Distributed Hash Table (DHT).
   * Replace this method with your DHT peer discovery logic.
   * @returns {Array<Node>} - An array of discovered peer nodes.
   */
  findPeersInDHT() {
    // Implement your DHT peer discovery logic here
    // This method should return an array of discovered peer nodes

    // Example: Dummy implementation returning an empty array
    return [];
  }

  /**
   * Sends a chunk of streaming data to a peer node.
   * @param {Node} peerNode - The peer node to send the data to.
   * @param {any} data - The chunk of streaming data to send.
   */
  sendChunk(peerNode, data) {
    // Implement the logic to send the chunk of streaming data to the peerNode
    this.emit("chunkSent", peerNode, data); // Emit 'chunkSent' event
  }

  /**
   * Receives a chunk of streaming data from a peer node.
   * @param {Node} peerNode - The peer node that sent the data.
   * @param {any} data - The received chunk of streaming data.
   */
  receiveChunk(peerNode, data) {
    // Implement the logic to handle the received chunk of streaming data from the peerNode
    this.emit("chunkReceived", peerNode, data); // Emit 'chunkReceived' event
  }
}

module.exports = Node;
