"use client";

import "./style/style.css";
import withFeedWrapper from "../../hoc/feedWrapper/index";

function HomePage() {
  return <div className="home__page">HomePage</div>;
}

export default withFeedWrapper(HomePage);
