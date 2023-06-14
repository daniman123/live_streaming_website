import "./style/style.css";
import VideoGrid from "./components/videoGrid";

const videos = [
  {
    id: 1,
    thumbnailUrl: "/path/to/thumbnail1.jpg",
    title: "Video 1",
  },
  {
    id: 2,
    thumbnailUrl: "/path/to/thumbnail2.jpg",
    title: "Video 2",
  },
];

const DiscoverPage = () => {
  return (
    <div>
      <h1>Welcome to My Video Grid</h1>
      <VideoGrid videos={videos} />
    </div>
  );
};

export default DiscoverPage;
