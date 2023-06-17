import { fetchData } from "./utils/fetch";

async function getRecommended() {
  const url = "/recommended";

  return fetchData(url);
}

export const getLogout = async (token) => {
  if (!token) return;

  const url = "/logout";
  const method = "get";
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
  };
  await fetchData(url, method, options);
};

module.exports = { getRecommended, getLogout };
