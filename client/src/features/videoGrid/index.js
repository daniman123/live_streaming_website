"use client";

import { getDiscoverMedia, getRecommended } from "../../api/getFetch";
import { createGrid } from "./components/createGrid";
import useFetch from "../../api/utils/useFetch";

const VideoGrid = () => {
  const elementCount = 60;

  const { data, loading, error } = useFetch(getRecommended, elementCount);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const elements = createGrid(elementCount, loading, data);

  return <div className="video-grid-container">{elements}</div>;
};

export default VideoGrid;
