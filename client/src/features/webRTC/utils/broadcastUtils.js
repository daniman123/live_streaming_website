function initializeStream(setVideo, setAudio) {
  return navigator.mediaDevices.getUserMedia({
    video: {
      width: { exact: 1340 },
      height: { exact: 755 },
    },
    audio: setAudio,
  });
}

module.exports = { initializeStream };
