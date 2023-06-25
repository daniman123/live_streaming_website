import React, { useState, useRef, useEffect } from "react";

import data from "./mockDog.json";

interface Media {
  image: string;
  title: string;
  type: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleMedia, setVisibleMedia] = useState<Media[]>([]);
  const mediaPerPage = 3;
  const media: Media[] = data;

  const numSlides = Math.ceil(media.length / mediaPerPage);
  const slideRef = useRef<HTMLDivElement>(null);

  const goToNextSlide = (): void => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % numSlides);
  };

  const goToPreviousSlide = (): void => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + numSlides) % numSlides);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // const slideClicked = event.target?.parentElement;
      const slideClicked = (event.target as HTMLElement | null)?.parentElement;

      if (slideRef.current?.className === slideClicked?.className) {
        const allSlides = (event.target as HTMLElement | null)?.parentElement
          ?.parentElement;
        const slideClicked = (event.target as HTMLElement | null)
          ?.parentElement;

        const slideIndex = Array.from(allSlides?.children || []).indexOf(
          slideClicked as Element
        );
        if (slideIndex === 1) return;

        const allIndices = Array.from(allSlides?.children || []).map(
          (_, index) => index
        );
        const remainderIndices = allIndices
          .slice(0, slideIndex)
          .concat(allIndices.slice(slideIndex + 1));

        setVisibleMedia((prevVisibleMedia) => {
          const updatedVisibleMedia = [...prevVisibleMedia];

          const elementToMove = updatedVisibleMedia[slideIndex];

          updatedVisibleMedia[0] = prevVisibleMedia[remainderIndices[1]];
          updatedVisibleMedia[1] = elementToMove;
          updatedVisibleMedia[2] = prevVisibleMedia[remainderIndices[0]];

          return updatedVisibleMedia;
        });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [slideRef]);

  useEffect(() => {
    const startMediaIndex = currentSlide * mediaPerPage;
    const updatedVisibleMedia = media.slice(
      startMediaIndex,
      startMediaIndex + mediaPerPage
    );
    setVisibleMedia(updatedVisibleMedia);
  }, [currentSlide]);

  return (
    <div className="hero-section">
      <div className="slideshow" ref={slideRef}>
        {visibleMedia.map((mediaItem, index) => (
          <Slide key={index} media={mediaItem} slideRef={slideRef} />
        ))}
      </div>

      <div className="controls__wrapper">
        <div className="controls">
          <button
            className="previous__median__pagination"
            onClick={goToPreviousSlide}
          >
            ←
          </button>
          <button className="next__median__pagination" onClick={goToNextSlide}>
            →
          </button>
        </div>
      </div>
    </div>
  );
};

interface SlideProps {
  media: Media;
  slideRef: React.RefObject<HTMLDivElement>;
}

const Slide: React.FC<SlideProps> = ({ media, slideRef }) => {
  const { image, title, type } = media;

  return (
    <div className="slide" ref={slideRef}>
      <img src={image} alt={title} />
      <div className="slide__stats">
        <h4>{title}</h4>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default HeroSection;
