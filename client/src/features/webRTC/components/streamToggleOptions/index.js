import React, { useEffect, useState } from "react";

const StreamToggleOptions = ({ stream }) => {
  const [toggleVideo, setToggleVideo] = useState(true);
  const [toggleAudio, setToggleAudio] = useState(true);

  const hideCam = () => {
    const videoTrack = stream
      .getTracks()
      .find((track) => track.kind === "video");
    videoTrack.enabled = false;
    setToggleVideo((prevState) => (prevState = false));
  };

  const showCam = () => {
    const videoTrack = stream
      .getTracks()
      .find((track) => track.kind === "video");
    videoTrack.enabled = true;
    setToggleVideo((prevState) => (prevState = true));
  };

  const unmuteAudio = () => {
    const audioTrack = stream
      .getTracks()
      .find((track) => track.kind === "audio");
    audioTrack.enabled = true;
    setToggleAudio((prevState) => (prevState = true));
  };

  const muteAudio = () => {
    const audioTrack = stream
      .getTracks()
      .find((track) => track.kind === "audio");
    audioTrack.enabled = false;
    setToggleAudio((prevState) => (prevState = false));
  };

  return (
    <div>
      <div className="toggle__video__options">
        <button onClick={showCam} disabled={toggleVideo}>
          ENABLE CAMERA
        </button>
        <button onClick={hideCam} disabled={!toggleVideo}>
          DISABLE CAMERA
        </button>
      </div>
      <div className="toggle__audio__options">
        <button onClick={unmuteAudio} disabled={toggleAudio}>
          UNMUTE
        </button>
        <button onClick={muteAudio} disabled={!toggleAudio}>
          MUTE AUDIO
        </button>
      </div>
    </div>
  );
};

export default StreamToggleOptions;
