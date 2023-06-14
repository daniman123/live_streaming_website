import React, { useState } from "react";
import { postRegister } from "@/api/auth";

const withRegistration = (WrappedComponent) => {
  return (props) => {
    const [userInput, setUserInput] = useState({
      username: "",
      email: "",
      password: "",
    });

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
        const { username, email, password } = userInput;
        await postRegister(username, email, password);
        setInputAlerts({ status: "User registered!" });
        props.onClose();
      } catch (error) {
        handleRegisterError(error);
      }
    };

    const handleRegisterError = (error) => {
      const { status, data } = JSON.parse(error.message);
      const ERRORS = JSON.parse(data);
      setInputAlerts({
        status: "Error!",
        username: ERRORS.username,
        email: ERRORS.email,
        password: ERRORS.password,
      });
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
        inputAlerts={inputAlerts}
        handleRegister={handleRegister}
        renderInput={renderInput}
        onClose={props.onClose}
      />
    );
  };
};

export default withRegistration;
