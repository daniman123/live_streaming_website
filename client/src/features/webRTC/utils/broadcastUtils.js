function initializeStream(setVideo, setAudio) {
  return navigator.mediaDevices.getUserMedia({
    video: setVideo,
    audio: setAudio,
  });
}

module.exports = { initializeStream };
