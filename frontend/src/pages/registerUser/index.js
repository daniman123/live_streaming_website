"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";

const RegisterUser = () => {
  const [output, setOutput] = useState([]);
  const [safeOutput, setSafeOutput] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        username,
        email,
        password,
      });
      setOutput(response.data);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Array.isArray(output[0])) {
      setSafeOutput(output[0]);
    } else if (typeof output[0] === "object" && output[1]) {
      setSafeOutput("User registered!");
    }
  }, [output]);

  return (
    <div>
      <div>{safeOutput}</div>
      <div>
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
      </div>
    </div>
  );
};

export default RegisterUser;
