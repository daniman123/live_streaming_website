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

export const postRegister = async (username, email, password) => {
  const url = "/register";
  const method = "post";
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: username,
      email: email,
      password: password,
    },
  };
  return fetchData(url, method, options);
};

export const postForm = async (fetchUrl, inputData) => {
  const url = fetchUrl;
  const method = "post";
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    data: inputData,
  };
  return fetchData(url, method, options);
};
