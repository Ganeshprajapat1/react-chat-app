import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  loading: false,
};

const chatListSlice = createSlice({
  name: "chatList",

  initialState,

  reducers: {

    setChats(state, action) {
      state.chats = action.payload;
    },

    clearChats(state) {
      state.chats = [];
    },

  },
});

export const { setChats, clearChats } = chatListSlice.actions;

export default chatListSlice.reducer;