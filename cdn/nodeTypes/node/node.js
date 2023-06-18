const EventHandler = require("./features/eventHandler");
const ConnectionManager = require("./features/connectionManager");
const PeerDiscovery = require("./features/peerDiscovery");
const DataTransmission = require("./features/dataTransmission");

/**
 * Represents a Node in a network.
 */
class Node {
  /**
   * Create a Node.
   * @param {number} maxConnections - The maximum number of connections allowed.
   * @param {number} connectionTimeout - The timeout for establishing a connection.
   * @param {number} maxConnectionRetries - The maximum number of connection retries.
   * @param {number} connectionRetryInterval - The interval between connection retries.
   */
  constructor(
    maxConnections,
    connectionTimeout,
    maxConnectionRetries,
    connectionRetryInterval
  ) {
    this.connectedPeers = new Map();
    this.connectionPool = new Set();
    this.eventHandler = new EventHandler();
    this.connectionManager = new ConnectionManager(
      maxConnections,
      connectionTimeout,
      maxConnectionRetries,
      connectionRetryInterval
    );

    const options = {
      host: "83.89.72.111",
      ports: [4000, 5000, 6000], // Ephemeral port: 4000, Non-ephemeral ports: 5000, 6000
    };

    this.peerDiscovery = new PeerDiscovery(options);

    this.dataTransmission = new DataTransmission();
  }

  // Methods for event handling

  /**
   * Emit an event with optional arguments.
   * @param {string} event - The name of the event to emit.
   * @param {...any} args - Optional arguments to pass to the event listeners.
   */
  emit(event, ...args) {
    this.eventHandler.emit(event, ...args);
  }

  /**
   * Register an event listener.
   * @param {string} event - The name of the event to listen for.
   * @param {Function} listener - The event listener function.
   */
  on(event, listener) {
    this.eventHandler.on(event, listener);
  }

  /**
   * Register a one-time event listener.
   * @param {string} event - The name of the event to listen for.
   * @param {Function} listener - The event listener function.
   */
  once(event, listener) {
    this.eventHandler.once(event, listener);
  }

  /**
   * Remove an event listener.
   * @param {string} event - The name of the event to remove the listener from.
   * @param {Function} listener - The event listener function to remove.
   */
  removeListener(event, listener) {
    this.eventHandler.removeListener(event, listener);
  }

  /**
   * Remove all event listeners for a specific event.
   * @param {string} event - The name of the event to remove all listeners from.
   */
  removeAllListeners(event) {
    this.eventHandler.removeAllListeners(event);
  }

  /**
   * Remove all event listeners.
   */
  removeAllListeners() {
    this.eventHandler.removeAllListeners();
  }

  // Methods for connection management

  /**
   * Establish a connection with a peer node.
   * @param {Object} peerNode - The peer node to establish a connection with.
   * @param {number} retryCount - The number of connection retries attempted.
   * @returns {Promise} A Promise that resolves when the connection is established.
   */
  establishConnection(peerNode, retryCount) {
    return this.connectionManager.establishConnection(peerNode, retryCount);
  }

  /**
   * Attempt to connect with a peer node.
   * @param {Object} peerNode - The peer node to attempt a connection with.
   * @returns {Promise} A Promise that resolves when the connection attempt is made.
   */
  attemptConnection(peerNode) {
    return this.connectionManager.attemptConnection(peerNode);
  }

  /**
   * Add a peer to the connected peers map.
   * @param {Object} connection - The connection object representing the peer.
   */
  addPeer(connection) {
    this.connectedPeers.set(connection.id, connection);
  }

  /**
   * Remove a peer from the connected peers map.
   * @param {Object} peerNode - The peer node to remove from the connected peers.
   */
  removePeer(peerNode) {
    this.connectedPeers.delete(peerNode);
  }

  /**
   * Get a connection from the connection pool.
   * @returns {Object|null} A connection object from the pool, or null if the pool is empty.
   */
  getConnectionFromPool() {
    const iterator = this.connectionPool.values();
    const { value, done } = iterator.next();
    if (!done) {
      this.connectionPool.delete(value);
      return value;
    }
    return null;
  }

  /**
   * Release a connection back to the connection pool.
   * @param {Object} connection - The connection object to release to the pool.
   */
  releaseConnectionToPool(connection) {
    this.connectionPool.add(connection);
  }

  /**
   * Establish connections with multiple peer nodes.
   * @param {Array} peerNodes - An array of peer nodes to establish connections with.
   * @returns {Promise} A Promise that resolves when all connections are established.
   */
  establishConnections(peerNodes) {
    return this.connectionManager.establishConnections(peerNodes);
  }

  /**
   * Handle an incoming connection from a peer node.
   * @param {Object} peerNode - The peer node representing the incoming connection.
   */
  handleIncomingConnection(peerNode) {
    this.connectionManager.handleIncomingConnection(peerNode);
  }

  // Methods for peer discovery

  /**
   * Start listening for incoming connections and discovering peers.
   * @returns {Promise} A Promise that resolves when the listening and discovery start.
   */
  startListening() {
    return this.peerDiscovery.startListening();
  }

  /**
   * Find peers in the Distributed Hash Table (DHT).
   * @returns {Promise} A Promise that resolves with the list of discovered peers.
   */
  findPeersInDHT() {
    return this.peerDiscovery.findPeersInDHT();
  }

  /**
   * Stop listening for incoming connections and discovering peers.
   */
  stopListening() {
    this.peerDiscovery.stopListening();
  }

  // Methods for data transmission

  /**
   * Send a data chunk to a peer node.
   * @param {Object} peerNode - The peer node to send the data chunk to.
   * @param {any} data - The data chunk to send.
   */
  sendChunk(peerNode, data) {
    this.dataTransmission.sendChunk(peerNode, data);
  }

  /**
   * Receive a data chunk from a peer node.
   * @param {Object} peerNode - The peer node the data chunk is received from.
   * @param {any} data - The received data chunk.
   */
  receiveChunk(peerNode, data) {
    this.dataTransmission.receiveChunk(peerNode, data);
  }
}

module.exports = Node;
