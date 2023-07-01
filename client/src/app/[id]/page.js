import UserFeed from "../../pages/user/index";
import withFeedWrapper from "@/hoc/feedWrapper/index";
import Viewer from "../../features/webRTC/viewer/index";

function User() {
  return (
    <div className="user__feed__content">
      <Viewer />
      {/* <UserFeed /> */}
    </div>
  );
}

export default withFeedWrapper(User);
