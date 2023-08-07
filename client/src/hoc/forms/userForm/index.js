import React, { useState } from "react";
import "./style/style.css";

const UserForm = (props) => {

  const [isSub, setIsSub] = useState(false)

  const handleSub = async () =>{
    setIsSub(prevState => prevState = true)
    await handleSubmit()
  }

  const {
    message,
    userInput,
    inputAlerts,
    handleSubmit,
    renderInput,
    togglePopup,
    buttonText,
    inputFields,
  } = props;

  return (
    <div className="popup">
      <div className="popup-content">
        <h4 className="popup-banner">
          {message + (inputAlerts.status ? " " + inputAlerts.status : "")}
        </h4>
        {inputFields.map((field) =>
          renderInput(field.name, field.type, field.label, isSub)
        )}
        <div className="popup-buttons-wrapper">
          <button onClick={handleSub} disabled={isSub}>{buttonText}</button>
          <button onClick={togglePopup} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
