const VideoThumbnail = ({ thumbnailUrl, title }) => {
  return (
    <div className="thumbnail">
      <img src={thumbnailUrl} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default VideoThumbnail;
