function createGrid(elementCount, loading, data) {
  const elements = !loading
    ? Array.from({ length: elementCount }, (_, i) => {
        if (i >= data.length) {
          return; // Skip rendering until data is available
        }
        return (
          <div key={i}>
            <div className="video-grid-item" id="randomColorElement">
              {/* <img src={Object.values(data)[i]} alt="media" /> */}
            </div>
            <div className="discover__metadata">
              <h4>Title</h4>
              <div className="discover__stats">
                <p>{Object.values(data)[i]}</p>
                <p>Category</p>
              </div>
            </div>
          </div>
        );
      })
    : [];

  return elements;
}

module.exports = { createGrid };
