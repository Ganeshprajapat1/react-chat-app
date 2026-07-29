import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import Logo from '../../../components/Logo/Logo.jsx';

import { loginUser } from "../store/authThunk";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { notify } from "../../../utils/notification.js";

import "../styles/auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      notify.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---- Validation ----
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    const email = formData.email.trim();
    const { password } = formData;

    if (!email || !password) {
      notify.error("Please fill all fields.");
      return false;
    }

    if (!emailRegex.test(email)) {
      notify.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      notify.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      ...formData,
      email: formData.email.trim(),
    };

    const result = await dispatch(loginUser(payload));

    if (loginUser.fulfilled.match(result)) {
      if (!result.payload.emailVerified) {
        notify.error("Please verify your email first.");
        navigate("/verify-email");
        return;
      }
      
      notify.success("Welcome back!");
      navigate("/chat");
    }
  };

  return (
    <div className="auth-page">
      <div className="logo">
        <Logo />
      </div>
      <div className="auth-card">

        <h1>Welcome Back </h1>

        <p>Sign in to continue chatting.</p>

        <form onSubmit={handleSubmit}>

          <AuthInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <PasswordInput
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="forgot-password">
            <Link to="/forgot-password"> Forgot Password? </Link>
          </div>

          <AuthButton
            loading={loading}
            text="Sign In"
            loadingText="Signing In..."
          />

        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/signup">Create Account </Link><br />
        </div>

      </div>
    </div>
  );
};

export default Login;