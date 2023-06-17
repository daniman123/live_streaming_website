// Define action types
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";

// Action creator
export const setAccessToken = (accessToken) => {
  return {
    type: SET_ACCESS_TOKEN,
    payload: accessToken,
  };
};
