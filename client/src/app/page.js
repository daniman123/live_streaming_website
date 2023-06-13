// import Image from "next/image";
// import styles from "./page.module.css";

import Feed from "@/components/feed";
import NavBar from "../components/navBar/index";
import LeftBody from "../components/leftBody/index";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="content">
        <div className="section">
          <LeftBody />
        </div>
        <div className="section">
          <Feed />
        </div>
        <div className="section"></div>
      </div>
    </>
  );
}
