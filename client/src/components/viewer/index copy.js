"use client";

import { useRef } from "react";
import servers from "../../api/config/stunServerConfig";

function Viewer() {
  const peerConnection = useRef(); 
  const remoteStream = useRef();
  const textAreaRef = useRef();
  const textAreaRef2 = useRef();

  const createAnswer = async () => {
    peerConnection.current = new RTCPeerConnection(servers);
    remoteStream.current.srcObject = new MediaStream();

    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.srcObject.addTrack(track);
      });
    };

    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        textAreaRef2.current.value = JSON.stringify(
          peerConnection.current.localDescription
        );
      }
    };

    let offer = JSON.parse(textAreaRef.current.value);

    if (!offer) return alert("NOOOOOOOOOOOOOOOOO offer");

    await peerConnection.current.setRemoteDescription(offer);

    let answer = await peerConnection.current.createAnswer();
    textAreaRef2.current.value = JSON.stringify(answer);

    await peerConnection.current.setLocalDescription(answer);
  };

  return (
    <div>
      <div className="vids">
        <video
          ref={remoteStream}
          id="remoteStream"
          autoPlay
          playsInline
          controls
        />
      </div>

      <textarea ref={textAreaRef}></textarea>
      <textarea ref={textAreaRef2}></textarea>

      <div className="options">
        <button onClick={createAnswer}>createAnswer</button>
      </div>
    </div>
  );
}

export default Viewer;
