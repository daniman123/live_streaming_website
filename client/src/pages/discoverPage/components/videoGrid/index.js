import VideoThumbnail from "../videoThumbnail/index";

const VideoGrid = ({ videos }) => {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoThumbnail
          key={video.id}
          thumbnailUrl={video.thumbnailUrl}
          title={video.title}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
