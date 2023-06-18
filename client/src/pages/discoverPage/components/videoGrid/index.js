"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const VideoGrid = () => {
  const elementCount = 60; // Number of elements to generate
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchRandomPhotos = async () => {
      try {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        const imageUrl = response.data.message;
        setImageUrls(Array(elementCount).fill(imageUrl));
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomPhotos();
  }, []);

  const elements = Array.from({ length: elementCount }, (_, i) => (
    <div key={i}>
      <div className="video-grid-item" id="randomColorElement">
        <img src={imageUrls[i]} alt="randomss" />
      </div>
      <div className="discover__metadata">
        <h4>Title</h4>
        <div className="discover__stats">
          <p>UserName</p>
          <p>cagegory</p>
        </div>
      </div>
    </div>
  ));

  return <div className="video-grid-container">{elements}</div>;
};

export default VideoGrid;
