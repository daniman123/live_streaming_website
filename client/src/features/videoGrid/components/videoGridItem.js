function VideoGridItem({ title, item, category }) {
  return (
    <div>
      <div className="video-grid-item" id="randomColorElement"></div>
      <div className="discover__metadata">
        <h4>{title}</h4>
        <div className="discover__stats">
          <p>{item}</p>
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoGridItem