import React, { useState } from "react";
import RegisterUser from "../../../../../pages/registerUser/index";

import "../style/style.css";

const SignupButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={handleButtonClick}>Sign Up</button>
      {showPopup && <RegisterUser onClose={handleClosePopup} />}
    </>
  );
};

export default SignupButton;
