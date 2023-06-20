import axios from "axios";
import API_URL from "../config/apiConfig";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in the request
});

// Utility function to fetch data from an API using Axios
export const fetchData = async (url, method = "get", options = {}) => {
  try {
    const response = await apiClient.request({
      url,
      method,
      ...options,
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Handles the error that occurred during the API request
const handleRequestError = (error) => {
  const { response } = error;

  if (response) {
    const { status, data } = response;
    throw new Error(JSON.stringify({ status: status, data: data }));
  } else {
    throw new Error("Request failed: no response received");
  }
};
