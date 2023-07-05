import { useRef } from "react";

import { initializeStream } from "../../utils/broadcastUtils";

function SetMediaDevices({ setStream, setIsMediaConfig }) {
  const videoRadio = useRef();
  const audioRadio = useRef();

  const handleDeviceConfig = async () => {
    setStream(null);

    const isVideo = videoRadio.current.checked;
    const isAudio = audioRadio.current.checked;
    const stream = await initializeStream(isVideo, isAudio);

    setStream(stream);
    setIsMediaConfig(true);
  };

  return (
    <div className="media__config__wrapper">
      <h4> Configure Media Devices</h4>
      <div className="media__config__options">
        <div className="media__config">
          <h5 className="media__config__name">Video</h5>
          <input ref={videoRadio} type="checkbox" defaultChecked={true} />
        </div>
        <div className="media__config">
          <h5 className="media__config__name">Audio</h5>
          <input ref={audioRadio} type="checkbox" defaultChecked={true} />
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
