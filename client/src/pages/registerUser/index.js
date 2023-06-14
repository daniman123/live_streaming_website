"use client";

import React, { useState, useEffect } from "react";
import { postRegister } from "../../api/auth";

const RegisterUser = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await postRegister(username, email, password);
    } catch (error) {
      console.log(JSON.parse(error.message));
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterUser;
