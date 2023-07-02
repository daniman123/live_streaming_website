import { useRef } from "react";

import { initializeStream } from "../../utils/broadcastUtils";

function SetMediaDevices({ setStream }) {
  const videoRadio = useRef();
  const audioRadio = useRef();

  const handleDeviceConfig = async () => {
    setStream(null);

    const isVideo = videoRadio.current.checked;
    const isAudio = audioRadio.current.checked;
    const stream = await initializeStream(isVideo, isAudio);

    setStream(stream);
  };

  return (
    <div className="media__config__wrapper">
      <h3> Configure Media Devices</h3>
      <div className="media__config__options">
        <div className="media__config">
          <h4 className="media__config__name">Video</h4>
          <input ref={videoRadio} type="checkbox" />
        </div>
        <div className="media__config">
          <h4 className="media__config__name">Audio</h4>
          <input ref={audioRadio} type="checkbox" />
        </div>
      </div>
      <div className="set__config__button__wrapper">
        <button className="set__config__button" onClick={handleDeviceConfig}>
          Confirm Broadcast Configuration
        </button>
      </div>
    </div>
  );
}

export default SetMediaDevices;
