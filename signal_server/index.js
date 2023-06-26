const { SignalingServer } = require('./signalingServer');

const signalingServer = new SignalingServer(7000);
signalingServer.start();
