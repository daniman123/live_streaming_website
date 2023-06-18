/**
 * The `Node` class represents a network node in a distributed system.
 * It provides functionality for managing connections, discovering peers, and transmitting data.
 *
 * @param {string} nodeId - The identifier or address of the node.
 * @param {Object} options - Optional configuration options for the node.
 *   @property {number} maxConnections - The maximum number of connections allowed.
 *   @property {number} connectionTimeout - The timeout value in milliseconds for establishing a connection.
 *   @property {number} maxConnectionRetries - The maximum number of connection retries.
 *   @property {number} connectionRetryInterval - The interval in milliseconds between connection retries.
 */
const EventHandler = require("./features/eventHandler");
const ConnectionManager = require("./features/connectionManager");
const PeerDiscovery = require("./features/peerDiscovery");
const DataTransmission = require("./features/dataTransmission");

class Node {
  constructor(nodeId, options = {}) {
    this.nodeId = nodeId;
    this.eventHandler = new EventHandler();
    this.connectionManager = new ConnectionManager(
      options.maxConnections,
      options.connectionTimeout,
      options.maxConnectionRetries,
      options.connectionRetryInterval
    );
    this.peerDiscovery = new PeerDiscovery();
    this.dataTransmission = new DataTransmission();

    this.setupEventHandlers();
  }

  /**
   * Sets up event handlers for the node.
   */
  setupEventHandlers() {
    this.eventHandler.on("peerAdded", (peerNode) => {
      this.connectionManager.establishConnection(peerNode);
    });

    this.eventHandler.on("connectionLost", (peerNode) => {
      this.connectionManager.removePeer(peerNode);
    });

    this.eventHandler.on("newPeerDiscovered", (peerNode) => {
      this.connectionManager.addPeer(peerNode);
    });

    // Add other event handlers as needed
  }

  /**
   * Adds a peer node to the connection manager.
   * @param {string} peerNode - The identifier or address of the peer node to add.
   */
  addPeer(peerNode) {
    this.connectionManager.addPeer(peerNode);
  }

  /**
   * Removes a peer node from the connection manager.
   * @param {string} peerNode - The identifier or address of the peer node to remove.
   */
  removePeer(peerNode) {
    this.connectionManager.removePeer(peerNode);
  }

  /**
   * Establishes connections with peer nodes.
   */
  establishConnections() {
    this.connectionManager.establishConnections();
  }

  /**
   * Handles an incoming connection from a peer node.
   * @param {string} peerNode - The identifier or address of the peer node.
   */
  handleIncomingConnection(peerNode) {
    this.connectionManager.handleIncomingConnection(peerNode);
  }

  /**
   * Finds peer nodes in the Distributed Hash Table (DHT).
   * @returns {Array} An array of discovered peer nodes.
   */
  findPeersInDHT() {
    return this.peerDiscovery.findPeersInDHT();
  }

  /**
   * Sends a data chunk to a peer node.
   * @param {string} peerNode - The identifier or address of the peer node to send the data chunk to.
   * @param {*} data - The data chunk to send.
   */
  sendChunk(peerNode, data) {
    this.dataTransmission.sendChunk(peerNode, data);
  }

  /**
   * Receives a data chunk from a peer node.
   * @param {string} peerNode - The identifier or address of the peer node that sent the data chunk.
   * @param {*} data - The received data chunk.
   */
  receiveChunk(peerNode, data) {
    this.dataTransmission.receiveChunk(
      peerNode,

      data
    );
  }
}

module.exports = Node;
