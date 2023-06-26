"use client";

import WebRTC from "../../../features/webRTC";
import withFeedWrapper from "../../../hoc/feedWrapper/index";

import SignalingClient from "../../../components/videoPlayer/index";

function Dashboard() {
  return (
    <div className="dashboard__content">
      {/* <SignalingClient /> */}
    </div>
  );
}

export default withFeedWrapper(Dashboard);
