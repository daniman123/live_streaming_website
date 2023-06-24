import React, { useState } from "react";

interface Media {
  image: string;
  title: string;
  type: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mediaPerPage = 3;
  const media: Media[] = [
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Live Stream Channel 1",
      type: "channel",
    },
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Clip/Short Video 13",
      type: "clip",
    },
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Community Post 14",
      type: "post",
    },
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Community Post 21",
      type: "post",
    },
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Community Post 51",
      type: "post",
    },
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Community Post 51",
      type: "post",
    },
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Community Post 531",
      type: "post",
    },
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Community Post 15",
      type: "post",
    },
    {
      image:
        "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_6436.jpg",
      title: "Community Post 71",
      type: "post",
    },
  ];

  const numSlides = Math.ceil(media.length / mediaPerPage);

  const goToNextSlide = (): void => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % numSlides);
  };

  const goToPreviousSlide = (): void => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + numSlides) % numSlides);
  };

  const startMediaIndex = currentSlide * mediaPerPage;
  const visibleMedia = media.slice(
    startMediaIndex,
    startMediaIndex + mediaPerPage
  );

  return (
    <div className="hero-section">
      <div className="slideshow">
        {visibleMedia.map((mediaItem, index) => (
          <Slide key={index} media={mediaItem} />
        ))}
      </div>

      <div className="controls">
        <button onClick={goToPreviousSlide}>Previous</button>
        <button onClick={goToNextSlide}>Next</button>
      </div>
    </div>
  );
};

interface SlideProps {
  media: Media;
}

const Slide: React.FC<SlideProps> = ({ media }) => {
  const { image, title, type } = media;

  return (
    <div className="slide">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{type}</p>
    </div>
  );
};

export default HeroSection;
