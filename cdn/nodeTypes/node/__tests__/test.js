const Node = require("../node");

describe("Node", () => {
  let node;

  beforeEach(() => {
    node = new Node("node1");
  });

  describe("addPeer", () => {
    it("should add a peer node to the connection manager", () => {
      node.addPeer("node2");
      expect(node.connectionManager.getPeers()).toContain("node2");
    });
  });

  describe("removePeer", () => {
    it("should remove a peer node from the connection manager", () => {
      node.addPeer("node2");
      node.removePeer("node2");
      expect(node.connectionManager.getPeers()).not.toContain("node2");
    });
  });

  describe("establishConnections", () => {
    it("should establish connections with all peer nodes", () => {
      node.addPeer("node2");
      node.addPeer("node3");
      node.establishConnections();
      expect(node.connectionManager.getConnections()).toHaveLength(2);
    });
  });

  describe("handleIncomingConnection", () => {
    it("should add a new peer node to the connection manager", () => {
      node.handleIncomingConnection("node2");
      expect(node.connectionManager.getPeers()).toContain("node2");
    });
  });

  describe("findPeersInDHT", () => {
    it("should return an array of discovered peer nodes", () => {
      const peers = node.findPeersInDHT();
      expect(Array.isArray(peers)).toBe(true);
    });
  });

  describe("sendChunk", () => {
    it("should send a data chunk to a peer node", () => {
      const mockSocket = {
        write: jest.fn(),
      };
      node.connectionManager.addPeer("node2");
      node.connectionManager.getConnection("node2").socket = mockSocket;
      node.sendChunk("node2", "data");
      expect(mockSocket.write).toHaveBeenCalledWith("data");
    });
  });

  describe("receiveChunk", () => {
    it("should receive a data chunk from a peer node", () => {
      const mockSocket = {
        on: jest.fn(),
      };
      node.connectionManager.addPeer("node2");
      node.connectionManager.getConnection("node2").socket = mockSocket;
      node.receiveChunk("node2", "data");
      expect(node.dataTransmission.getDataChunks()).toContain("data");
    });
  });
});
