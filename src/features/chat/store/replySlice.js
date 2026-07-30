import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  replyMessage: null,
};

const replySlice = createSlice({
  name: "reply",

  initialState,

  reducers: {
    setReplyMessage: (state, action) => {
      state.replyMessage = action.payload;
    },

    clearReplyMessage: (state) => {
      state.replyMessage = null;
    },
  },
});

export const { setReplyMessage, clearReplyMessage } = replySlice.actions;

export default replySlice.reducer;