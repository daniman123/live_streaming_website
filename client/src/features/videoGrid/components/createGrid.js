/**
 * Renders a grid of items based on the provided data.
 * @param {boolean} loading - Indicates whether the data is currently being loaded.
 * @param {object} options - The options object.
 * @param {object} options.data - The data used to populate the grid.
 * @returns {JSX.Element} - The grid component.
 */
function Grid({ loading, options: { data } }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-grid-container">
      {Object.values(data).map((item, index) => (
        <GridItem key={index} item={item} />
      ))}
    </div>
  );
}

/**
 * Renders an individual grid item.
 * @param {object} item - The item data.
 * @returns {JSX.Element} - The grid item component.
 */
function GridItem({ item }) {
  return (
    <div className="video-grid-item-wrapper">
      <div className="video-grid-item" id="randomColorElement"></div>
      <div className="discover__metadata">
        <h4>Title</h4>
        <div className="discover__stats">
          <p>{item}</p>
          <p>Category</p>
        </div>
      </div>
    </div>
  );
}

export default Grid;
