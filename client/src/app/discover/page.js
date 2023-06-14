import DiscoverPage from "@/pages/discoverPage/index";
import NavBar from "../../components/navBar/index";
import LeftBody from "../../components/leftBody/index";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="content">
        <div className="section">
          <LeftBody />
        </div>
        <div className="section">
          <DiscoverPage />
        </div>
        <div className="section"></div>
      </div>
    </>
  );
}
