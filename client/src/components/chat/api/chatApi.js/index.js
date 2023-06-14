import axios from "axios";
// Import any other dependencies needed for making API requests

const BASE_URL = "https://api.your-chat-api.com"; // Replace with your chat API base URL

export const sendMessage = (message) => {
  // Implement the API request to send a message
  return axios.post(`${BASE_URL}/messages`, message);
};

export const fetchUserList = () => {
  // Implement the API request to fetch the user list
  return axios.get(`${BASE_URL}/users`);
};

// Add more API request functions as needed
export { sendMessage, fetchUserList };
