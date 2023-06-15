import React from "react";

const UserForm = (props) => {
  const {
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
        {inputFields.map((field) =>
          renderInput(field.name, field.type, field.label)
        )}
        {/* {renderInput("username", "text", "Username")} */}
        {/* {renderInput("password", "password", "Password")} */}
        <button onClick={handleSubmit}>{buttonText}</button>
        <button onClick={togglePopup}>Close</button>
        <p>{inputAlerts.status}</p>
      </div>
    </div>
  );
};

export default UserForm;
