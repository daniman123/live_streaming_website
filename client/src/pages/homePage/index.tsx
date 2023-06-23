"use client";

import "./style/style.css";
import withFeedWrapper from "../../hoc/feedWrapper/index";
import HeroSection from "../../features/heroSection/index";

function HomePage() {
  return (
    <div className="home__page">
      HomePage
      <HeroSection />
    </div>
  );
}

export default withFeedWrapper(HomePage);
