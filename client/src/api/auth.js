import axios from "axios";

import API_URL from "./apiConfig";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getFollowing = async (userData) => {
  try {
    const nm = "yoooo";
    const response = await axios.get(`${API_URL}/get_following`, {
      params: { username: nm },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
