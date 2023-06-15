import React, { useState } from "react";
import { postForm } from "@/api/auth";

const withUserForm = (WrappedComponent, fetchUrl, initialState = {}) => {
  return (props) => {
    const [userInput, setUserInput] = useState({ ...initialState });

    const [inputAlerts, setInputAlerts] = useState({});

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleRegister = async () => {
      try {
        setInputAlerts({});
        await postForm(fetchUrl, userInput);
        setInputAlerts({ status: "Succes!" });
        props.togglePopup();
      } catch (error) {
        handleError(error);
      }
    };

    const handleError = (error) => {
      const { status, data } = JSON.parse(error.message);
      const ERRORS = JSON.parse(data);
      setInputAlerts((prevState) => ({
        ...prevState,
        status: "Error!",
        ...ERRORS,
      }));
    };

    const renderInput = (name, type, placeholder) => (
      <div>
        <h5>{inputAlerts[name]}</h5>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={userInput[name]}
          onChange={handleInputChange}
        />
      </div>
    );

    return (
      <WrappedComponent
        {...props}
        userInput={userInput}
        inputAlerts={inputAlerts}
        handleRegister={handleRegister}
        renderInput={renderInput}
      />
    );
  };
};

export default withUserForm;
