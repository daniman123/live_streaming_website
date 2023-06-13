import React, { useRef, useState } from "react";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleFullScreen = () => {
    const video = videoRef.current;
    if (!isFullScreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const volume = parseFloat(e.target.value);
    video.volume = volume;
    setVolume(volume);
  };

  return (
    <div>
      <video
        ref={videoRef}
        src="https://cdn-useast1.kapwing.com/source_63b73edf508e5b00181c54a0.mp4"
      ></video>
      <button onClick={handlePlayPause}>Play/Pause</button>
      <button onClick={handleFullScreen}>
        {isFullScreen ? "Exit Fullscreen" : "Full Screen"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VideoPlayer;

("https://cdn-useast1.kapwing.com/source_63b73edf508e5b00181c54a0.mp4");
