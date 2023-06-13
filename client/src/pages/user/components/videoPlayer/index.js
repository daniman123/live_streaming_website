import React, { useRef } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  // Function to handle playing or pausing the video
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div>
      <video ref={videoRef} src="/path/to/video.mp4"></video>
      <button onClick={handlePlayPause}>Play/Pause</button>
    </div>
  );
};

export default VideoPlayer;
