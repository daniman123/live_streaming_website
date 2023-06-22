import ActionButtons from "../../features/actionButtons/index";
import Lists from "../../features/lists";

import "./style/style.css";

async function LeftBody() {
  return (
    <div className="left__body">
      <div className="left__body__element">
        <ActionButtons />
      </div>
      <Lists />
    </div>
  );
}

export default LeftBody;
