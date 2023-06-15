const VideoGrid = () => {
  const elementCount = 60; // Number of elements to generate

  const elements = []; // Array to hold the generated elements

  for (let i = 0; i < elementCount; i++) {
    elements.push(
      <div key={i} className="video-grid-item">
        Element {i + 1}
      </div>
    );
  }

  return <div className="video-grid-container">{elements}</div>;
};

export default VideoGrid;
