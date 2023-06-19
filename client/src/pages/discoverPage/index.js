import "../../features/videoGrid/style/style.css";
import VideoGrid from "../../features/videoGrid/index";

const DiscoverPage = () => {
  return (
    <div className="discover__page">
      <h1 className="discover__title">Discover</h1>
      <VideoGrid />
    </div>
  );
};

export default DiscoverPage;
