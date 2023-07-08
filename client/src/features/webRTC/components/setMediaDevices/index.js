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
      <h4 className="config__title"> Configure Media Devices</h4>
      <div className="media__config__options">
        <div className="media__config">
          <h5 className="media__config__name">Video</h5>
          <input id="video" type="checkbox" ref={videoRadio} />
          <label htmlFor="video" className="toggle__slider">
            <div className="toggle__button"></div>
          </label>
        </div>
        <div className="media__config">
          <h5 className="media__config__name">Audio</h5>
          <input id="audio" type="checkbox" ref={audioRadio} />
          <label htmlFor="audio" className="toggle__slider">
            <div className="toggle__button"></div>
          </label>
        </div>
      </div>
      <div className="set__config__button__wrapper">
        <button className="set__config__button" onClick={handleDeviceConfig}>
          Confirm Configuration
        </button>
      </div>
    </div>
  );
}

export default SetMediaDevices;
