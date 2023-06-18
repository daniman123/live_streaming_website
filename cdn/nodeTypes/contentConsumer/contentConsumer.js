// const Node = require("../node/node");
const Node = require("../node/features/node copy.ts");

/**
 * Represents a Content Consumer node in a network.
 */
class ContentConsumer extends Node {
  /**
   * Create a Content Consumer node.
   * @param {string} nodeId - The ID of the Content Consumer node.
   */
  constructor(nodeId) {
    super(nodeId);
    // Additional properties and methods specific to content consumers
    this.receivedStreams = [];
  }

  /**
   * Receive and deliver live video streams.
   * @param {Object} stream - The stream object representing the live video content.
   */
  receiveStream(stream) {
    // Logic to receive the stream from content providers and deliver it to viewers
    this.receivedStreams.push(stream);
    // console.log(`Stream received by Content Consumer ${this.nodeId}`);
  }
}

module.exports = ContentConsumer;
