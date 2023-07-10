import React from "react";

const VideoPlayer = ({ localStream }) => {
  return (
    <video
      className="dashboard__streamer__broadcast__player"
      ref={localStream}
      autoPlay
      playsInline
      controls
    />
  );
};

export default VideoPlayer;
