import MediaPagination from "./components/mediaPagination/index";
type Props = {};

function HeroSection({}: Props) {
  return (
    <div className="home__hero__section">
      <div className="title__wrapper">
        <h3 className="section__title">Featured Content</h3>
      </div>
      <MediaPagination />
    </div>
  );
}

export default HeroSection;
