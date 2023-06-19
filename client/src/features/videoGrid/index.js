import Grid from "./components/createGrid";

const VideoGrid = (props) => {
  const { data, loading, error } = props;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="video-grid-container-wrapper">
      <Grid loading={loading} options={data} />
    </div>
  );
};

export default VideoGrid;
