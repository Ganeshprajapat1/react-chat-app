import { createSlice } from "@reduxjs/toolkit";
import { 
        signupUser, 
        loginUser, 
        logoutUser, 
        resetPassword, 
        sendVerificationEmailThunk, 
        checkEmailVerificationThunk, } from "./authThunk";
        
        const initialState = {
          user: null,
          loading: false,
          error: null,
          isAuthenticated: false,
          initialized: false,
          success: null,
          verificationLoading: false,
          verificationSent: false,
          emailVerified: false,
          verificationChecking: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        clearError(state) {
            state.error = null;
        },

        setUser(state, action) {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.emailVerified = action.payload?.emailVerified || false;
        state.initialized = true;
        }  
    },

    extraReducers: (builder) => {
        builder

        .addCase(signupUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(signupUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.emailVerified = action.payload.emailVerified;
        })

        .addCase(signupUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.emailVerified = action.payload.emailVerified;
        })

        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.isAuthenticated = false;
        })

        .addCase(resetPassword.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(resetPassword.fulfilled, (state, action) => {
          state.loading = false;
          state.success = action.payload;
        })

        .addCase(resetPassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(sendVerificationEmailThunk.pending, (state) => {
          state.verificationLoading = true;
        })

        .addCase(sendVerificationEmailThunk.fulfilled, (state) => {
            state.verificationLoading = false;
            state.verificationSent = true;
        })

        .addCase(sendVerificationEmailThunk.rejected, (state) => {
            state.verificationLoading = false;
        })

        .addCase(checkEmailVerificationThunk.pending, (state) => {
            state.verificationChecking = true;
        })

        .addCase(checkEmailVerificationThunk.fulfilled, (state, action) => {
            state.verificationChecking = false;
            state.emailVerified = action.payload.emailVerified;
            state.user = action.payload.user;
        })

        .addCase(checkEmailVerificationThunk.rejected, (state) => {
            state.verificationChecking = false;
        });
      }
    }); 

export const { clearError, setUser } = authSlice.actions;

export default authSlice.reducer;