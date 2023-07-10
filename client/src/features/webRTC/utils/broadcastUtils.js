export function initializeStream(setVideo, setAudio) {
  return navigator.mediaDevices.getUserMedia({
    video: setVideo
      ? {
          width: { exact: 1340 },
          height: { exact: 755 },
        }
      : setVideo,
    audio: setAudio,
  });
}

module.exports = {
  initializeStream,
};
