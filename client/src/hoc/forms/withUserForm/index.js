import React, { useState } from "react";
import { postForm } from "@/api/postFetch";
import { useTokenStore } from "@/store/tokenStore";

const withUserForm = (WrappedComponent, fetchUrl, initialState = {}) => {
  return (props) => {
    const { token, setToken } = useTokenStore();
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
        const result = await postForm(fetchUrl, userInput);
        setToken(result);
        setInputAlerts({ status: "Succes!" });
        props.togglePopup();
      } catch (error) {
        handleError(error);
      }
    };

    const handleError = (error) => {
      console.log("🚀 ~ file: index.js:38 ~ handleError ~ error:", error);
      if (!error) return;
      const { status, data } = JSON.parse(error.message);
      const ERRORS = JSON.parse(data);
      setInputAlerts((prevState) => ({
        ...prevState,
        status: "Error!",
        ...ERRORS,
      }));
    };

    const renderInput = (name, type, placeholder) => (
      <div className="userInput__wrapper">
        <h5>{inputAlerts[name]}</h5>
        <input
          className="userInput"
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
