import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
  },
  reducers: {
    addMessage: (state, action) => {
      // Handle adding a new message to the state
      state.messages.push(action.payload);
    },
    receiveMessage: (state, action) => {
      // Handle receiving a new message and adding it to the state
      state.messages.push(action.payload);
    },
    updateUserList: (state, action) => {
      // Handle updating the user list in the state
      state.users = action.payload;
    },
  },
});

export const { addMessage, receiveMessage, updateUserList } = chatSlice.actions;
export const reducer = chatSlice.reducer;
