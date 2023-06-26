import Grid from "./components/createGrid";
import "./style/style.css";

const VideoGrid = ({ data }) => {
  return (
    <div className="video-grid-container-wrapper">
      <Grid data={data} />
    </div>
  );
};

export default VideoGrid;
