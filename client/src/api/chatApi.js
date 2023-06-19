import { fetchData } from "./utils/fetch";

export const sendMessage = (message) => {
  const url = "/messages";
  const method = "post";
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      messages: message,
    },
  };
  return fetchData(url, method, options);
};

export const fetchUserList = () => {
  const url = "/users";
  const method = "get";

  return fetchData(url, method);
};

// Add more API request functions as needed
export { sendMessage, fetchUserList };
