import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import API_URL from "../config/apiConfig";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in the request
});

// Define the RequestOptions type based on the usage within fetchData function
export type RequestOptions = AxiosRequestConfig;

// Utility function to fetch data from an API using Axios
export const fetchData = async (url: string, method: string = "get", options: RequestOptions = {}): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.request({
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
const handleRequestError = (error: any): void => {
  const { response } = error;

  if (response) {
    const { status, data } = response;
    throw new Error(JSON.stringify({ status: status, data: data }));
  } else {
    throw new Error("Request failed: no response received");
  }
};
