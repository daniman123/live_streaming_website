/**
 * The `ConnectionManager` class handles the management of connections with peer nodes.
 * It provides methods for establishing connections, handling retries, and managing connection parameters.
 */
class ConnectionManager {
  /**
   * Constructs a new instance of the ConnectionManager class.
   *
   * @param {number} [maxConnections=10] - The maximum number of connections allowed.
   * @param {number} [connectionTimeout=5000] - The timeout value in milliseconds for establishing a connection.
   * @param {number} [maxConnectionRetries=3] - The maximum number of connection retries.
   * @param {number} [connectionRetryInterval=1000] - The interval in milliseconds between connection retries.
   */
  constructor(
    maxConnections = 10,
    connectionTimeout = 5000,
    maxConnectionRetries = 3,
    connectionRetryInterval = 1000
  ) {
    // Validate constructor arguments
    if (
      typeof maxConnections !== "number" ||
      typeof connectionTimeout !== "number" ||
      typeof maxConnectionRetries !== "number" ||
      typeof connectionRetryInterval !== "number" ||
      maxConnections <= 0 ||
      connectionTimeout <= 0 ||
      maxConnectionRetries <= 0 ||
      connectionRetryInterval <= 0
    ) {
      throw new Error("Invalid constructor arguments");
    }

    this.maxConnections = maxConnections;
    this.connectionTimeout = connectionTimeout;
    this.maxConnectionRetries = maxConnectionRetries;
    this.connectionRetryInterval = connectionRetryInterval;
    this.connectedPeers = new Map(); // Track the connected peers using a Map
    this.connectionPool = new Set(); // Connection pool for reusability
  }

  /**
   * Establishes a connection with a peer node.
   *
   * @param {string} peerNode - The identifier or address of the peer node to establish a connection with.
   * @param {number} [retryCount=0] - The number of connection retries made so far.
   * @returns {Promise<void>} A Promise that resolves when the connection is established or rejects if max retries are reached.
   */
  async establishConnection(peerNode, retryCount = 0) {
    if (retryCount > this.maxConnectionRetries) {
      throw new Error("Max connection retries reached.");
    }

    const reusableConnection = this.getConnectionFromPool();
    if (reusableConnection) {
      this.addPeer(reusableConnection);
      return;
    }

    // Establish a new connection
    // Implement the logic to establish a connection with the peer node.
    // Example: initiate connection with `peerNode`

    // Assume connection is established successfully
    const newConnection = {
      peerNode,
      connectionId: generateConnectionId(),
    };
    this.addPeer(newConnection);

    // Retry establishing the connection
    await new Promise((resolve) =>
      setTimeout(resolve, this.connectionRetryInterval)
    );
    await this.establishConnection(peerNode, retryCount + 1);
  }

  /**
   * Adds a peer to the connected peers.
   *
   * @param {object} connection - The connection object associated with the peer.
   */
  addPeer(connection) {
    if (this.connectedPeers.size >= this.maxConnections) {
      throw new Error("Max connections reached. Cannot add more peers.");
    }

    this.connectedPeers.set(connection.peerNode, connection);
  }

  /**
   * Removes a peer from the connected peers.
   *
   * @param {string} peerNode - The identifier or address of the peer node to remove.
   */
  removePeer(peerNode) {
    const connection = this.connectedPeers.get(peerNode);
    if (connection) {
      this.releaseConnectionToPool(connection);
      this.connectedPeers.delete(peerNode);
    }
  }

  /**
   * Retrieves a connection from the connection pool, if available.
   *
   * @returns {object|null} The connection object from the pool, or null if no available connections.
   */
  getConnectionFromPool() {
    for (const connection of this.connectionPool) {
      this.connectionPool.delete(connection);
      return connection;
    }
    return null;
  }

  /**
   * Releases a connection back to the connection pool.
   *
   * @param {object} connection - The connection object to release to the pool.
   */
  releaseConnectionToPool(connection) {
    this.connectionPool.add(connection);
  }

  /**
   * Establishes connections with multiple peer nodes.
   *
   * @param {string[]} peerNodes - An array of identifiers or addresses of the peer nodes to establish connections with.
   * @returns {Promise<void>} A Promise that resolves when all connections are established.
   */
  async establishConnections(peerNodes) {
    await Promise.all(
      peerNodes.map((peerNode) => this.establishConnection(peerNode))
    );
  }

  /**
   * Handles an incoming connection from a peer node.
   *
   * @param {string} peerNode - The identifier or address of the peer node.
   */
  handleIncomingConnection(peerNode) {
    // You can implement connection reuse or other pooling-related logic here
    this.addPeer({ peerNode, connectionId: generateConnectionId() });
  }

  // Other methods...
}

/**
 * Generates a unique connection ID.
 *
 * @returns {string} A unique connection ID.
 */
function generateConnectionId() {
  return Math.random().toString(36).substring(2, 9);
}

module.exports = ConnectionManager;
