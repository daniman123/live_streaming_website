import React from "react";

import ActionButtons from "./components/actionButtons/index";
import FollowedChannels from "./components/followedChannels/index";
import RecomendedChannels from "./components/recomendedChannels/index";

function LeftBody() {
  return (
    <div className="left_body">
      <ActionButtons />
      <FollowedChannels />
      <RecomendedChannels />
    </div>
  );
}

export default LeftBody;
