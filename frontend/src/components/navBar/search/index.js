import React from "react";

function Search() {
  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <input className="search-bar-input" placeholder="Search"></input>
      </div>
      <div className="search-bar-btn-container">
        <button className="search-bar-button">search</button>
      </div>
    </div>
  );
}

export default Search;
