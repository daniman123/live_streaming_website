import SpotLightGrid from "./components/spotlightGrid";
import Link from "next/link";

type Props = {};

function StreamersSpotlight({ data }) {
  return (
    <div className="home__streamers__spotlight__section">
      <div className="streamers__spotlight__top__bar">
        <div className="title__wrapper">
          <h3 className="section__title">Streamers Spotlight</h3>
        </div>
        <Link href="/discover" className="link">
          <div className="home__to_discover">Discover {'>'} </div>
        </Link>
      </div>
      <SpotLightGrid data={data} />
    </div>
  );
}

export default StreamersSpotlight;
