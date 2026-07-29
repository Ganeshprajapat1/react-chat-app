import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMessages: [],
  selectionMode: false,
};

const messageActionSlice = createSlice({
  name: "messageAction",

  initialState,

  reducers: {
    toggleMessageSelection(state, action) {
        const message = action.payload;
    
        const exists = state.selectedMessages.some(
            (item) => item.id === message.id
        );
      
        if (exists) {
            state.selectedMessages = state.selectedMessages.filter(
                (item) => item.id !== message.id
            );
        } else {
            state.selectedMessages.push(message);
        }
      
        state.selectionMode = state.selectedMessages.length > 0;
    },

    clearMessageSelection(state) {
      state.selectedMessages = [];
      state.selectionMode = false;
    },
  },
});

export const {
  toggleMessageSelection,
  clearMessageSelection,
} = messageActionSlice.actions;

export default messageActionSlice.reducer;