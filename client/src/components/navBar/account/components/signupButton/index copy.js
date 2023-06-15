import React, { useState } from "react";
import withRegistration from "../userRegistration/withRegistration/index";
import RegisterUser from "../userRegistration/registerUser/index";
import "../style/style.css";

const EnhancedRegisterUser = withRegistration(RegisterUser);

const SignupButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={handleButtonClick}>Sign Up</button>
      {showPopup && <EnhancedRegisterUser onClose={handleClose} />}
    </>
  );
};

export default SignupButton;
