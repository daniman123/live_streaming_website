import HomePage from "@/pages/homePage/index";
import NavBar from "../layouts/navBar/index";
import LeftBody from "../layouts/leftBody/index";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="content">
        <div className="section">
          <LeftBody />
        </div>
        <div className="section">
          <HomePage />
        </div>
        <div className="section"></div>
      </div>
    </>
  );
}
