import { useEffect, useRef } from "react";

function useGetLocalStream() {
  const localStream = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((getLocalStream) => {
        localStream.current.srcObject = getLocalStream;
      });
  }, []);

  return localStream;
}

module.exports = { useGetLocalStream };
