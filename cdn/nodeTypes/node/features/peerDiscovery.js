const DHT = require("@hyperswarm/dht");

/**
 * The `PeerDiscovery` class handles the discovery of peer nodes using a Distributed Hash Table (DHT).
 * It provides methods for finding and retrieving information about peers in the network.
 */
class PeerDiscovery {
  /**
   * Create an instance of PeerDiscovery.
   * @param {Object} [options] - Options for configuring the DHT.
   */
  constructor(options = {}) {
    /**
     * The DHT instance used for peer discovery.
     * @type {DHT}
     */
    this.dht = null;

    /**
     * An array of discovered peer nodes.
     * @type {Array<Object>}
     */
    this.discoveredPeers = [];

    /**
     * The error encountered during the peer discovery process.
     * @type {Error|null}
     */
    this.error = null;

    /**
     * The timeout identifier for stopping peer discovery.
     * @type {NodeJS.Timeout|null}
     */
    this.timeoutId = null;

    this.options = options;
  }

  startListening() {
    return new Promise((resolve, reject) => {
      if (this.dht) {
        resolve(); // DHT is already listening, resolve immediately
        return;
      }

      const { ports = [], host = "" } = this.options; // Add default values for ports and host

      const getBootstrap = ({ address, port }) => ({
        host: host || address,
        port,
      });

      if (!ports.length) {
        ports.push(null, null, null);
      }
      let [ephemeralPort, ...nonEphemeralPorts] = ports;

      const bootstrapper1Options = { ephemeral: true, bootstrap: [], host }; // Pass host to the options

      if (ephemeralPort) {
        bootstrapper1Options.port = ephemeralPort;
      }

      const bootstrapper1 = DHT.bootstrapper(bootstrapper1Options);

      bootstrapper1.on("listening", () => {
        this.dht = bootstrapper1;

        const bootstraps = [getBootstrap(bootstrapper1.address())];

        const createBootstrapper = async (port) => {
          const bootstrapperOptions = {
            bootstrap: bootstraps,
            ephemeral: false,
            host, // Pass host to the options
          };

          if (port) {
            bootstrapperOptions.port = port;
          }

          const bootstrapper = DHT.bootstrapper(bootstrapperOptions);

          await bootstrapper.ready();
          bootstraps.push(getBootstrap(bootstrapper.address()));
        };

        const createNonEphemeralBootstrappers = async () => {
          for (const port of nonEphemeralPorts) {
            await createBootstrapper(port);
          }
        };

        createNonEphemeralBootstrappers()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });

      bootstrapper1.on("error", (err) => {
        reject(new Error(`Failed to start listening: ${err.message}`));
      });
    });
  }

  /**
   * Finds peers in the Distributed Hash Table (DHT).
   * @returns {Promise<Array>} A promise that resolves to an array of discovered peer nodes.
   */
  findPeersInDHT() {
    return new Promise((resolve, reject) => {
      if (!this.dht) {
        reject(new Error("DHT is not listening"));
        return;
      }

      this.timeoutId = setTimeout(() => {
        this.stopListening();
        resolve(this.discoveredPeers);
      }, 10000);

      /**
       * Event listener for the 'peer' event.
       * @param {any} peer - The discovered peer.
       * @param {string} infoHash - The info hash of the peer.
       */
      const peerListener = (peer, infoHash) => {
        this.discoveredPeers.push({ peer, infoHash });
      };

      /**
       * Event listener for the 'error' event.
       * @param {Error} error - The error encountered during peer discovery.
       */
      const errorListener = (error) => {
        this.error = error;
        clearTimeout(this.timeoutId);
        reject(error);
      };

      this.dht.on("peer", peerListener);
      this.dht.on("error", errorListener);
    });
  }

  /**
   * Stops listening for peers in the Distributed Hash Table (DHT).
   */
  stopListening() {
    if (this.dht) {
      this.dht.destroy();
      this.dht = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

module.exports = PeerDiscovery;
