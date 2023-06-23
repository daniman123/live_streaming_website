import { fetchData, RequestOptions } from "./utils/fetch";

export const postFollowing = async (userData: any | null, token: string): Promise<any> => {
  if (!userData || !token) return;

  const url = "/user/following";
  const method = "post";
  const options: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      username: userData,
    },
  };
  const response = await fetchData(url, method, options);
  const { data } = response;
  return data;
};

export const postRegister = async (username: string, email: string, password: string): Promise<any> => {
  const url = "/register";
  const method = "post";
  const options: RequestOptions = {
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

export const postForm = async (fetchUrl: string, inputData: any): Promise<any> => {
  const url = fetchUrl;
  const method = "post";
  const options: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    data: inputData,
  };
  return fetchData(url, method, options);
};
