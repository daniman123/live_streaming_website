import React from "react";
import withUserForm from "../withUserForm/index";
import UserForm from "../userForm/index";

const LoginForm = (props) => {
  const { handleRegister } = props;

  const inputFields = [
    { name: "username", type: "text", label: "Username" },
    { name: "password", type: "password", label: "Password" },
  ];

  return (
    <UserForm
      message="Log in"
      handleSubmit={handleRegister}
      buttonText="Log in"
      inputFields={inputFields}
      {...props}
    />
  );
};

const initialState = {
  username: "",
  password: "",
};

export default withUserForm(LoginForm, "/user/login", initialState);
