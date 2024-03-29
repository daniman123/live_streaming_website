import HomePage from "../pages/homePage/index";
import { getRecommended } from "../api/getFetch";

const Home = async () => {
  const data = await getRecommended(4);
  return <HomePage data={data} />;
};

export default Home;
