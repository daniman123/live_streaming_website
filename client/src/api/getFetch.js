import { fetchData } from "./utils/fetch";

async function getRecommended() {
  const url = "/recommended";

  return fetchData(url);
}

module.exports = { getRecommended };
 