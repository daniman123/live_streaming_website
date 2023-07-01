import Broadcast from "../../../components/broadcast/index";
import withFeedWrapper from "@/hoc/feedWrapper/index";

function Dashboard() {
  return <Broadcast />;
}

export default withFeedWrapper(Dashboard);
