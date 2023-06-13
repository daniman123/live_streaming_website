import React, { useRef } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  // Function to handle playing or pausing the video
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div>
      <video ref={videoRef} src="https://cdn-useast1.kapwing.com/source_63b73edf508e5b00181c54a0.mp4"></video>
      <button onClick={handlePlayPause}>Play/Pause</button>
    </div>
  );
};

export default VideoPlayer;

// {"contents":{"itemType":"layer","item":{"id":"36abbab2-b607-40d7-96c8-aabc2de45587","name":"FTRW0tgm","asset_id":"63b73edf508e5b00181c54a0","mime":"video/mp4","pastedUrl":"https://www.youtube.com/watch?v=AUSWvSoQfZk","source":"upload","url":"https://cdn-useast1.kapwing.com/source_63b73edf508e5b00181c54a0.mp4?GoogleAccessId=prod-sa-videoprocessing%40kapwing-prod.iam.gserviceaccount.com&Expires=1686648014&Signature=VbC6SRPC9xoGTO0Y2RSJcn3d8ktX2f8SqMzgyhBKBYZ6ayYQy3SPo3570O9JuBpnNgjErNCiXDbvnJYnAi2TkeBerF9gsf95lCD4SEKw50KhRPGagcRXfNjIGgPrEZ2cPlqPhXvv8ALJJ1ui8nJnjt%2F0lqnnRYcGYDOdzDkAogJKpCs%2FbEBWPft6gpVSALG6lKSZiez%2FMJbDeMVRglY1ocjsLggO71EcaeSYmA1d%2Bhk5v2KRDeYAQnahlA4P%2BfSjpNyNnH4Y5OJouzwsYneFHIJZeDz4TiTqpWRxkPjzl5uOUNfLKz4rk8oh5ERHb%2By2c60KO76QB3vDuSdWYWngwQ%3D%3D","objectFit":"cover","isMediaLibraryUpload":false,"hasAudio":true,"duration":1814.662676,"height":720,"type":"video","width":1280,"cmlFileId":"6487c44e14120c001932b618","wasUploadedAnonymously":true,"originalName":"FTRW0tgm","position":{"x":"0%","y":"0%","rotation":0,"width":"100%","height":"100%"},"metadataGathered":true,"timelineRow":0,"volume":1,"optimization_id":"6487c4506d76a6ce5c491dff","uploadConfirmed":1686619216846}},"originalProject":{"id":"","height":352.125,"width":626}}