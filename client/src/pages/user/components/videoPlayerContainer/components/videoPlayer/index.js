import React from "react";

const VideoPlayer = ({ ref, src, loaded }) => {
  return (
    <div>
      {loaded ? (
        <div>Error loading video.</div>
      ) : (
        <div>
          <video ref={ref} src={src}></video>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

"https://cdn-useast1.kapwing.com/source_63b73edf508e5b00181c54a0.mp4"