"use client";
import React, { useEffect } from "react";

const VideoGrid = () => {
  const elementCount = 60; // Number of elements to generate

  useEffect(() => {
    const animateRandomColor = () => {
      const elements = document.querySelectorAll("randomColorElement");
      elements.forEach((element) => {
        element.classList.add("animatedRandomColor");
      });
    };

    animateRandomColor();
  }, []);

  const elements = Array.from({ length: elementCount }, (_, i) => (
    <div key={i} className="video-grid-item" id="randomColorElement">
      Element {i + 1}
    </div>
  ));

  return <div className="video-grid-container">{elements}</div>;
};

export default VideoGrid;
