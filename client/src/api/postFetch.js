import { fetchData } from "./utils/fetch";

// Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FiIiwiaWF0IjoxNjg2OTU2NzYwLCJleHAiOjE2ODY5NTc2NjB9.tJzmAN-0alV1nPVuUo7NvCi_QpCoInkOI8SmHptmTvY"}`,

export const postFollowing = async (userData = null) => {
  if (!userData) return;

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
