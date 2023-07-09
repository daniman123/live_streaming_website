import Broadcast from "../../../features/webRTC/broadcast/index";
import withFeedWrapper from "@/hoc/feedWrapper/index";

function Dashboard() {
  return (
    <div className="dashboard__feed__content">
      <Broadcast />
    </div>
  );
}

export default withFeedWrapper(Dashboard);
