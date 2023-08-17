import { fetchData, RequestOptions } from "./utils/fetch";

export const postFollowing = async (userData: any | null, token: string): Promise<any> => {
  if (!userData || !token) return;

  const url = "/user/get-protected-followers";
  const method = "get";

  const { result } = await fetchData(url, method);
  return result;
};

export const postRegister = async (username: string, email: string, password: string): Promise<any> => {
  const url = "/database-queries/create-new-user";
  const method = "post";
  const options: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: username,
      email: email,
      passphrase: password,
    },
  };
  return fetchData(url, method, options);
};

export async function postForm(endpoint:string , data:Object) {
  const method = "post";
  const options: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  return fetchData(endpoint, method, options);
}