"use client";

import "./style/style.css";
import withFeedWrapper from "../../hoc/feedWrapper/index";
import HeroSection from "../../features/heroSection/index";
import StreamersSpotlight from "../../features/streamersSpotlight/index";

type Props = {};

function HomePage({ data }) {
  return (
    <div className="home__page">
      <HeroSection />
      <StreamersSpotlight data={data[0].data} />
    </div>
  );
}

export default withFeedWrapper(HomePage);
