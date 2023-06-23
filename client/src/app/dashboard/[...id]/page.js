"use client";

import WebRTC from "../../../features/webRTC";
import withFeedWrapper from "../../../hoc/feedWrapper/index";

function Dashboard() {
  return (
    <div className="dashboard__content">
      <WebRTC />
    </div>
  );
}

export default withFeedWrapper(Dashboard);
