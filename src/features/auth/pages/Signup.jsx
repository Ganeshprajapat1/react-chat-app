import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthInput from "../components/AuthInput.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import AuthButton from "../components/AuthButton.jsx";
import Logo from "../../../components/Logo/Logo.jsx";
import { notify } from '../../../utils/notification.js';

import { IoEye, IoEyeOff } from "react-icons/io5";
import { signupUser, sendVerificationEmailThunk } from "../store/authThunk";

import "../styles/auth.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
  const nameRegex = /^[a-zA-Z\s]{3,50}$/;

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const { password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      notify.error("Please fill all fields.");
      return false;
    }

    if (!nameRegex.test(name)) {
      notify.error("Name should be 3-50 characters and contain only letters.");
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

    if (!passwordRegex.test(password)) {
      notify.error("Password must contain at least one letter and one number.");
      return false;
    }

    if (password !== confirmPassword) {
      notify.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    const payload = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    const resultAction = await dispatch(signupUser(payload));

    if (signupUser.fulfilled.match(resultAction)) {
      await dispatch(sendVerificationEmailThunk());
      notify.success("Verification email sent successfully.");
      navigate("/verify-email");
    }
  };

  useEffect(() => {
    if (error) {
      notify.error(error);
    }
  }, [error]);

  return (
    <div className="auth-page">
      <div className="logo">
        <Logo />
      </div>
      <div className="auth-card">
        <h1>Create Account</h1>

        <p>Join us and start chatting with your friends.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <AuthInput
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <AuthInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group password-group">
            <PasswordInput
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-group password-group">
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <AuthButton
            loading={loading}
            text="Create Account"
            loadingText="Creating Account..."
          />
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;