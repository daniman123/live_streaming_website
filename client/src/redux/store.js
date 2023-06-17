import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "../redux/reducers/accessTokenReducer";
// Import other reducers as needed

const rootReducer = combineReducers({
  accessToken: accessTokenReducer,
  // Add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
