import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTyping: false,
};

const typingSlice = createSlice({
  name: "typing",

  initialState,

  reducers: {

    setTyping(state, action) {
      state.isTyping = action.payload;
    },

  },
});

export const {
  setTyping,
} = typingSlice.actions;

export default typingSlice.reducer;