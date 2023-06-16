import ActionButtons from "../../features/actionButtons/index";
import Lists from "./components/lists";

import { postFollowing } from "@/api/postFetch";
import { getRecommended } from "@/api/getFetch";

import "./style/style.css";

async function LeftBody() {
  var followed = null;

  try {
    followed = await postFollowing("gab");
    console.log("🚀 ~ file: index.js:14 ~ LeftBody ~ followed:", followed)
  } catch (error) {
    // console.log("🚀 ~ file: index.js:15 ~ LeftBody ~ error:", error)
  }

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
