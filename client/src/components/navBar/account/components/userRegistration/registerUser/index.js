import React from "react";

const RegisterUser = ({
  inputAlerts,
  handleRegister,
  renderInput,
  onClose,
}) => (
  <div className="popup">
    <div className="popup-content">
      <h4>{inputAlerts.status}</h4>
      {renderInput("username", "text", "Username")}
      {renderInput("email", "email", "Email")}
      {renderInput("password", "password", "Password")}
      <button onClick={handleRegister}>Register</button>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default RegisterUser;
