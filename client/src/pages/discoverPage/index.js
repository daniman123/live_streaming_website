import "../../features/videoGrid/style/style.css";
import VideoGrid from "../../features/videoGrid/index";

const DiscoverPage = (data) => {
  return (
    <div className="discover__page">
      <h1 className="discover__title">Discover</h1>
      <VideoGrid data={data} />
    </div>
  );
};

export default DiscoverPage;
