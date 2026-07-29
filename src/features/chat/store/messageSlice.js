import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Current messages shown in chat
  messages: [],

  // Initial loading
  loading: false,

  // Loading previous messages
  loadingOlder: false,

  // Whether older messages exist
  hasMore: true,

  // Oldest loaded message
  oldestMessage: null,

  // Latest loaded message
  newestMessage: null,
};

const messageSlice = createSlice({
  name: "messages",

  initialState,

  reducers: {
    // Replace messages (Initial load)
    setMessages(state, action) {
      state.messages = action.payload;

      if (action.payload.length > 0) {
        state.oldestMessage = action.payload[0];
        state.newestMessage =
          action.payload[action.payload.length - 1];
      } else {
        state.oldestMessage = null;
        state.newestMessage = null;
      }
    },

    // Realtime new message
    addMessage(state, action) {
      state.messages.push(action.payload);
      state.newestMessage = action.payload;
    },

    // Load older messages
    prependMessages(state, action) {
      state.messages = [
        ...action.payload,
        ...state.messages,
      ];

      if (state.messages.length > 0) {
        state.oldestMessage = state.messages[0];
      }
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setLoadingOlder(state, action) {
      state.loadingOlder = action.payload;
    },

    setHasMore(state, action) {
      state.hasMore = action.payload;
    },

    clearMessages(state) {
      state.messages = [];
      state.loading = false;
      state.loadingOlder = false;
      state.hasMore = true;
      state.oldestMessage = null;
      state.newestMessage = null;
    },
  },
});

export const {
  setMessages,
  addMessage,
  prependMessages,
  setLoading,
  setLoadingOlder,
  setHasMore,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;