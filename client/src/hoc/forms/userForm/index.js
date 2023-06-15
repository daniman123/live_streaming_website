import React from "react";
import "./style/style.css";

const UserForm = (props) => {
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
        <h4 className="popup-banner">{message}</h4>
        {inputFields.map((field) =>
          renderInput(field.name, field.type, field.label)
        )}
        <div className="popup-buttons-wrapper">
          <button onClick={handleSubmit}>{buttonText}</button>
          <button onClick={togglePopup} className="close-btn">
            Close
          </button>
        </div>
        <p>{inputAlerts.status}</p>
      </div>
    </div>
  );
};

export default UserForm;
