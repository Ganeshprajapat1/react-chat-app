import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../features/auth/pages/Login.jsx";
import VerifyEmail from "../features/auth/pages/VerifyEmail.jsx";
import Signup from "../features/auth/pages/Signup.jsx";
import ForgotPassword from "../features/auth/pages/ForgotPassword.jsx";
import Chat from "../features/chat/pages/Chat.jsx";
import Settings from "../features/settings/pages/Settings.jsx";
import Profile from "../features/settings/pages/Profile.jsx";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import VerifiedRoute from "./VerifiedRoute";
import NewChat from "../features/chat/pages/NewChat.jsx";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Default Route  */}
      <Route path="/" element={<Navigate to="/chat" replace />} />

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/chat"
        element={
          <VerifiedRoute>
            <Chat />
          </VerifiedRoute>
        }
      />

      <Route
        path="/verify-email"
        element={
          <ProtectedRoute>
            <VerifyEmail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/new-chat"
        element={
          <ProtectedRoute>
            <NewChat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


      {/* 404 Page */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;