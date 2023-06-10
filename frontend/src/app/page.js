import Image from "next/image";
import styles from "./page.module.css";
import LivestreamComponent from "../components/liveStream";

export default function Home() {
  return (
    <>
      Yoington
      <div>
        <LivestreamComponent />
      </div>
    </>
  );
}
