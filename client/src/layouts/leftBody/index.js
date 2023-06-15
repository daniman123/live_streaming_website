import ActionButtons from "../../features/actionButtons/index";
import Lists from "./components/lists";

import { postFollowing } from "@/api/postFetch";
import { getRecommended } from "@/api/getFetch";

import "./style/style.css";

async function LeftBody() {
  const followed = await postFollowing("yoooo");
  const recommended = await getRecommended();

  return (
    <div className="left__body">
      <div className="left__body__element">
        <ActionButtons />
      </div>
      <Lists followed={followed} recommended={recommended} />
    </div>
  );
}

export default LeftBody;
