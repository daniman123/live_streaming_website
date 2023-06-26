import withHomeSection from "../../hoc/withHomeSection/index";
import VideoGrid from "../videoGrid/index";

import SpotLightGrid from "./components/spotlightGrid";
import Link from "next/link";

const WrappedComponent = withHomeSection(VideoGrid);

type Props = {};

function StreamersSpotlight({ data }) {
  return (
    <WrappedComponent
      title="Streamers Spotlight"
      linkUrl="/discover"
      linkText="Discover Streamers"
      data={data}
    />
  );
}

export default StreamersSpotlight;
