import axios from "axios";

import API_URL from "../config/apiConfig";

const apiClient = axios.create({
  baseURL: API_URL,
});

/**
 * Utility function to fetch data from an API using Axios.
 * @param {string} url - The URL to make the request to.
 * @param {string} [method='get'] - The HTTP method to use for the request.
 * @param {Object} [options={}] - Additional options to pass to the Axios request.
 * @returns {Promise} - A Promise that resolves to the fetched data.
 * @throws {Error} - If the request fails or no response is received.
 */
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

/**
 * Handles the error that occurred during the API request.
 * @param {Error} error - The error object from the API request.
 * @throws {Error} - If the request failed or no response was received.
 */
const handleRequestError = (error) => {
  const { response } = error;

  if (response) {
    const { status, data } = response;
    // throw new Error(`Request failed with status ${status}: ${data}`);
    throw new Error(JSON.stringify({ status: status, data: data }));
  } else {
    throw new Error("Request failed: no response received");
  }
};
