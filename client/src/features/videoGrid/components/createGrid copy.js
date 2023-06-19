/**
 * Creates a grid of items based on the provided data.
 * @param {boolean} loading - Indicates whether the data is currently being loaded.
 * @param {object} options - The options object.
 * @param {object} options.data - The data used to populate the grid.
 * @returns {JSX.Element} - The grid component.
 */
function createGrid(loading, { data }) {
  if (!loading) {
    return Object.values(data).map((item, index) => {
      return (
        <div key={index}>
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
    });
  } else {
    return <div>Loading ...</div>;
  }
}

module.exports = { createGrid };
