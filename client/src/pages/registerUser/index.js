"use client";

import React, { useState, useEffect } from "react";
import { postRegister } from "../../api/auth";

const RegisterUser = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputAlerts, setInputAlerts] = useState("");

  const handleRegister = async () => {
    try {
      setInputAlerts("");
      const response = await postRegister(username, email, password);
      const updatedDict = {
        status: "User registered!",
      };
      setInputAlerts((dict) => (dict = updatedDict));

      console.log("🚀 ~ User registered!", response.message);
    } catch (error) {
      const { status, data } = JSON.parse(error.message);

      const ERRORS = JSON.parse(data);

      const updatedDict = {
        status: "Error!",
        username: ERRORS.username,
        email: ERRORS.email,
        password: ERRORS.password,
      };
      setInputAlerts((dict) => (dict = updatedDict));
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h4>{inputAlerts.status}</h4>
        <div>
          <h5>{inputAlerts.username}</h5>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <h5>{inputAlerts.email}</h5>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <h5>{inputAlerts.password}</h5>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleRegister}>Register</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterUser;
