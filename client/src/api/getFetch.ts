import { fetchData, RequestOptions } from "./utils/fetch";

/**
 * Retrieves recommended data.
 * @returns {Promise<any>} A promise that resolves with the recommended data.
 */
export const getRecommended = async (amount: number): Promise<any> => {
  const url = "/database-queries/recommended-channels";
  const options: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    data:{
      limit: amount
    },
  };
  let data = await fetchData(url, "post", options);
  return data
};

/**
 * Retrieves random images of dog breeds.
 * @param {number} [n=1] - The number of images to retrieve.
 * @returns {Promise<string[]>} A promise that resolves with an array of image URLs.
 */
export const getDiscoverMedia = async (n: number = 1): Promise<string[]> => {
  const url = "https://dog.ceo/api/breeds/image/random";
  const method = "get";

  const fetchPromises = Array.from({ length: n }, () => fetchData(url, method));
  const responses = await Promise.all(fetchPromises);

  return responses.map((response) => response.message);
};

/**
 * Performs a logout operation.
 * @param {object} token - The access token.
 * @returns {Promise<void>} A promise that resolves when the logout is complete.
 */
export const getLogout = async (token: any): Promise<void> => {
  const url = "/logout";
  const method = "get";
  const options: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  await fetchData(url, method, options);
};
