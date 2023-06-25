import Grid from "./components/createGrid";
import "../../features/videoGrid/style/style.css";

const VideoGrid = ({ data }) => {
  return (
    <div className="video-grid-container-wrapper">
      <Grid data={data} />
    </div>
  );
};

export default VideoGrid;
