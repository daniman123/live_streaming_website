"use client"

import WebRTC from "@/features/webRTC";
import withAuth from "../../../hoc/authWrapper/index";

function Dashboard() {
  return (
    <div className="dashboard__content">
      <WebRTC />
    </div>
  );
}

export default withAuth(Dashboard);
