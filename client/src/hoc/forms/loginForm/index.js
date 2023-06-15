import React from "react";
import withUserForm from "../withUserForm/index";
import UserForm from "../userForm/index";

const LoginForm = (props) => {
  const { handleLogin } = props;

  const inputFields = [
    { name: "username", type: "text", label: "Username" },
    { name: "password", type: "password", label: "Password" },
  ];

  return (
    <UserForm
      handleSubmit={handleLogin}
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

export default withUserForm(LoginForm, "/logon", initialState);
