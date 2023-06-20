
import DiscoverPage from "@/pages/discoverPage/index";
import { getRecommended } from "../../api/getFetch";

export default async function Home() {
  const data = await getRecommended(16);
  return <DiscoverPage data={data} />;
}
