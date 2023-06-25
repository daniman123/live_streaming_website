import "../../features/videoGrid/style/style.css";
import withFeedWrapper from "@/hoc/feedWrapper/index";
import VideoGrid from "../../features/videoGrid/index";

const DiscoverPage = ({ data }) => {
  return (
    <div className="discover__page">
      <h1 className="discover__title">Discover</h1>
      <VideoGrid data={data[0].data} />
    </div>
  );
};

export default withFeedWrapper(DiscoverPage);
