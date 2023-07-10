import React from "react";

const BroadcastMetaData = ({ viewCount }) => {
  return (
    <div className="broadcast__meta__data__wrapper">
      <div className="broadcast__meta__data">
        <div className="on__air">
          <div className="live-icon"></div>
          <p className="text">ON AIR</p>
        </div>

        <div className="broadcast__meta__data__stats">
          <p className="viewer__count__dashboard">TOTAL VIEWERS: {viewCount}</p>
        </div>
      </div>
    </div>
  );
};

export default BroadcastMetaData;
