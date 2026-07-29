import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase/firebaseConfig";
import {
          signup,
          login,
          logout,
          forgotPassword,
          sendVerificationEmail,
          checkEmailVerification,
          createUserProfile,
        } from "../services/authService";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, thunkAPI) => {
    try {
      return await signup(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUserProfileThunk = createAsyncThunk(
  "auth/createUserProfile",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if(!user) {
        throw new Error("User not found.");
      }

      const created = await createUserProfile(user);
      
      return created;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      return await login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendVerificationEmailThunk = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found.");
      }

      await sendVerificationEmail(user);

      return "Verification email sent successfully.";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkEmailVerificationThunk = createAsyncThunk(
  "auth/checkEmailVerification",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found.");
      }

      const verified = await checkEmailVerification(user);

      return {
        emailVerified: user.emailVerified,
        user: {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
        },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth.resetPassword",
  async(email, thunkAPI) => {
    try {
      await forgotPassword(email);
      return "Password reset link has been sent to your email.";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);