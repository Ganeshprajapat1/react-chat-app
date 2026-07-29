import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    selectedUser: null,
    // loading: false,
    // error: null,
    search: "",
    selectedChats: [],
    selectionMode: false,
};

const userSlice = createSlice({
    name: "users",
    initialState,

    reducers: {
        setUsers(state, action) {
        state.users = action.payload;
        },

        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },

        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },

        setSearch(state, action) {
        state.search = action.payload;
        },

        toggleChatSelection(state, action) {
          const uid = action.payload;

          if (state.selectedChats.includes(uid)) {
            state.selectedChats = state.selectedChats.filter(
              (id) => id !== uid
            );
          } else {
            state.selectedChats.push(uid);
          }
      
          state.selectionMode =
            state.selectedChats.length > 0;
        },

        clearSelection(state) {
          state.selectedChats = [];
          state.selectionMode = false;
        },
            },

    extraReducers : (builder) => {

    },
});

export const {setUsers, setSelectedUser, clearSelectedUser, setSearch, toggleChatSelection, clearSelection} = userSlice.actions;

export default userSlice.reducer;