import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const Viewer = () => {
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const sourceBufferRef = useRef(null);

  useEffect(() => {
    // Connect to the server
    socketRef.current = io("http://localhost:7000");

    // Create the MediaSource object
    const mediaSource = new MediaSource();
    let sourceBuffer = null;

    // Handle the onsourceopen event
    mediaSource.onsourceopen = () => {
      // Create the SourceBuffer
        const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

    //   if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
        sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

        // Receive the video stream from the server
        socketRef.current.on("stream", (data) => {
          console.log(
            "🚀 ~ file: index.js:27 ~ socketRef.current.on ~ data:",
            data
          );
          // Append the ArrayBuffer data to the SourceBuffer
          sourceBuffer.appendBuffer(data);
        });
    //   }
    };

    // Assign the MediaSource object to the video element
    videoRef.current.src = URL.createObjectURL(mediaSource);

    return () => {
      // Cleanup
      socketRef.current.disconnect();
      if (sourceBuffer) {
        mediaSource.removeSourceBuffer(sourceBuffer);
      }
      if (mediaSource.readyState === "open") {
        mediaSource.endOfStream();
      }
      if (videoRef.current.srcObject !== null) {
        videoRef.current.srcObject = null;
      }
      URL.revokeObjectURL(videoRef.current.src);
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline controls />;
};

export default Viewer;
