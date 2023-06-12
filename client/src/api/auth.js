import { fetchData } from "./utils/fetch";

export const fetchFollowing = async (userData) => {
  const url = "/user/following";
  const method = "post";
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: userData,
    },
  };
  const response = await fetchData(url, method, options);

  return response;
};
