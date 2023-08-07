import React from "react";
import withUserForm from "../withUserForm/index";
import UserForm from "../userForm/index";

const RegistrationForm = (props) => {
  const { handleRegister } = props;

  const inputFields = [
    { name: "username", type: "text", label: "Username" },
    { name: "email", type: "email", label: "Email" },
    { name: "passphrase", type: "passphrase", label: "Passphrase" },
  ];

  return (
    <UserForm
      message="Register Account"
      handleSubmit={handleRegister}
      buttonText="Register"
      inputFields={inputFields}
      {...props}
    />
  );
};

const initialState = {
  username: "",
  email: "",
  passphrase: "",
};

export default withUserForm(RegistrationForm, "/database-queries/create-new-user", initialState);
