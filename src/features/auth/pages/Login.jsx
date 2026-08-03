import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import Logo from "../../../components/Logo/Logo.jsx";

import { loginUser } from "../store/authThunk";
import { notify } from "../../../utils/notification";

import useFormValidation from "../../../hooks/useFormValidation";

import { validateEmail, validatePassword } from "../../../utils/validation/authValidation";

import "../styles/auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const {
    formData,
    errors,
    handleChange,
    validateForm,
    isFormValid,
  } = useFormValidation(
    {
      email: "",
      password: "",
    },
    {
      email: (value) =>
        validateEmail(value),

      password: (value) =>
        validatePassword(value),
    }
  );

  useEffect(() => {
    if (error) {
      notify.error(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await dispatch(
      loginUser({
        email: formData.email.trim(),
        password: formData.password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      if (!result.payload.emailVerified) {
        notify.error(
          "Please verify your email first."
        );

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

        <h1>Welcome Back</h1>

        <p>
          Sign in to continue chatting.
        </p>

        <form onSubmit={handleSubmit}>

          <AuthInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <span className="input-error">
              {errors.email}
            </span>
          )}

          <PasswordInput
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <span className="input-error">
              {errors.password}
            </span>
          )}

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <AuthButton
            loading={loading}
            text="Sign In"
            loadingText="Signing In..."
            disabled={!isFormValid}
          />

        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/signup">
            Create Account
          </Link>
          <br />
        </div>

      </div>

    </div>
  );
};

export default Login;