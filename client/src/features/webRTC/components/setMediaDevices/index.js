import React, { useRef } from "react";

import { initializeStream } from "../../utils/broadcastUtils";

function SetMediaDevices({ setStream }) {
  const videoRadio = useRef();
  const audioRadio = useRef();

  const handleDeviceConfig = async () => {
    const isVideo = videoRadio.current.value;
    const isAudio = audioRadio.current.value;
    const stream = await initializeStream(isVideo, isAudio);

    setStream(stream);
  };

  return (
    <div>
      <div>
        <input ref={videoRadio} type="radio"></input>
        <input ref={audioRadio} type="radio"></input>
        <button onClick={handleDeviceConfig}>
          Confirm Broadcast Configuration
        </button>
      </div>
    </div>
  );
}

export default SetMediaDevices;
