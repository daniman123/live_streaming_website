const EventHandler = require("./eventHandler");

class Node {
  /**
   * Creates an instance of Node.
   * @param {string} nodeId - The unique identifier for the node.
   * @param {Object} [options] - Optional configuration options.
   * @param {number} maxConnectionRetries - The maximum number of connection retries.
   * @param {number} connectionRetryInterval - The interval between connection retries.
   */

  constructor(nodeId, maxConnectionRetries, connectionRetryInterval) {
    this.connectedPeers = new Map();
    this.connectionPool = new Set();
    this.eventHandler = new EventHandler();

    this.nodeId = nodeId;
    this.maxConnectionRetries = maxConnectionRetries;
    this.connectionRetryInterval = connectionRetryInterval;
    this.peers = new Map();
  }

  /**
   * Adds a peer node to the current node.
   * @param {Node} peerNode - The peer node to add.
   * @throws {TypeError} - If the peerNode is not an instance of the Node class.
   * @throws {Error} - If the peer node already exists.
   */
  addPeer(peerNode) {
    this.validatePeerNode(peerNode);

    this._addPeer(peerNode);
    this.establishConnection(peerNode);
    this.eventHandler.emit("peerAdded", peerNode);
  }

  /**
   * Removes a peer node from the current node.
   * @param {Node} peerNode - The peer node to remove.
   */
  removePeer(peerNode) {
    this._removePeer(peerNode);
    this.eventHandler.emit("peerRemoved", peerNode);
  }

  /**
   * Establishes a connection with a peer node.
   * @param {Node} peerNode - The peer node to establish a connection with.
   * @param {number} [retryCount=0] - The number of connection retries.
   */
  establishConnection(peerNode, retryCount = 0) {
    this.eventHandler.emit("connectionEstablished", peerNode);
    const handleDisconnect = () => {
      this.eventHandler.emit("connectionLost", peerNode);
      if (retryCount < this.maxConnectionRetries) {
        setTimeout(() => {
          this.establishConnection(peerNode, retryCount + 1);
        }, this.connectionRetryInterval);
      } else {
        this.removePeer(peerNode);
      }
    };
    const disconnectTimeout = Math.random() * 1000 + 1000;
    setTimeout(handleDisconnect, disconnectTimeout);
  }

  /**
   * Establishes connections with all peers.
   */
  establishConnections() {
    for (const [peerNode] of this.peers) {
      this.establishConnection(peerNode);
    }

    const discoveredPeers = this.findPeersInDHT();
    for (const peerNode of discoveredPeers) {
      if (!this.peers.has(peerNode)) {
        this.addPeer(peerNode);
        this.eventHandler.emit("newPeerDiscovered", peerNode);
      }
    }
  }

  /**
   * Handles an incoming connection from a peer node.
   * @param {Node} peerNode - The peer node from which the connection is incoming.
   */
  handleIncomingConnection(peerNode) {
    this.eventHandler.emit("incomingConnection", peerNode);
  }

  /**
   * Finds peers in the Distributed Hash Table (DHT).
   * @returns {Node[]} - An array of peer nodes found in the DHT.
   */
  findPeersInDHT() {
    return [];
  }

  /**
   * Sends a chunk of data to a peer node.
   * @param {Node} peerNode - The peer node to send the chunk to.
   * @param {*} data - The data to be sent.
   */
  sendChunk(peerNode, data) {
    this.eventHandler.emit("chunkSent", peerNode, data);
  }

  /**
   * Receives a chunk of data from a peer node.
   * @param {Node} peerNode - The peer node from which the chunk is received.
   * @param {*} data - The received data.
   */
  receiveChunk(peerNode, data) {
    this.eventHandler.emit("chunkReceived", peerNode, data);
  }

  /**
   * Validates if the provided peer node is an instance of the Node class.
   * @param {Node} peerNode - The peer node to validate.
   * @throws {TypeError} - If the peerNode is not an instance of the Node class.
   * @private
   */
  validatePeerNode(peerNode) {
    if (!(peerNode instanceof Node)) {
      throw new TypeError(
        "Invalid peerNode. Must be an instance of Node class."
      );
    }
  }

  /**
   * Adds a peer node to the internal peers map.
   * @param {Node} peerNode - The peer node to add.
   * @private
   */
  _addPeer(peerNode) {
    this.peers.set(peerNode, { isConnected: false });
  }

  /**
   * Removes a peer node from the internal peers map.
   * @param {Node} peerNode - The peer node to remove.
   * @private
   */
  _removePeer(peerNode) {
    this.peers.delete(peerNode);
  }
}

module.exports = Node;
